"use client";

import { SampahTypes } from "@/types/Sampah";
import { BreadcrumbItem, Breadcrumbs, Button, Input } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import CardPusat from "@/components/Admin/CardPusat";
import { useCurrencyFormatter } from "@/utils/useCurrencyFormatter";
import { CreateTransaksiTypes, TransaksiTypes } from "@/types/Transaksi";
import AxiosInstance from "@/utils/AxiosInstance";
import { AxiosError } from "axios";
import { PenggunaTypes } from "@/types/Pengguna";
import { TokenType } from "@/types/Token";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const TransaksiPusat = () => {
  const { formatRupiah } = useCurrencyFormatter();

  const router = useRouter();

  const initialTransaksi = {
    email: "",
    totalHarga: 0,
    item_sampah: [],
  };

  const [idAdmin, setIdAdmin] = useState<number>();
  const [emailAdmin, setEmailAdmin] = useState<string>("");

  const [transaksi, setTransaksi] =
    useState<CreateTransaksiTypes>(initialTransaksi);

  const [dataSampah, setDataSampah] = useState<SampahTypes[]>([]);
  const [filteredDataSampah, setFilteredDataSampah] = useState<SampahTypes[]>(
    [],
  );
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    let idAdmin: number;

    if (token) {
      const decoded: TokenType = jwtDecode(token);
      idAdmin = decoded.pengguna_id;
      setIdAdmin(decoded.pengguna_id);
    } else {
      router.push("login");
    }

    const fetchEmailAdmin = async () => {
      try {
        const response = await AxiosInstance.get<PenggunaTypes>(
          `/api/users/${idAdmin}`,
        );
        setEmailAdmin(response.data.email);
        setTransaksi((prevVal) => ({
          ...prevVal,
          email: response.data.email,
        }));
      } catch (error) {
        const err = error as AxiosError;
        console.error(err);
      }
    };
    const fetchSampah = async () => {
      try {
        const response = await AxiosInstance.get<SampahTypes[]>("/api/sampah");
        const data = response.data.map((item: SampahTypes, index: number) => {
          return {
            ...item,
            key: index + 1,
          };
        });

        const filterData = data.filter((item) => Number(item.kuantitas) > 0);
        const sortedData = filterData.sort((a: SampahTypes, b: SampahTypes) =>
          a.nama_sampah
            .toLowerCase()
            .localeCompare(b.nama_sampah.toLowerCase()),
        );

        setDataSampah(sortedData);
        setFilteredDataSampah(sortedData);

        let hargaTotalSemua = 0;
        const initialSampah = sortedData.map((item) => {
          const hargaKaliKuantitas = item.harga_sekarang * item.kuantitas;
          hargaTotalSemua += hargaKaliKuantitas;

          return {
            sampah_id: item.sampah_id,
            nama_sampah: item.nama_sampah,
            jumlah_sampah: item.kuantitas,
            harga_sampah: item.harga_sekarang,
          };
        });

        setTransaksi((prevVal) => ({
          ...prevVal,
          totalHarga: hargaTotalSemua,
          item_sampah: initialSampah,
        }));
      } catch (error) {
        const err = error as AxiosError;
        console.error(err);
      }
    };
    fetchEmailAdmin();
    fetchSampah();
  }, []);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setFilteredDataSampah(() =>
      dataSampah.filter((e: SampahTypes) =>
        e.nama_sampah.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  // Handle create transaction
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [errorSubmit, setErrorSubmit] = useState<string>("");

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (transaksi.item_sampah.length !== 0 && transaksi.email.length !== 0) {
      const { ...formData } = transaksi;

      const finalFormData = {
        ...formData,
        pengguna_id: idAdmin,
        tipe_transaksi: "keluar",
      };

      try {
        setIsSubmiting(true);

        await AxiosInstance.post("/api/transaksi", finalFormData)
          .then((response) => {
            if (response.status === 200) {
              alert("Berhasil menambahkan transaksi ke bank sampah pusat!");
              setTransaksi(initialTransaksi);
              window.location.reload();
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
  };
  return (
    <>
      <Breadcrumbs variant="bordered" className="ml-4 mt-4">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
        <BreadcrumbItem
          href="/admin/tambah-transaksi-pusat"
          className="font-bold"
        >
          Tambah Transaksi Bank Sampah Pusat
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex w-full flex-col items-center justify-center gap-14 py-12">
        <h1 className="my-4 text-3xl font-bold">Tambah Transaksi Pusat</h1>
        <form
          className="flex w-3/5 flex-col items-center justify-center gap-y-8"
          onSubmit={submitHandler}
        >
          {/* <Input
          isClearable
          type="email"
          label="Email Pengguna"
          name="email"
          placeholder="pengguna@example.com"
          className="m-auto max-w-xs"
          value={transaksi.email}
          onChange={(e) =>
            setTransaksi((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        /> */}
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
            type="submit"
            variant="ghost"
            className="text-medium font-semibold"
            isDisabled={transaksi.item_sampah.length === 0}
          >
            Tambahkan Transaksi
          </Button>
          <h3 className="text-medium font-semibold text-red-700">
            {errorSubmit}
          </h3>
          <Input
            variant="underlined"
            label="Cari Sampah"
            className="w-96"
            value={searchValue}
            onChange={searchHandler}
          />
          <div className="container flex max-w-6xl cursor-default flex-row flex-wrap justify-evenly gap-6 rounded-md p-5">
            {filteredDataSampah.map((item: SampahTypes, index: number) => {
              return (
                <CardPusat
                  key={index}
                  {...item}
                  maxQuantity={item.kuantitas}
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
export default TransaksiPusat;
