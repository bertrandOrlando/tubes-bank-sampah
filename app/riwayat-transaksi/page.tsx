"use client";

import React, { useState } from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter as DateCalendarFormatter } from "@react-aria/i18n";
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
} from "@nextui-org/react";
import { useCurrencyFormatter } from "@/utils/useCurrencyFormatter";
import { useDateFormatter } from "@/utils/useDateFormatter";
import ModalComponent from "@/components/Modal";

const RiwayatTransaksi = () => {
  // Logic Calendar
  const today = new Date();
  const currDate = today.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(parseDate(currDate));
  const [endDate, setEndDate] = useState(parseDate(currDate));

  //   Logic Filter Transaksi
  const [filterStart, setFilterStart] = useState<boolean>(false);
  const [filterEnd, setFilterEnd] = useState<boolean>(false);
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
      key: "tanggal_masuk",
      label: "TANGGAL",
    },
    {
      key: "total_transaksi",
      label: "TOTAL PENDAPATAN",
    },
    {
      key: "",
      label: "",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-y-6 p-8">
      <h1 className="my-4 text-3xl font-bold">Riwayat Transaksi</h1>
      <div className="flex flex-row justify-evenly gap-12">
        <div className="flex flex-col items-center justify-between">
          <Checkbox isSelected={filterStart} onValueChange={setFilterStart}>
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
          <Checkbox isSelected={filterEnd} onValueChange={setFilterEnd}>
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
      <Button
        color="primary"
        variant="ghost"
        className=""
        onClick={filterHandler}
      >
        Lihat Transaksi
      </Button>
      <div className="w-3/5">
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
            emptyContent={"Anda belum memiliki transaksi saat ini"}
          >
            {(item) => (
              <TableRow key={item.transaksi_id} className="">
                <TableCell className="text-center font-semibold">
                  {item.key}
                </TableCell>
                <TableCell className="text-center">
                  {formatDate(item.tanggal_masuk)}
                </TableCell>
                <TableCell className="text-center">
                  {formatRupiah(item.total_transaksi)}
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
  );
};
RiwayatTransaksi.getLayout = () => null;

export default RiwayatTransaksi;
