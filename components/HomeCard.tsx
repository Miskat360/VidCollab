import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
interface HomeCardProps {
  className: string;
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
}
const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <>
      <div
        className={cn(
          "rounded-[14px] px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] cursor-pointer",
          className
        )}
        onClick={handleClick}
      >
        <div className="flex-center size-12 glassmorphism rounded-[10px] p-[10px]">
          <Image src={img} alt="" width={36} height={36} />
        </div>
        <div>
          <h1 className="text-xl lg:text-2xl font-bold pb-4">{title}</h1>
          <p className="text-[16px] lg:text-[18px] text-sky-2 leading-tight">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
