"use client";

import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // nanti kalau mau proses ke backend(?)
    console.log(email);
    console.log(password);
  };

  return (
    <div className="box-border min-h-screen w-full flex  justify-center items-center overflow-x-hidden relative">
      <div className="bg-[url('../public/hutan.jpg')] bg-no-repeat bg-cover absolute inset-0"></div>
      <div className="bg-black opacity-10 absolute inset-0"></div>

      <div className="absolute top-16 text-5xl font-semibold text-green-900 py-10">
        <h1>Selamat datang kembali!</h1>
      </div>

      <div className="absolute flex flex-col gap-10 justify-center items-center">
        <div>
          <Link href="/" className=" text-2xl font-semibold text-green-900">
            <span className="mr-2">←</span> Kembali ke Home
          </Link>
          <form
            onSubmit={handleSubmit}
            className="w-96 bg-white/60 rounded-lg backdrop-blur-sm"
          >
            <div className="max-w-xl flex flex-col items-center p-10">
              <h1 className="font-semibold text-5xl text-green-900">Login</h1>
              <div className="pt-10 pb-5">
                <p className="text-2xl pb-2 text-green-900">Email</p>
                <input
                  type="text"
                  className="bg-slate-100 w-72 py-2 px-2 rounded-md"
                  placeholder="user@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <p className="text-2xl text-green-900">Password</p>
                <input
                  type="password"
                  className="bg-slate-100 w-72 py-2 px-2 rounded-md"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="bg-green-900 text-white w-2/5 mt-10 py-2 rounded-md hover:bg-green-600"
                type="submit"
              >
                Sign in
              </button>
              <p className="pt-5 text-green-900">
                Belum punya akun?{" "}
                <Link href="/register" className="text-blue-600">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
