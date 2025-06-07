import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login Incube",
  description: "This is Login page for Incube",
  // other metadata
};
// Dynamic import Signin supaya tetap client component
const Signin = dynamic(() => import("@/components/Auth/Signin"), {
  ssr: false, // optional
});
const SigninPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Signin />
    </Suspense>
    </>
  );
};

export default SigninPage;
