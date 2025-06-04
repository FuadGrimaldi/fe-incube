// ProfilePage.tsx
import React from "react";
import { Metadata } from "next";
import EditProfileForm from "@/components/Profile/Edit-Profile";

export const metadata: Metadata = {
  title: "Profile Incube",
  description: "Edit User information",
  // other metadata
};

const ProfilePage: React.FC = async () => {
  return (
    <div className="p-6">
      <div className="h-max-screen space-y-8">
        <EditProfileForm></EditProfileForm>
      </div>
    </div>
  );
};

export default ProfilePage;
