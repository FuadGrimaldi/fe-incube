"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEllipsisV, FaLock, FaPlus } from "react-icons/fa";
import InCubeStatus from "../Profile/IncubeStatus";
import ProfileCard from "../Profile/ProfileCard";
import AddressForm from "../Profile/AddressForm";
import fetchClient from "@/lib/fetch-client";

type UserSubs = {
  id: number;
  id_cus: number;
  id_produk: string;
  start_sub: string;
  end_sub: string;
  created_at: string;
  produk: {
    id: string;
    nama: string;
    tinggi: number;
    lebar: number;
    kapasitas: number;
    telur: number;
    pass_access: string;
    price: number;
    active: string;
    created_at: string;
  };
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
  };
};

const SettingCom = () => {
  const [userSubsData, setUserSubsData] = useState<UserSubs[] | null>(null);
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIncu, setActiveIncu] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserSubsData = async () => {
    try {
      const response = await fetchClient({
        method: "GET",
        url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/user/user-subscriptions",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();

      console.log("Response Data:", data); // ✅ DI SINI AKAN MUNCUL

      setUserSubsData(data.data);

    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

    fetchUserSubsData();
  }, []);

  useEffect(() => {
    if (userSubsData && userSubsData.length > 0) {
      setActiveIncu(userSubsData.length);

      // Ambil data dari langganan pertama (atau bisa disesuaikan)
      const { start_sub, end_sub } = userSubsData[0];

      const startDate = new Date(start_sub);
      const endDate = new Date(end_sub);

      // Hitung selisih hari
      const timeDiff = endDate.getTime() - startDate.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      setDaysLeft(dayDiff);
    }
  }, [userSubsData]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-6 lg:pl-[97px] ml-0">
        <InCubeStatus title="Active" value={activeIncu || 0} />
        <InCubeStatus title="Days left" value={daysLeft} />
      </div>
      <div className="flex flex-wrap gap-6 w-full lg:pl-[97px] ml-0 mx-auto">
        <ProfileCard />
        <AddressForm />
      </div>
    </div>
  );
};

export default SettingCom;
