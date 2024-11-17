import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Footer } from "@/components/Footer";
import NavBarWrapper from "@/components/NavBarWrapper";

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
            <NavBarWrapper />
            {children}
            <Footer />
          </NextUIProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
