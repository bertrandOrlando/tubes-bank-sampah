"use client";

import { SampahTypes } from "@/types/Sampah";
import { Button, Input, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import {
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
// import hargaSampah from "@/data/sampah.json";
import CardAdmin from "@/components/Admin/CardAdmin";
import { useCurrencyFormatter } from "@/utils/useCurrencyFormatter";
import { CreateTransaksiTypes } from "@/types/Transaksi";
import AxiosInstance from "@/utils/AxiosInstance";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { TokenType } from "@/types/Token";
import { useRouter } from "next/navigation";
import { PenggunaTypes } from "@/types/Pengguna";

const AdminPage = () => {
  const router = useRouter();
  const { formatRupiah } = useCurrencyFormatter();

  const initialTransaksi = {
    email: "",
    totalHarga: 0,
    item_sampah: [],
  };

  const [transaksi, setTransaksi] =
    useState<CreateTransaksiTypes>(initialTransaksi);

  const [dataSampah, setDataSampah] = useState<SampahTypes[]>([]);
  const [hargaSampah, setHargaSampah] = useState<SampahTypes[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setHargaSampah(() =>
      dataSampah.filter((e: SampahTypes) =>
        e.nama_sampah.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  // Token
  const [idAdmin, setIdAdmin] = useState<number>();

  // Getting Sampah Data from api and get token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded: TokenType = jwtDecode(token);
      setIdAdmin(decoded.pengguna_id);
    } else {
      router.push("login");
    }

    const getDataSampah = async () => {
      try {
        const response = await AxiosInstance.get(`/api/sampah`);
        const data = response.data;
        console.log(data);

        setDataSampah(data);
        setHargaSampah(data);
      } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
      }
    };

    getDataSampah();
  }, [router]);

  // Handle create transaction
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [errorSubmit, setErrorSubmit] = useState<string>("");

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (transaksi.item_sampah.length !== 0 && transaksi.email.length !== 0) {
      const { email, ...formData } = transaksi;
      const penggunaResp = await AxiosInstance.get("/api/users");
      const pengguna = penggunaResp.data.find(
        (pengguna: PenggunaTypes) => pengguna.email === email,
      );

      if (!pengguna) {
        setErrorSubmit("Email Tidak ditemukan");
      } else {
        const id_pengguna = pengguna.pengguna_id;
        const finalFormData = {
          ...formData,
          pengguna_id: id_pengguna,
          tipe_transaksi: "masuk",
        };

        try {
          setIsSubmiting(true);

          await AxiosInstance.post("/api/transaksi", finalFormData)
            .then((response) => {
              if (response.status === 200) {
                alert("Berhasil menambahkan transaksi pengguna");
                setTransaksi(initialTransaksi);
              } else {
                setErrorSubmit("Gagal Melakukan Transaksi");
              }
            })
            .catch((err) => {
              setErrorSubmit("Gagal Melakukan Transaksi");
              console.error(err);
            });
        } catch (error) {
          setErrorSubmit("Gagal Melakukan Transaksi");
          console.error("Authentication error", error);
        } finally {
          setIsSubmiting(false);
        }
      }
    }
  };
  return (
    <>
      <Breadcrumbs variant="bordered" className="ml-4 mt-4">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
        <BreadcrumbItem href="/admin/tambah-transaksi" className="font-bold">
          Tambah Transaksi Pengguna
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex w-full flex-col items-center justify-center gap-14 py-12">
        <h1 className="my-4 text-3xl font-bold">Tambah Transaksi Pengguna</h1>
        <form
          onSubmit={submitHandler}
          className="flex w-3/5 flex-col items-center justify-center gap-y-8"
        >
          <Input
            isClearable
            onClear={() =>
              setTransaksi((prev) => {
                return { ...prev, email: "" };
              })
            }
            type="email"
            label="Email Pengguna"
            name="email"
            placeholder="pengguna@example.com"
            className="m-auto max-w-xs"
            value={transaksi.email}
            onChange={(e) =>
              setTransaksi((prev) => {
                setErrorSubmit("");
                return { ...prev, email: e.target.value };
              })
            }
          />
          <h3 className="text-medium font-semibold text-red-700">
            {errorSubmit}
          </h3>
          <div className="min-h-28">
            <table border={0}>
              {transaksi.item_sampah.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="pr-5 font-medium">
                      {index + 1}. {item.nama_sampah}
                    </td>
                    <td>
                      {item.jumlah_sampah} x {formatRupiah(item.harga_sampah)}
                    </td>
                  </tr>
                );
              })}
            </table>

            <h3 className="text-medium font-semibold">
              Total Transaksi : {formatRupiah(transaksi.totalHarga)}
            </h3>
          </div>
          <Button
            color="primary"
            variant="ghost"
            className="text-medium font-semibold"
            isDisabled={
              transaksi.item_sampah.length === 0 || transaksi.email.length === 0
            }
            type="submit"
          >
            Tambahkan Transaksi
          </Button>
          <Input
            variant="underlined"
            label="Cari Sampah"
            className="w-96"
            value={searchValue}
            onChange={searchHandler}
          />
          <div className="container flex max-w-6xl cursor-default flex-row flex-wrap justify-evenly gap-6 rounded-md p-5">
            {hargaSampah.map((dataSampah: SampahTypes, index: number) => {
              return (
                <CardAdmin
                  key={index}
                  {...dataSampah}
                  transaksi={transaksi}
                  setTransaksi={setTransaksi}
                />
              );
            })}
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminPage;
