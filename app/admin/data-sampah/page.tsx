"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";

import SampahData from "@/data/sampah.json";
import { SampahTypes } from "@/types/Sampah";
import Link from "next/link";
import Image from "next/image";
import { useCurrencyFormatter } from "@/utils/useCurrencyFormatter";

const DataMember = () => {
  const columns = [
    {
      key: "key",
      label: "NO",
    },
    {
      key: "nama_sampah",
      label: "NAMA",
    },
    {
      key: "harga_sekarang",
      label: "HARGA",
    },
    {
      key: "jenis_sampah",
      label: "JENIS",
    },
    {
      key: "nama_suk",
      label: "SUK",
    },
    {
      key: "slug_image",
      label: "FOTO SAMPAH",
    },
    {
      key: "tombolEdit",
      label: "",
    },
    {
      key: "tombolHapus",
      label: "",
    },
  ];

  const [dataSampah, setDataSampah] = useState<SampahTypes[]>(SampahData);
  const [searchSampah, setSearchSampah] = useState("");

  const searchSampahHandler = (nama_sampah: string) => {
    setDataSampah(() =>
      dataSampah.filter((data: SampahTypes) =>
        data.nama_sampah.includes(nama_sampah),
      ),
    );
  };

  const { formatRupiah } = useCurrencyFormatter();

  return (
    <>
      <Breadcrumbs variant="bordered" className="ml-4 mt-4">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
        <BreadcrumbItem href="/admin/data-sampah" className="font-bold">
          Data Sampah
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex flex-col items-center justify-center gap-y-6 p-8">
        <h1 className="my-4 text-3xl font-bold">Data Sampah</h1>

        <div className="flex w-96 items-center">
          <Input
            type="text"
            variant={"bordered"}
            label="Nama Sampah"
            onChange={(e) => setSearchSampah(e.target.value)}
          />
          <Button
            className="ml-2"
            color="primary"
            variant="ghost"
            onClick={() => searchSampahHandler(searchSampah)}
          >
            Search
          </Button>
        </div>

        <div>
          <Link
            href={"/admin/data-sampah/add"}
            className="text-2xl font-semibold"
          >
            <span className="mr-2">+</span> Tambah Sampah
          </Link>

          <div className="w-full">
            <Table isStriped aria-label="Seluruh data member">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key} className="px-20 text-center">
                    {column.label}{" "}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody
                items={dataSampah.map((item, index) => ({
                  ...item,
                  idx: index + 1,
                }))}
                emptyContent={"Data sampah belum ditemukan"}
              >
                {(item) => (
                  <TableRow key={item.sampah_id} className="">
                    <TableCell className="text-center font-semibold">
                      {item.idx}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.nama_sampah}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatRupiah(item.harga_sekarang)}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.jenis_sampah}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.nama_suk}
                    </TableCell>
                    <TableCell className="text-center">
                      <Image
                        src={item.slug_image}
                        alt={item.slug_image}
                        width={200}
                        height={200}
                      />
                      {item.slug_image}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        as={Link}
                        color="primary"
                        variant="ghost"
                        href={`/admin/data-sampah/edit/${item.sampah_id}`}
                      >
                        <div>Edit</div>
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button color="danger">
                        <div>Hapus</div>
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataMember;
