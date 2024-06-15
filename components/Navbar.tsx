import React from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="fixed flex-between top-0 right-0 px-6 lg:px-10 py-4 bg-dark-1 w-full z-50">
      <Link href={"/"} className="flex items-center gap-1">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <p className="uppercase text-white font-extrabold text-[26px] max-sm:hidden">
          vidcollab
        </p>
      </Link>
      <div className="flex items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* <Link
          href={"/"}
          className="rounded-full overflow-hidden border border-dark-3"
        >
          <Image
            src="/images/avatar-5.png"
            alt="user avatar"
            width={40}
            height={40}
            className="max-sm:w-[36px]"
          />
        </Link> */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
