"use client";

import React, { useState } from "react";
import { parseDate } from "@internationalized/date";
import TransaksiData from "@/data/Transaksi.json";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  DatePicker,
  Button,
  Checkbox,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

import { useCurrencyFormatter } from "@/utils/useCurrencyFormatter";
import { useDateFormatter } from "@/utils/useDateFormatter";
import ModalComponent from "@/components/Modal";
import Link from "next/link";

const AdminPage = () => {
  // Logic Calendar
  const today = new Date();
  const currDate = today.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(parseDate(currDate));
  const [endDate, setEndDate] = useState(parseDate(currDate));

  //   Logic Filter Transaksi
  const [filterStart, setFilterStart] = useState<boolean>(false);
  const [filterEnd, setFilterEnd] = useState<boolean>(false);
  const [tipeTransaksi, setTipeTransaksi] = useState<string>("masuk");
  const filterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("filter transaction with start date and end date");
  };

  //   Logic Table Transaksi
  const data = TransaksiData.map((item, index) => {
    return { ...item, key: index + 1 };
  });
  const { formatRupiah } = useCurrencyFormatter();
  const { formatDate } = useDateFormatter();

  const columns = [
    {
      key: "key",
      label: "NO",
    },
    {
      key: "email_pengguna",
      label: "EMAIL PENGGUNA",
    },
    {
      key: "tanggal_masuk",
      label: "TANGGAL",
    },
    {
      key: "total_transaksi",
      label: "TOTAL TRANSAKSI",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "tanggal_keluar",
      label: "TANGGAL KELUAR",
    },
    {
      key: "",
      label: "",
    },
  ];

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-14 py-12">
        <div className="flex gap-16">
          <Button
            as={Link}
            href="/admin/tambah-transaksi"
            color="primary"
            variant="ghost"
            className="text-medium font-semibold"
          >
            Tambah Transaksi
          </Button>
          <Button
            as={Link}
            href="/admin/data-sampah"
            color="primary"
            variant="ghost"
            className="text-medium font-semibold"
          >
            Lihat Data Sampah
          </Button>
          <Button
            as={Link}
            href="/admin/data-member"
            color="primary"
            variant="ghost"
            className="text-medium font-semibold"
          >
            Lihat Data Member
          </Button>
        </div>
        <div className="flex flex-col gap-y-4">
          <h1 className="my-4 text-3xl font-bold">
            Laporan Transaksi Keluar Masuk
          </h1>
          <div className="flex flex-row justify-evenly gap-12">
            <div className="flex flex-col items-center justify-between">
              <Checkbox
                isSelected={filterStart}
                onValueChange={setFilterStart}
                radius="full"
              >
                Filter awal transaksi
              </Checkbox>
              <DatePicker
                className="max-w-[284px]"
                label="Tanggal Mulai Transaksi"
                value={startDate}
                onChange={setStartDate}
                isDisabled={!filterStart}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <Checkbox
                isSelected={filterEnd}
                onValueChange={setFilterEnd}
                radius="full"
              >
                Filter akhir transaksi
              </Checkbox>
              <DatePicker
                className="max-w-[284px]"
                label="Tanggal Berakhir Transaksi"
                value={endDate}
                onChange={setEndDate}
                isDisabled={!filterEnd}
              />
            </div>
          </div>
        </div>

        <div className="">
          <RadioGroup
            label="Pilih tipe transaksi : "
            orientation="horizontal"
            value={tipeTransaksi}
            onValueChange={setTipeTransaksi}
            defaultValue="masuk"
          >
            <Radio value="masuk">Transaksi Masuk</Radio>
            <Radio value="keluar">Transaksi Keluar</Radio>
          </RadioGroup>
        </div>
        <Button
          color="primary"
          variant="ghost"
          className=""
          onClick={filterHandler}
        >
          Lihat Transaksi
        </Button>

        <div className="">
          <Table isStriped aria-label="Seluruh transaksi pengguna">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key} className="text-center">
                  {column.label}{" "}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={data}
              emptyContent={"Belum terdapat transaksi untuk saat ini"}
            >
              {(item) => (
                <TableRow key={item.transaksi_id} className="">
                  <TableCell className="text-center font-semibold">
                    {item.key}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.email_pengguna}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(item.tanggal_masuk)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatRupiah(item.total_transaksi)}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.status_terkirim == false
                      ? "Belum Terkirim"
                      : "Terkirim"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.status_terkirim == true
                      ? formatDate(item.tanggal_keluar)
                      : "-"}
                  </TableCell>
                  <TableCell className="flex items-center justify-center">
                    <ModalComponent {...item} />
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

export default AdminPage;
