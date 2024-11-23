"use client";

import { SampahTypes } from "@/types/Sampah";
import { Button, Input, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useState } from "react";
import hargaSampah from "@/data/sampah.json";
import CardAdmin from "@/components/Admin/CardAdmin";
import { useCurrencyFormatter } from "@/utils/useCurrencyFormatter";
import { CreateTransaksiTypes } from "@/types/Transaksi";

const AdminPage = () => {
  const { formatRupiah } = useCurrencyFormatter();

  const [transaksi, setTransaksi] = useState<CreateTransaksiTypes>({
    email: "",
    totalHarga: 0,
    item_sampah: [],
  });

  const [dataSampah, setDataSampah] = useState<SampahTypes[]>(hargaSampah);
  const [searchValue, setSearchValue] = useState<string>("");

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setDataSampah(() =>
      hargaSampah.filter((e: SampahTypes) =>
        e.nama_sampah.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };
  return (
    <>
      <Breadcrumbs variant="bordered" className="ml-4 mt-4">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
        <BreadcrumbItem href="/admin/tambah-transaksi" className="font-bold">
          Tambah Transaksi
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex w-full flex-col items-center justify-center gap-14 py-12">
        <h1 className="my-4 text-3xl font-bold">Tambah Transaksi Pengguna</h1>
        <div className="flex w-3/5 flex-col items-center justify-center gap-y-8">
          <Input
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
          />
          <div className="min-h-28">
            <table border={0}>
              {transaksi.item_sampah.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="pr-5 font-medium">
                      {index + 1}. {item.nama_sampah}
                    </td>
                    <td>
                      {item.jumlah} x {formatRupiah(item.harga)}
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
            isDisabled={transaksi.item_sampah.length === 0}
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
            {dataSampah.map((dataSampah: SampahTypes, index: number) => {
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
        </div>
      </div>
    </>
  );
};

export default AdminPage;
