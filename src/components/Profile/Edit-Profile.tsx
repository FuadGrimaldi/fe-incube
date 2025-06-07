// ProfileForm Component
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchClient from "@/lib/fetch-client";
import Swal from "sweetalert2";

type ProfileData = {
  name: string;
  age: string;
  gender: string;
  contact: string;
  job: string;
  profile_picture?: string; // Optional field for profile picture
};

const EditProfileForm: React.FC<any> = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    age: "",
    gender: "",
    contact: "",
    job: "",
  });  
  const [loading, setLoading] = useState<boolean>(true);
  const [idUser, setIdUser] = useState<number>();
  const router = useRouter();

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

        setProfileData(data.data.detail_user);
      } catch (error) 
      // Handle error
      {
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allowedFields = (({ name, age, gender, contact, job }) => ({
      name, age, gender, contact, job,
    }))(profileData);
    try {
      const response = await fetchClient({
        method: "PUT",
        url:
          process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/user/update-profile",
        body: JSON.stringify(allowedFields),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      Swal.fire({
        position: "top",
        icon: "success",
        title: "update profile success",
        showConfirmButton: false,
        timer: 1000,
      })
      router.push("/dashboard/setting"); // kembali ke halaman setting
    } catch (err) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Failed to update profile, please try again",
          showConfirmButton: false,
          timer: 1000,
        })
      }
  };
  


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center my-5">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-700 font-medium">
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={profileData.age}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-gray-700 font-medium">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={profileData.gender}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="contact"
              className="block text-gray-700 font-medium"
            >
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={profileData.contact}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="job" className="block text-gray-700 font-medium">
              Job
            </label>
            <input
              type="text"
              id="job"
              name="job"
              value={profileData.job}
              onChange={handleInputChange}
              className="w-full border bg-gray-100 text-black rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
