// ProfilePage.tsx
import React from "react";
import { Metadata } from "next";
import UpdateAddressForm from "@/components/Profile/Edit-Address";

export const metadata: Metadata = {
  title: "Profile Incube",
  description: "Edit Address information",
  // other metadata
};

const ProfilePage: React.FC = async () => {
  return (
    <div className="p-6">
      <div className="h-max-screen space-y-8">
        <UpdateAddressForm></UpdateAddressForm>
      </div>
    </div>
  );
};

export default ProfilePage;
