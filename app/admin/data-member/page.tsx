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
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";

import PenggunaData from "@/data/Pengguna.json";
import { PenggunaTypes } from "@/types/Pengguna";
import Link from "next/link";

enum tipe_pengguna {
  ADMIN,
  PENGGUNA,
}

const DataMember = () => {
  const columns = [
    {
      key: "key",
      label: "NO",
    },
    {
      key: "nama",
      label: "NAMA",
    },
    {
      key: "no_telp",
      label: "NO TELP",
    },
    {
      key: "alamat",
      label: "ALAMAT",
    },
    {
      key: "email",
      label: "EMAIL",
    },
    {
      key: "kelurahan",
      label: "KELURAHAN",
    },
    {
      key: "kecamatan",
      label: "KECAMATAN",
    },
    {
      key: "",
      label: "",
    },
  ];

  const DataMember: PenggunaTypes[] = PenggunaData.map((item) => ({
    ...item,
    role: tipe_pengguna[item.role as keyof typeof tipe_pengguna],
  }));

  const [dataPengguna, setDataPengguna] = useState<PenggunaTypes[]>(DataMember);
  const [searchEmail, setSearchEmail] = useState("");

  const searchEmailHandler = (email: string) => {
    setDataPengguna(() =>
      dataPengguna.filter((data: PenggunaTypes) => data.email.includes(email)),
    );
  };

  return (
    <>
      <Breadcrumbs variant="bordered" className="ml-4 mt-4">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
        <BreadcrumbItem href="/admin/data-member" className="font-bold">
          Data Member
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex flex-col items-center justify-center gap-y-6 p-8">
        <h1 className="my-4 text-3xl font-bold">Data Member</h1>

        <div className="flex w-96 items-center">
          <Input
            type="email"
            variant={"bordered"}
            label="Email"
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <Button
            className="ml-2"
            color="primary"
            variant="ghost"
            onClick={() => searchEmailHandler(searchEmail)}
          >
            Search
          </Button>
        </div>

        <div className="w-4/5">
          <Table isStriped aria-label="Seluruh data member">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key} className="text-center">
                  {column.label}{" "}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={dataPengguna.map((item, index) => ({
                ...item,
                idx: index + 1,
              }))}
              emptyContent={"Belum ada data member"}
            >
              {(item) => (
                <TableRow key={item.pengguna_id} className="">
                  <TableCell className="text-center font-semibold">
                    {item.idx}
                  </TableCell>
                  <TableCell className="text-center">{item.nama}</TableCell>
                  <TableCell className="text-center">{item.no_telp}</TableCell>
                  <TableCell className="text-center">{item.alamat}</TableCell>
                  <TableCell className="text-center">{item.email}</TableCell>
                  <TableCell className="text-center">
                    {item.kelurahan}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.kecamatan}
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <Button color="primary" variant="ghost" className="">
                      <Link
                        href={`/admin/data-member/edit/${item.pengguna_id}`}
                      >
                        Lihat Detail
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default DataMember;
