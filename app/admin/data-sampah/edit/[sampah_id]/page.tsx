"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Card,
  CardBody,
  Button,
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";
import axios from "axios";
import { SampahTypes } from "@/types/Sampah";
import { getToken } from "@/utils/getToken";
import { useRouter } from "next/navigation";

type Params = {
  sampah_id: number;
};

const EditSampahPage = ({ params }: { params: Params }) => {
  const { sampah_id } = params;

  const router = useRouter();

  const [namaSampah, setNamaSampah] = useState<string>("");
  const [harga, setHarga] = useState<number>();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<SampahTypes>(
        `http://localhost:5000/api/sampah/${sampah_id}`,
      );
      setNamaSampah(data.nama_sampah);
      setHarga(data.harga_sekarang);
    };

    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (namaSampah != "") {
      formData.append("nama_sampah", namaSampah);
    }

    if (harga) {
      formData.append("harga_sekarang", harga.toString());
    }

    if (file) {
      formData.append("gambarSampah", file);
    }

    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/sampah/${sampah_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      console.log(data);

      alert("Perubahan data berhasil disimpan!");
      router.push("/admin/data-sampah");
    } catch (error) {
      console.error("Submission failed", error);
    }
  };
  return (
    <>
      <Breadcrumbs variant="bordered" className="ml-4 mt-4">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
        <BreadcrumbItem href="/admin/data-sampah">Data Sampah</BreadcrumbItem>
        <BreadcrumbItem href="/admin/data-sampah" className="font-bold">
          Edit Sampah
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex flex-col items-center justify-center gap-y-6 p-8">
        <h1 className="my-4 text-3xl font-bold">Edit Data Sampah</h1>
        <Card className="grid w-1/4 py-10">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <CardBody className="flex items-center">
              <Input
                type="text"
                label="Nama"
                className="w-72"
                value={namaSampah}
                onChange={(e) => setNamaSampah(e.target.value)}
              >
                Nama
              </Input>
            </CardBody>
            <CardBody className="flex items-center">
              <Input
                type="number"
                label="Harga"
                className="w-72"
                value={harga?.toString()}
                onChange={(e) => setHarga(Number(e.target.value))}
              >
                Harga
              </Input>
            </CardBody>
            <CardBody className="flex items-center">
              <Input
                type="file"
                label="Foto Sampah"
                className="w-72"
                onChange={handleFileChange}
              >
                Foto Sampah
              </Input>
            </CardBody>
            <CardBody className="flex items-center">
              <Button color="primary" className="w-24" type="submit">
                Simpan
              </Button>
            </CardBody>
          </form>
        </Card>
      </div>
    </>
  );
};

export default EditSampahPage;
