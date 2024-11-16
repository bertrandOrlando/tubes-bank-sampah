import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

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
      <body>
        <AppRouterCacheProvider>
          <NextUIProvider>
            <NavBar />
            {children}
            <Footer />
          </NextUIProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
