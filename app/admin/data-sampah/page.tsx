"use client";

import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/getToken";

const DataSampah = () => {
  const [dataSampah, setDataSampah] = useState<SampahTypes[]>();
  const [searchValue, setSearchValue] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<SampahTypes[]>(
        "http://localhost:5000/api/sampah/",
      );

      if (data) {
        const dataSorted = data.sort((a: SampahTypes, b: SampahTypes) =>
          a.nama_sampah
            .toLowerCase()
            .localeCompare(b.nama_sampah.toLowerCase()),
        );
        setDataSampah(dataSorted);
      }
    };

    fetchData();
  }, []);

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

  const searchHandler = (value: string) => {
    setDataSampah(() =>
      dataSampah?.filter((e: SampahTypes) =>
        e.nama_sampah.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handleDelete = async (sampah_id: number) => {
    try {
      const status = await axios.delete(
        `http://localhost:5000/api/sampah/${sampah_id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      // alternatif pertama, yg kata marvel, filter di front end nya aja jd hemat 1 request ke server
      setDataSampah((prev) =>
        prev?.filter((item) => item.sampah_id !== sampah_id),
      );

      // alternatif lain, di fetch ulang datanya biar pasti udah ke delete dari server,
      // const { data } = await axios.get("http://localhost:5000/api/sampah/");
      // setDataSampah(data);
    } catch (error) {
      console.log(error);
    }
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
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            className="ml-2"
            color="primary"
            variant="ghost"
            onClick={() => searchHandler(searchValue)}
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
                  <TableColumn key={column.key} className="px-14 text-center">
                    {column.label}{" "}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody
                items={
                  dataSampah?.map((item, index) => ({
                    ...item,
                    idx: index + 1,
                  })) || []
                }
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
                      {item.nama_suk}
                    </TableCell>
                    <TableCell className="text-center">
                      <Image
                        src={`http://localhost:5000/${item.slug_image}`}
                        alt={item.slug_image}
                        width={200}
                        height={200}
                      />
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
                      <Button
                        color="danger"
                        onClick={() => handleDelete(item.sampah_id)}
                      >
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

export default DataSampah;
