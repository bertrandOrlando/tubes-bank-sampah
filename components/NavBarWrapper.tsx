"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "@/components/NavBar";

export default function NavBarWrapper() {
  const pathname = usePathname();

  const hideNavBar = pathname === "/login" || pathname === "/register";

  return !hideNavBar ? (
    <>
      <NavBar />
      <div className="h-20"></div>
    </>
  ) : null;
}
