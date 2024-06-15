"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <section className="sticky left-0 top-0 flex flex-col h-screen w-fit justify-between bg-dark-1 px-6 pt-28 text-white max-sm:hidden lg:w-[264px] z-10">
      <div className="flex flex-col gap-3">
        {sidebarLinks.map((item) => {
          const isActive =
            pathName === item.route || pathName.startsWith(`${item.route}/`);
          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn(
                "flex gap-4 items-center p-4 justify-start rounded-lg",
                { "bg-blue-1": isActive }
              )}
            >
              <Image src={item.imgUrl} alt="" width={24} height={24} />
              <p className="text-lg font-semibold max-lg:hidden">{item.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
