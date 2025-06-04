"use client";

import Navbar from "@/components/Navbar/navbar";
import "./globals.css";
import { useState, useEffect } from "react";
import Lines from "@/components/Lines";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const disableNavbar = [
  "/admin/user",
  "/admin/dashboard",
  "/admin",
  "/dashboard",
  "/dashboard/report",
  "/dashboard/input-telur",
  "/dashboard/controlling",
  "/dashboard/setting",
  "/dashboard/eggs-monitoring",
  "/dashboard/setting/edit-profile",
  "/dashboard/setting/add-address",
  "/dashboard/setting/edit-address",
];

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {!disableNavbar.includes(pathname) && <Navbar scrollTop={scrollTop} />}
      <Lines />
      {children}
      {!disableNavbar.includes(pathname) && <Footer />}
    </>
  );
}
