import React from "react";
import { Metadata } from "next";
import ReportCom from "@/components/report/report";

export const metadata: Metadata = {
  title: "Eggs Monitoring Incube",
  description: "Monitoring your eggs incubation process",
  // other metadata
};

const Report = async () => {
  return (
    <div className="p-6">
      <h1 className="lg:text-4xl text-2xl font-semibold text-black mb-6">
        Eggs Monitoring
      </h1>
      <div className="h-max-screen">
        {/* <ReportCom /> */}
        <h2 className="text-center text-gray-500 text-lg h-screen flex items-center justify-center">
            Monitoring feature is under development. Please check back later.
        </h2>
      </div>
    </div>
  );
};

export default Report;
