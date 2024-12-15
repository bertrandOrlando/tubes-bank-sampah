"use client";

import React, { useEffect, useState } from "react";
import { SampahTypes } from "@/types/Sampah";
import Card from "@/components/Card";
import { Input } from "@nextui-org/react";
import axios from "axios";

const DaftarHarga = () => {
  const [dataSampah, setDataSampah] = useState<SampahTypes[]>();
  const [searchValue, setSearchValue] = useState<string>("");

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

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setDataSampah(() =>
      dataSampah?.filter((e: SampahTypes) =>
        e.nama_sampah.toLowerCase().includes(value.toLowerCase()),
      ),
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
        {dataSampah?.map((dataSampah: SampahTypes, index: number) => {
          return <Card key={index} {...dataSampah} />;
        })}
      </div>
    </section>
  );
};

export default DaftarHarga;
