"use client";
import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useRouter } from "next/navigation";
import fetchClient from "@/lib/fetch-client";
import Image from 'next/image';


type ProfileData = {
  email: string;
  detail_user: {
    name: string;
    age: string;
    gender: string;
    contact: string;
    job: string;
    profile_picture: string;
  };
};

const ProfileCard: React.FC<any> = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleEditClick = () => {
    router.push("/dashboard/setting/edit-profile");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetchClient({
          method: "GET",
          url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/user/profile",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();


        setProfileData(data.data);
      } catch (error) {
        setProfileData(null); // Set to null if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return (
      <div className="lg:max-w-md w-full p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="mb-4">
          <div className="text-gray-700 text-lg font-semibold">
            No user data found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center lg:w-auto w-full">
      <div className="rounded-lg border border-gray-200 bg-white p-6 lg:mx-[175px] mx-0 shadow-md lg:pb-[30px] pb-0 max-w-[1000px] w-full">
        {/* Header section with "Your Profile" text and icon aligned to the corners */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-black">Your Profile</h3>
          <div className="cursor-pointer">
            <FaEllipsisV size={20} className="text-gray-600" />
          </div>
        </div>

        {/* Profile image */}
        <div className="w-[130px] h-[130px] rounded-full bg-gray-200 mx-auto overflow-hidden mt-6">
          <Image
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile details */}
        <div className="text-center mt-4 space-y-2">
          <p className="text-xl font-medium text-black">{profileData.detail_user.name}</p>
          <p className="text-gray-500">{profileData.email}</p>
        </div>

        {/* Additional details */}
        <div className="mt-6 space-y-2 text-left lg:w-[200px] w-full mx-auto">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Age:</span>
            <span className="text-black">{profileData.detail_user.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Gender:</span>
            <span className="text-black">{profileData.detail_user.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Contact:</span>
            <span className="text-black">{profileData.detail_user.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Job:</span>
            <span className="text-black">{profileData.detail_user.job}</span>
          </div>
        </div>

        {/* Edit button */}
        <button
          className="w-full bg-yellow-500 text-white py-2 mt-[100px] mb-6 lg:mb-0 rounded-md font-medium hover:bg-yellow-600"
          onClick={handleEditClick}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
