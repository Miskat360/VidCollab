import CallList from "@/components/CallList";
import MeetingTypeList from "@/components/MeetingTypeList";
import React from "react";

const page = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-Us", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );
  return (
    <section className="flex flex-col gap-10 text-white size-full">
      <div className="w-full h-[300px] rounded-[20px] bg-hero object-cover">
        <div className="flex flex-col justify-between h-full max-md:px-5 max-md:py-8 md:p-11">
          <h2 className="py-2 bg-white/10 rounded max-w-[270px] text-center">
            Upcoming Meeting al: 12:30 PM
          </h2>
          <div className="flex flex-col lg:gap-6 sm:gap-2 max-sm:gap-1">
            <h1 className="text-4xl lg:text-[4.5rem] font-extrabold">{time}</h1>
            <h2 className="text-lg lg:text-2xl font-medium text-sky-1">
              {date}
            </h2>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default page;
