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
import { PenggunaTypes } from "@/types/Pengguna";
import { getToken } from "@/utils/getToken";
import { useRouter } from "next/navigation";
import axios from "axios";
import { KecamatanTypes } from "@/types/Kecamatan";
import { KelurahanTypes } from "@/types/Kelurahan";

type Params = {
  pengguna_id: number;
};

const EditMemberPage = ({ params }: { params: Params }) => {
  const { pengguna_id } = params;
  console.log(pengguna_id);

  const router = useRouter();

  const [dataPengguna, setDataPengguna] = useState<PenggunaTypes>();
  const [nama, setNama] = useState<string>("");
  const [noTelp, setNoTelp] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedKecamatan, setSelectedKecamatan] = useState<number>(0);
  const [selectedKelurahan, setSelectedKelurahan] = useState<number>(0);

  const [kecamatan, setKecamatan] = useState<KecamatanTypes[]>([]);
  const [kelurahan, setKelurahan] = useState<KelurahanTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<PenggunaTypes>(
        `http://localhost:5000/api/users/${pengguna_id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      console.log(data);

      if (data) {
        setDataPengguna(data);
        setNama(data.nama);
        setNoTelp(data.no_telp);
        setAlamat(data.alamat);
        setEmail(data.email);
        setSelectedKecamatan(data.kec_id);
        setSelectedKelurahan(data.kel_id);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataKecamatan = async () => {
      const { data } = await axios.get<KecamatanTypes[]>(
        "http://localhost:5000/api/kecamatan",
      );

      console.log(data);

      if (data) {
        setKecamatan(data);
      }
    };
    fetchDataKecamatan();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/kelurahan`, {
        params: {
          kec_id: selectedKecamatan,
        },
      });

      setKelurahan(data);

      return data;
    };
    if (selectedKecamatan) {
      fetchData();
    }
  }, [selectedKecamatan]);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.patch<PenggunaTypes>(
        `http://localhost:5000/api/users/${pengguna_id}`,
        {
          nama,
          no_telp: noTelp,
          alamat,
          email,
          kel_id: selectedKelurahan,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (data) {
        alert("Perubahan data berhasil disimpan!");
        router.push("../");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Breadcrumbs variant="bordered" className="ml-4 mt-4">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
        <BreadcrumbItem href="/admin/data-member">Data Member</BreadcrumbItem>
        <BreadcrumbItem href="/admin/data-member" className="font-bold">
          Edit Pengguna
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex flex-col items-center justify-center gap-y-6 p-8">
        <h1 className="my-4 text-3xl font-bold">Edit Data Member</h1>
        <Card className="grid w-1/4 py-10">
          <CardBody className="flex items-center">
            <Input
              type="text"
              label="Nama"
              className="w-72"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            >
              {nama}
            </Input>
          </CardBody>
          <CardBody className="flex items-center">
            <Input
              type="text"
              label="No Telp"
              className="w-72"
              value={noTelp}
              onChange={(e) => setNoTelp(e.target.value)}
            >
              {noTelp}
            </Input>
          </CardBody>
          <CardBody className="flex items-center">
            <Input
              type="text"
              label="Alamat"
              className="w-72"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            >
              {alamat}
            </Input>
          </CardBody>
          <CardBody className="flex items-center">
            <Input
              type="email"
              label="Email"
              className="w-72"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              {email}
            </Input>
          </CardBody>
          <CardBody className="flex items-center">
            <Select
              name="Kecamatan"
              label="Pilih Kecamatan"
              className="w-72 rounded-md bg-slate-100"
              onChange={(e) => {
                setSelectedKecamatan(Number(e.target.value));
              }}
              selectedKeys={[String(selectedKecamatan)]}
              value={selectedKecamatan}
            >
              {(kecamatan || [])?.map((currKecamatan: KecamatanTypes) => (
                <SelectItem
                  key={currKecamatan.kec_id}
                  value={currKecamatan.kec_id}
                >
                  {currKecamatan.nama_kec}
                </SelectItem>
              ))}
            </Select>
          </CardBody>
          <CardBody className="flex items-center">
            <Select
              name="Kelurahan"
              id="kelurahan"
              label="Pilih Kelurahan"
              className={"w-72 rounded-md bg-slate-100"}
              onChange={(e) => {
                setSelectedKelurahan(Number(e.target.value));
              }}
              selectedKeys={[String(selectedKelurahan)]}
              value={selectedKelurahan}
            >
              {(kelurahan || [])
                ?.filter(
                  (currKelurahan: KelurahanTypes) =>
                    currKelurahan.kec_id === selectedKecamatan,
                )
                .map((currKelurahan: KelurahanTypes) => (
                  <SelectItem
                    value={currKelurahan.kel_id}
                    key={currKelurahan.kel_id}
                  >
                    {currKelurahan.nama_kel}
                  </SelectItem>
                ))}
            </Select>
          </CardBody>
          <CardBody className="flex items-center">
            <Button color="primary" className="w-24" onClick={handleSubmit}>
              Simpan
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default EditMemberPage;
