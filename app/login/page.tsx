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
    <div className="relative box-border flex min-h-screen w-full items-center justify-center overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('../public/hutan.jpg')] bg-cover bg-no-repeat"></div>
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="absolute top-16 py-10 text-5xl font-semibold text-green-900">
        <h1>Selamat datang kembali!</h1>
      </div>

      <div className="absolute flex flex-col items-center justify-center gap-10">
        <div>
          <Link href="/" className="text-2xl font-semibold text-green-900">
            <span className="mr-2">←</span> Kembali ke Home
          </Link>
          <form
            onSubmit={handleSubmit}
            className="w-96 rounded-lg bg-white/60 backdrop-blur-sm"
          >
            <div className="flex max-w-xl flex-col items-center p-10">
              <h1 className="text-5xl font-semibold text-green-900">Login</h1>
              <div className="pb-5 pt-10">
                <p className="pb-2 text-2xl text-green-900">Email</p>
                <input
                  type="text"
                  className="w-72 rounded-md bg-slate-100 px-2 py-2"
                  placeholder="user@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <p className="text-2xl text-green-900">Password</p>
                <input
                  type="password"
                  className="w-72 rounded-md bg-slate-100 px-2 py-2"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="mt-10 w-2/5 rounded-md bg-green-900 py-2 text-white hover:bg-green-600"
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
