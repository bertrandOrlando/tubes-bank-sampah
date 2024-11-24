"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dataKecamatan from "@/data/Kecamatan.json";
import dataKelurahan from "@/data/Kelurahan.json";
import { KecamatanTypes } from "@/types/Kecamatan";
import { KelurahanTypes } from "@/types/Kelurahan";

const RegisterPage = () => {
  const [nama, setNama] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [noTelp, setNoTelp] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");

  const [selectedKecamatan, setSelectedKecamatan] = useState<number>();
  const [selectedKelurahan, setSelectedKelurahan] = useState<number>();
  const [kecamatan, setKecamatan] = useState<KecamatanTypes[]>();
  const [kelurahan, setKelurahan] = useState<KelurahanTypes[]>();

  // fetch data kecamatan dari DB
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get<KecamatanTypes[]>(
  //       "http://localhost:5000/api/kecamatan",
  //     );

  //     setKecamatan(data);
  //     // setSelectedKecamatan(data[0].kec_id);
  //   };

  //   fetchData();
  // }, []);

  // // fetch data kelurahan sesuai kec_id
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get(`http://localhost:5000/api/kelurahan`, {
  //       params: {
  //         kec_id: selectedKecamatan,
  //       },
  //     });

  //     setKelurahan(data);
  //     setSelectedKelurahan(data[0].kel_id);

  //     return data;
  //   };
  //   if (selectedKecamatan) {
  //     fetchData();
  //   }
  // }, [selectedKecamatan]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // nanti kalau mau proses ke backend(?)
    console.log({
      email,
      nama,
      noTelp,
      alamat,
      password,
      selectedKecamatan,
      selectedKelurahan,
    });

    const { data } = await axios.post("http://localhost:5000/api/register", {
      noTelp,
      alamat,
      email,
      kelId: selectedKelurahan,
      password,
      nama,
    });

    console.log(data);
  };

  return (
    <div className="relative box-border flex min-h-screen w-full items-center justify-center overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('../public/hutan.jpg')] bg-cover bg-no-repeat"></div>
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="absolute flex flex-col items-center justify-center gap-10">
        <div>
          <Link href="/" className="text-2xl font-semibold text-green-900">
            <span className="mr-2">←</span> Kembali ke Home
          </Link>
          <form
            onSubmit={handleSubmit}
            className="rounded-lg bg-white/60 backdrop-blur-sm"
          >
            <div className="grid grid-cols-2 items-center gap-x-5 p-10">
              <h1 className="col-span-2 mb-10 text-center text-5xl font-semibold text-green-900">
                Sign Up
              </h1>

              <div className="pb-2">
                <p className="cursor-default pb-2 text-2xl text-green-900">
                  Nama
                </p>
                <input
                  type="text"
                  className="w-72 rounded-md bg-slate-100 px-2 py-2"
                  placeholder="Michael Scofield"
                  name="nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>

              <div className="pb-2">
                <p className="cursor-default pb-2 text-2xl text-green-900">
                  Email
                </p>
                <input
                  type="text"
                  className="w-72 rounded-md bg-slate-100 px-2 py-2"
                  placeholder="user@gmail.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="pb-2">
                <p className="cursor-default text-2xl text-green-900">
                  Password
                </p>
                <input
                  type="password"
                  className="w-72 rounded-md bg-slate-100 px-2 py-2"
                  placeholder="********"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="pb-2">
                <p className="cursor-default text-2xl text-green-900">
                  No Telp
                </p>
                <input
                  type="text"
                  className="w-72 rounded-md bg-slate-100 px-2 py-2"
                  placeholder="08123456789"
                  name="noTelp"
                  value={noTelp}
                  onChange={(e) => setNoTelp(e.target.value)}
                />
              </div>

              <div className="pb-2">
                <p className="cursor-default text-2xl text-green-900">Alamat</p>
                <input
                  type="text"
                  className="w-72 rounded-md bg-slate-100 px-2 py-2"
                  placeholder="JL Ciumbuleuit No 94"
                  name="alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </div>

              <div className="w-72 pb-2">
                <p className="cursor-default text-2xl text-green-900">
                  Kecamatan
                </p>
                <select
                  name="Kecamatan"
                  id="kecamatan"
                  className="w-72 rounded-md bg-slate-100 px-2 py-2"
                  onChange={(e) => {
                    setSelectedKecamatan(Number(e.target.value));
                  }}
                  value={selectedKecamatan}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pilih Kecamatan
                  </option>
                  {/* versi json*/}
                  {dataKecamatan.map((currKecamatan: KecamatanTypes) => {
                    return (
                      <option
                        value={currKecamatan.kec_id}
                        key={currKecamatan.kec_id}
                      >
                        {currKecamatan.nama_kec}
                      </option>
                    );
                  })}

                  {/* kalau udah ada backend */}
                  {/* {kecamatan?.map((currKecamatan: KecamatanTypes) => {
                    return (
                      <option
                        value={currKecamatan.kec_id}
                        key={currKecamatan.kec_id}
                      >
                        {currKecamatan.nama_kec}
                      </option>
                    );
                  })} */}
                </select>
              </div>

              <div className="w-72">
                <p className="cursor-default text-2xl text-green-900">
                  Kelurahan
                </p>
                <select
                  name="Kelurahan"
                  id="kelurahan"
                  className={`w-72 rounded-md bg-slate-100 px-2 py-2 ${
                    !selectedKecamatan ? "cursor-not-allowed" : ""
                  }`}
                  disabled={!selectedKecamatan}
                  onChange={(e) => {
                    setSelectedKelurahan(Number(e.target.value));
                  }}
                  value={selectedKelurahan}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pilih Kelurahan
                  </option>
                  {/* versi json */}
                  {dataKelurahan
                    .filter(
                      (currKelurahan: KelurahanTypes) =>
                        currKelurahan.kec_id === selectedKecamatan,
                    )
                    .map((currKelurahan: KelurahanTypes) => {
                      return (
                        <option
                          value={currKelurahan.kel_id}
                          key={currKelurahan.kel_id}
                        >
                          {currKelurahan.nama_kel}
                        </option>
                      );
                    })}

                  {/* kalau udah ada backend */}
                  {/* {kelurahan
                    ?.filter(
                      (currKelurahan: KelurahanTypes) =>
                        currKelurahan.kec_id === selectedKecamatan,
                    )
                    .map((currKelurahan: KelurahanTypes) => {
                      return (
                        <option
                          value={currKelurahan.kel_id}
                          key={currKelurahan.kel_id}
                        >
                          {currKelurahan.nama_kel}
                        </option>
                      );
                    })} */}
                </select>
              </div>

              <div className="col-span-2 flex flex-col items-center justify-center">
                <button
                  className="mt-10 w-2/5 rounded-md bg-green-900 py-2 text-white hover:bg-green-600"
                  type="submit"
                >
                  Sign up
                </button>
                <p className="pt-5 text-green-900">
                  Sudah punya akun?{" "}
                  <Link href="/login" className="text-blue-600">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
