"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Link as LinkNextUI,
} from "@nextui-org/react";
import ProfileIcon from "@/public/profile-round-svgrepo.svg";

export const NavBar = () => {
  const pathName = usePathname();

  const isLoggedIn: boolean = true;
  const userRole: string = "admin";

  const [scrollY, setScrollY] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("scroll", () => setScrollY(window.scrollY));
  }, []);

  const items = [
    {
      key: "profile",
      label: "Profile",
      url: "/profile",
    },
    {
      key: "riwayat-transaksi-",
      label: "Riwayat Transaksi",
      url: "/riwayat-transaksi",
    },
    {
      key: "logout",
      label: "Logout",
      url: "/api/logout",
    },
  ];

  const routes = [
    { title: "Admin Page", path: "/admin", key: "admin" },
    { title: "Home", path: "/", key: "home" },
    { title: "Daftar Harga", path: "/daftar-harga", key: "daftar-harga" },
    // { title: "About Us", path: "/about-us", key: "about-us" },
  ];

  return (
    <nav
      className={`fixed z-50 w-screen border-b-[1px] border-black bg-[#253526] text-white ${
        scrollY === 0 ? "bg-opacity-95" : "bg-opacity-80"
      } transition`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8 py-4">
        <Link href={"/"}>Bank Sampah</Link>

        <div className="cart-wrapper hidden items-center lg:visible lg:flex">
          <ul className="hidden items-center lg:visible lg:flex">
            {routes.map((route) => {
              if (route.key === "admin" || userRole === "admin")
                return (
                  <Link
                    key={route.title}
                    href={route.path}
                    className={`${
                      pathName === route.path
                        ? "border-b-[3px] font-bold"
                        : "font-light hover:border-b-2"
                    } mx-4 border-white p-1`}
                  >
                    {route.title}
                  </Link>
                );
            })}
          </ul>
          {isLoggedIn ? (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  href="/my-profile"
                  variant="light"
                  className="font-medium text-white"
                >
                  <Image
                    src={ProfileIcon}
                    width={20}
                    height={20}
                    alt="profile image"
                    className="text-white"
                  />
                  John Doe
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" items={items}>
                {(item) => (
                  <DropdownItem
                    as={Link}
                    href={item.url}
                    key={item.key}
                    color={item.key === "logout" ? "danger" : "default"}
                    className={
                      item.key === "logout" ? "text-danger" : "text-black"
                    }
                  >
                    {item.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Link href="/login" className="mx-3 flex items-center">
              <Button variant="light">
                <span className="text-medium mx-1 font-light text-white">
                  Login
                </span>
                <svg
                  className="mx-1"
                  stroke="#ffffff"
                  fill="#ffffff"
                  viewBox="0 0 640 512"
                  height="1.4em"
                  width="1.4em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                </svg>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
