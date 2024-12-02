"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Card,
  CardBody,
  Button,
  BreadcrumbItem,
  Breadcrumbs,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { SUKTypes } from "@/types/SUK";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/getToken";

const AddSampahPage = () => {
  const [dataSUK, setDataSUK] = useState<SUKTypes[]>();

  const [namaSampah, setNamaSampah] = useState<string>("");
  const [harga, setHarga] = useState<number>(0);
  const [selectedSuk, setSelectedSuk] = useState<number>();
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchSUKData = async () => {
      const { data } = await axios.get("http://localhost:5000/api/SUK");
      setDataSUK(data);
    };

    fetchSUKData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama_sampah", namaSampah);
    formData.append("harga_sekarang", harga.toString());
    if (selectedSuk !== undefined) {
      formData.append("suk_id", selectedSuk.toString());
    }
    if (file) {
      formData.append("gambarSampah", file);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/sampah",
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

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
          Tambah Sampah
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex flex-col items-center justify-center gap-y-6 p-8">
        <h1 className="my-4 text-3xl font-bold">Tambah Data Sampah</h1>

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
                onChange={(e) => {
                  setNamaSampah(e.target.value);
                }}
              >
                Nama
              </Input>
            </CardBody>
            <CardBody className="flex items-center">
              <Input
                type="number"
                label="Harga"
                className="w-72"
                onChange={(e) => {
                  setHarga(Number(e.target.value));
                }}
              >
                Harga
              </Input>
            </CardBody>
            <CardBody className="flex items-center">
              <Select
                label="SUK"
                placeholder="Pilih SUK"
                className="w-72"
                onChange={(e) => setSelectedSuk(Number(e.target.value))}
              >
                {dataSUK && dataSUK.length > 0 ? (
                  dataSUK.map((suk) => (
                    <SelectItem key={suk.suk_id} value={suk.suk_id}>
                      {suk.nama_suk}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key={1}>Loading...</SelectItem>
                )}
              </Select>
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

export default AddSampahPage;
