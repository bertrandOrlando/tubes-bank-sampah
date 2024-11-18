"use client";
import React from "react";
import { Input, Card, CardBody, Button } from "@nextui-org/react";

const AddSampahPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-6 p-8">
      <h1 className="my-4 text-3xl font-bold">Tambah Data Sampah</h1>
      <Card className="grid w-1/4 py-10">
        <CardBody className="flex items-center">
          <Input type="text" label="Nama" className="w-72">
            Nama
          </Input>
        </CardBody>
        <CardBody className="flex items-center">
          <Input type="number" label="Harga" className="w-72">
            Harga
          </Input>
        </CardBody>
        <CardBody className="flex items-center">
          <Input type="text" label="Jenis" className="w-72">
            Jenis
          </Input>
        </CardBody>
        <CardBody className="flex items-center">
          <Input type="text" label="SUK" className="w-72">
            SUK
          </Input>
        </CardBody>
        <CardBody className="flex items-center">
          <Input type="file" label="Foto Sampah" className="w-72">
            Foto Sampah
          </Input>
        </CardBody>
        <CardBody className="flex items-center">
          <Button color="primary" className="w-24">
            Simpan
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddSampahPage;
