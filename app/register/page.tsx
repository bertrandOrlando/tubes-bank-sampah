"use client";

import Link from "next/link";
import React, { useState } from "react";
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
  const [kecamatan, setKecamatan] = useState<number>();
  const [kelurahan, setKelurahan] = useState<number>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // nanti kalau mau proses ke backend(?)
    console.log(nama);
    console.log(email);
    console.log(password);
    console.log(noTelp);
    console.log(alamat);
    console.log(kecamatan);
    console.log(kelurahan);
  };

  return (
    <div className="box-border min-h-screen w-full flex justify-center items-center overflow-x-hidden relative">
      <div className="bg-[url('../public/hutan.jpg')] bg-no-repeat bg-cover absolute inset-0"></div>
      <div className=" bg-black opacity-10 absolute inset-0"></div>

      <div className="absolute flex flex-col gap-10 justify-center items-center">
        <div>
          <Link href="/" className=" text-2xl font-semibold text-green-900">
            <span className="mr-2">←</span> Kembali ke Home
          </Link>
          <form
            onSubmit={handleSubmit}
            className=" bg-white/60 rounded-lg backdrop-blur-sm "
          >
            <div className="grid grid-cols-2 items-center p-10 gap-x-5">
              <h1 className="font-semibold text-5xl text-green-900 col-span-2 text-center mb-10">
                Sign Up
              </h1>

              <div className=" pb-2">
                <p className="text-2xl pb-2 text-green-900 cursor-default">
                  Nama
                </p>
                <input
                  type="text"
                  className="bg-slate-100 w-72 py-2 px-2 rounded-md"
                  placeholder="Michael Scofield"
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>

              <div className="pb-2">
                <p className="text-2xl pb-2 text-green-900 cursor-default">
                  Email
                </p>
                <input
                  type="text"
                  className="bg-slate-100 w-72 py-2 px-2 rounded-md"
                  placeholder="user@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="pb-2">
                <p className="text-2xl text-green-900 cursor-default">
                  Password
                </p>
                <input
                  type="password"
                  className="bg-slate-100 w-72 py-2 px-2 rounded-md"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="pb-2">
                <p className="text-2xl text-green-900 cursor-default">
                  No Telp
                </p>
                <input
                  type="text"
                  className="bg-slate-100 w-72 py-2 px-2 rounded-md"
                  placeholder="08123456789"
                  onChange={(e) => setNoTelp(e.target.value)}
                />
              </div>

              <div className="pb-2">
                <p className="text-2xl text-green-900 cursor-default">Alamat</p>
                <input
                  type="text"
                  className="bg-slate-100 w-72 py-2 px-2 rounded-md"
                  placeholder="JL Ciumbuleuit No 94"
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </div>

              <div className="pb-2 w-72">
                <p className="text-2xl text-green-900 cursor-default">
                  Kecamatan
                </p>
                <select
                  name="Kecamatan"
                  id="kecamatan"
                  className="bg-slate-100 w-72 py-2 px-2 rounded-md"
                  onChange={(e) => {
                    setKecamatan(Number(e.target.value));
                  }}
                  value={kecamatan}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pilih Kecamatan
                  </option>
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
                </select>
              </div>

              <div className="w-72">
                <p className="text-2xl text-green-900 cursor-default">
                  Kelurahan
                </p>
                <select
                  name="Kelurahan"
                  id="kelurahan"
                  className={`bg-slate-100 w-72 py-2 px-2 rounded-md ${
                    !kecamatan ? "cursor-not-allowed" : ""
                  }`}
                  disabled={!kecamatan}
                  onChange={(e) => {
                    setKelurahan(Number(e.target.value));
                  }}
                  value={kelurahan}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pilih Kelurahan
                  </option>
                  {dataKelurahan
                    .filter(
                      (currKelurahan: KelurahanTypes) =>
                        currKelurahan.kec_id === kecamatan
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
                </select>
              </div>

              <div className="col-span-2 flex flex-col justify-center items-center">
                <button
                  className="bg-green-900 text-white w-2/5 mt-10 py-2 rounded-md hover:bg-green-600 "
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
