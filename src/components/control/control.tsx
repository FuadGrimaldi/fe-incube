"use client";
import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaLock, FaPlus } from "react-icons/fa";
import CardIncubeControll from "../Card/cardControlling";
import PassKeyModal from "../modal/showModal";
import fetchClient from "@/lib/fetch-client";

type UserSubs = {
  id: number;
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

const ControlCom = () => {
  const [userSubsData, setUserSubsData] = useState<UserSubs[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

      setUserSubsData(data.data);
    } catch (error) {
      setUserSubsData(null); // Set to null if there's an error
    } finally {
      setLoading(false);
    }
  };
  fetchUserSubsData();
}, []);


  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Show a message when address data is not found, and provide an option to create an address
  if (!userSubsData || userSubsData.length === 0) {
    return (
      <div>
        <div className="mb-4">
          <div className="text-gray-700 text-lg font-semibold">
            Your are not subscribe.
          </div>
        </div>
        <a
          href="/subscribe" // Use <a> tag for navigation
          className="btn text-base block mt-4 mx-2 text-center bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600 flex justify-center items-center"
        >
          <FaLock className="mr-2" /> Klik this to subscribe
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <div className="text-gray-700 text-lg font-semibold ">
          Activate your Incube
        </div>
        <PassKeyModal></PassKeyModal>
      </div>
      {userSubsData
        ?.filter((subs) => subs.produk.active === "Y")
        .map((subs) => (
          <CardIncubeControll
            key={subs.id}
            productId={subs.produk.id}
            nama={subs.produk.nama}
            lebar={subs.produk.lebar}
            tinggi={subs.produk.tinggi}
            telur={subs.produk.telur}
            kapasitas={subs.produk.kapasitas}
          />
        ))}
    </div>
  );
};

export default ControlCom;
