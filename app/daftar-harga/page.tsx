"use client";

import React, { useState } from "react";
import hargaSampah from "@/data/sampah.json";
import { SampahTypes } from "@/types/Sampah";
import Card from "@/components/Card";
import { Input } from "@nextui-org/react";

const DaftarHarga = () => {
  const [dataSampah, setDataSampah] = useState<SampahTypes[]>(hargaSampah);
  const [searchValue, setSearchValue] = useState<string>("");

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setDataSampah(() =>
      hargaSampah.filter((e: SampahTypes) =>
        e.nama_sampah.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <section className="flex w-full flex-col items-center justify-center py-12">
      <Input
        type="email"
        variant="underlined"
        label="Cari Sampah"
        className="w-96"
        value={searchValue}
        onChange={searchHandler}
      />
      <div className="container flex max-w-6xl cursor-default flex-row flex-wrap justify-evenly gap-6 rounded-md p-5">
        {dataSampah.map((dataSampah: SampahTypes, index: number) => {
          return <Card key={index} {...dataSampah} />;
        })}
      </div>
    </section>
  );
};

export default DaftarHarga;
