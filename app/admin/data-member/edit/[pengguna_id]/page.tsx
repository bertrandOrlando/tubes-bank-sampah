"use client";
import React from "react";
import { Input, Card, CardBody, Button } from "@nextui-org/react";

type Params = {
  pengguna_id: number;
};

const EditMemberPage = ({ params }: { params: Params }) => {
  const { pengguna_id } = params;
  console.log(pengguna_id);

  return (
    <div className="flex flex-col items-center justify-center gap-y-6 p-8">
      <h1 className="my-4 text-3xl font-bold">Edit Data Member</h1>
      <Card className="grid w-1/4 py-10">
        <CardBody className="flex items-center">
          <Input type="text" label="Nama" className="w-72" value={"Asep"}>
            Nama
          </Input>
        </CardBody>
        <CardBody className="flex items-center">
          <Input
            type="text"
            label="No Telp"
            className="w-72"
            value={"089123456789"}
          >
            No Telp
          </Input>
        </CardBody>
        <CardBody className="flex items-center">
          <Input
            type="text"
            label="Alamat"
            className="w-72"
            value={"Jalan Ciumbuleuit No. 94"}
          >
            Alamat
          </Input>
        </CardBody>
        <CardBody className="flex items-center">
          <Input
            type="email"
            label="Email"
            className="w-72"
            value={"asep123@gmail.com"}
          >
            Email
          </Input>
        </CardBody>
        <CardBody className="flex items-center">
          <Input
            type="text"
            label="Kelurahan"
            className="w-72"
            value={"Sukahaji"}
          >
            Kelurahan
          </Input>
        </CardBody>
        <CardBody className="flex items-center">
          <Input
            type="text"
            label="Kecamatan"
            className="w-72"
            value={"Babakan Ciparay"}
          >
            Kecamatan
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

export default EditMemberPage;
