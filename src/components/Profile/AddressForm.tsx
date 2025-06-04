"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import fetchClient from "@/lib/fetch-client";

type AddressData = {
  address: {
    Kecamatan: string;
    provinsi: string;
    Kabupaten: string;
    Kelurahan: string;
    Kode_pos: string;
    alamat_lengkap: string;
  }
  user: {
    name: string;
    email: string;
    username: string;
  };
};

const AddressForm: React.FC = () => {
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [isLoading, setLoading] = useState(true); // Handle loading state

  const router = useRouter();
  const handleEditClick = () => {
    router.push("/dashboard/setting/edit-address");
  };

  useEffect(() => {
    // Fetch API untuk mendapatkan data profil
    const fetchAddressData = async () => {
      try {
        const response = await fetchClient({
          method: "GET",
          url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/user/addresses",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();

        console.log("Response Data:", data.data); // ✅ DI SINI AKAN MUNCUL

        setAddressData(data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
  };

    fetchAddressData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading text while data is being fetched
  }

  // Show a message when address data is not found, and provide an option to create an address
  if (!addressData) {
    return (
      <div className="lg:max-w-md w-full p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="mb-4">
          <div className="text-gray-700 text-lg font-semibold">
            No address data found.
          </div>
        </div>
        <a
          href="setting/add-address" // Use <a> tag for navigation
          className="text-base block mt-4 mx-2 text-center bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600 flex justify-center items-center"
        >
          <FaPlus className="mr-2" /> Add Address
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-md w-full max-w-[800px] bg-white">
      {/* Header section with "Your Address" text and icon aligned to the corners */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black">Your Address</h3>
        <div className="cursor-pointer">
          <FaEllipsisV size={20} className="text-gray-600" />
        </div>
      </div>

      <form className="space-y-4 text-base">
        <div>
          <label className="text-base font-medium text-gray-700">
            Provinsi
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-100 text-black p-1 "
            value={addressData?.address.provinsi || "kosong"}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Kota/Kabupaten
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-100 text-black p-1 "
            value={addressData?.address.Kabupaten || ""}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Kecamatan
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-100 text-black p-1"
            value={addressData?.address.Kecamatan || ""}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Kelurahan
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-100 text-black p-1"
            value={addressData?.address.Kelurahan || ""}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Kode Pos
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-sm border-gray-300 bg-gray-100 text-black p-1"
            value={addressData?.address.Kode_pos || ""}
            disabled
          />
        </div>
        <div>
          <label className="text-base font-medium text-gray-700">
            Nama Jalan, Gedung, No. Rumah
          </label>
          <textarea
            className="mt-1 w-full rounded-sm bg-gray-100 text-black p-1 py-3"
            value={addressData?.address.alamat_lengkap || ""}
            rows={2}
            disabled
          />
        </div>
      </form>
      <button
        className="w-full bg-yellow-500 text-white py-2 rounded-md font-medium hover:bg-yellow-600 mt-4"
        onClick={handleEditClick}
      >
        Edit Address
      </button>
    </div>
  );
};

export default AddressForm;
