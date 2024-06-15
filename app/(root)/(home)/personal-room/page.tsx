import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const PersonalRoom = () => {
  return (
    <>
      <div className="text-white">
        <h1 className="font-bold text-[30px] leading-[42px]">
          Personal Meeting Room
        </h1>
        <div className="pt-6 md:pt-8 flex gap-4 lg:gap-7 xl:gap-10">
          <div className="text-sky-1 flex flex-col gap-5 font-medium text-xl">
            <p>Topic:</p>
            <p>Meeting ID:</p>
            <p>Passcode:</p>
            <p>Invite Link:</p>
          </div>
          <div className="flex flex-col gap-5 text-xl font-bold">
            <p>My Personal Meeting Room</p>
            <p>3245313821</p>
            <p>
              *******{" "}
              <span className="text-lg font-medium text-blue-1">Show</span>
            </p>
            <p className="text-blue-1">
              https://us93web.qoom.us/345672?pwd=3f2uiui3h4un134if
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-8">
          <Button className="bg-blue-1">Start the meeting</Button>
          <Button className="flex gap-[6px] bg-dark-3">
            <Image
              src={"/icons/copy.svg"}
              alt="copy icon"
              width={14}
              height={14}
            />
            Copy Invitation
          </Button>
          <Button className="border-2 border-dark-3">
            <Image src={"/icons/"} alt="" width={14} height={14} />
            Edit
          </Button>
          <Button className="border-2 border-dark-3">
            <Image src={"/icons/"} alt="" width={14} height={14} />
            Delete
          </Button>
        </div>
        <div className="w-[100vw] h-[5px] bg-dark-1 absolute left-0 z-0 mt-8">

        </div>
      </div>
    </>
  );
};

export default PersonalRoom;
