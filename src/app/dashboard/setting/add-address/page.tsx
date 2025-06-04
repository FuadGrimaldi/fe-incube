// ProfilePage.tsx
import React from "react";
import { Metadata } from "next";
import SaveAddressForm from "@/components/Profile/save-address";

export const metadata: Metadata = {
  title: "Profile Incube",
  description: "Add address information",
  // other metadata
};

const ProfilePage: React.FC = async () => {
  return (
    <div className="p-6">
      <div className="h-max-screen space-y-8">
        <SaveAddressForm></SaveAddressForm>
      </div>
    </div>
  );
};

export default ProfilePage;
