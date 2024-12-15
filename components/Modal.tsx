"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
} from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

import { TransaksiSampahTypes, TransaksiTypes } from "@/types/Transaksi";
import { useCurrencyFormatter } from "@/utils/useCurrencyFormatter";

const ModalComponent = (props: TransaksiTypes) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { formatRupiah } = useCurrencyFormatter();

  const itemSampah = props.item_sampah.map(
    (item: TransaksiSampahTypes, index: number) => {
      return {
        ...item,
        key: index + 1,
        harga_sampah: formatRupiah(item.harga_sampah) + "/" + item.nama_suk,
        subtotal: formatRupiah(item.harga_sampah * item.jumlah_sampah),
      };
    },
  );

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
      key: "jumlah_sampah",
      label: "KUANTITAS",
    },
    {
      key: "harga_sampah",
      label: "HARGA",
    },
    {
      key: "subtotal",
      label: "SUBTOTAL",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Button color="primary" variant="ghost" className="" onPress={onOpen}>
        Lihat Detail
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
        size="3xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b-3">
                Transaksi tanggal {props.tanggal}
              </ModalHeader>
              <ModalBody className="p-10">
                <h1 className="text-lg font-bold">Detail Penjualan Sampah</h1>
                <h1 className="text-md font-semibold">
                  Total Pendapatan : {formatRupiah(props.total_transaksi)}
                </h1>

                <Table isStriped aria-label="detail transaksi sampah">
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    items={itemSampah}
                    emptyContent={
                      "Tidak terdapat detail informasi untuk transaksi ini"
                    }
                  >
                    {(item) => (
                      <TableRow key={item.key}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
export default ModalComponent;
