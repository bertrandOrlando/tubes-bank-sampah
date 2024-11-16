import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

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
          <NextUIProvider>{children}</NextUIProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
