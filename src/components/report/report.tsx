"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEllipsisV, FaLock, FaPlus } from "react-icons/fa";
import PassKeyModal from "../modal/showModal";
import CardIncubeReport from "../Card/cardWithoutStatus";
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
  users: {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
  };
};

const ReportCom = () => {
  const [userSubsData, setUserSubsData] = useState<UserSubs[] | null>(null);
  const [productId, setProductId] = useState<string | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

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

        // ✅ Ambil id produk dari elemen pertama, jika ada
        const firstProductId = data.data[0]?.produk?.id;
        setProductId(firstProductId);
        localStorage.setItem("productId", firstProductId || "");

      } catch (error) {
        setUserSubsData(null); // Set to null if there's an error
        // Optionally, you can redirect to an error page or show a notification
        // router.push("/error"); // Uncomment this line if you want to redirect on error
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
        ?.filter((subs) => subs.produk.active === "Y") // Filter hanya produk yang aktif
        .map((subs) => (
          <CardIncubeReport
            key={subs.id}
            productId={subs.produk.id}
            telur={subs.produk.telur}
            nama={subs.produk.nama}
            tinggi={subs.produk.tinggi}
            kapasitas={subs.produk.kapasitas}
            lebar={subs.produk.lebar}
          />
        ))}
    </div>
  );
};

export default ReportCom;
