import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bank Sampah",
  description: "Sistem Informasi Bank Sampah Rumah Tangga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} `}>
        <AppRouterCacheProvider>
          <NextUIProvider>
            <NavBar />
            <div className="min-h-96 pt-20">{children}</div>
            <Footer />
          </NextUIProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
