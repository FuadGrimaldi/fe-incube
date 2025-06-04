// ProfilePage.tsx
import React from "react";
import { Metadata } from "next";
import SettingCom from "@/components/setting/setting";

export const metadata: Metadata = {
  title: "Profile Incube",
  description: "User information",
  // other metadata
};

const ProfilePage: React.FC = async () => {
  return (
    <div className="p-6">
      <div className="h-max-screen">
        <SettingCom />
      </div>
    </div>
  );
};

export default ProfilePage;
