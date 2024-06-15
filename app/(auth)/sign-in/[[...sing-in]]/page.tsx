import React from "react";
import { SignIn } from "@clerk/nextjs";

const SingInPage = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <SignIn />
    </main>
  );
};

export default SingInPage;
