"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col md:flex-row gap-2 items-start">
    <h1 className="text-sky-1 font-medium text-base lg:text-xl xl:min-w-32">
      {title}
    </h1>
    <h1 className="truncate text-sm lg:text-xl font-bold max-sm:max-w-[320px]">
      {description}
    </h1>
  </div>
);

const PersonalRoom = () => {
  const router = useRouter()
  const { user } = useUser();
  const { toast } = useToast();
  const meetingId = user?.id;
  const client = useStreamVideoClient();
  const meetingLink = `https://${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;
    const newCall = client.call("default", meetingId!);
    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    router.push(`/meeting/${meetingId}?personal=true`)
  };
  return (
    <>
      <section className="flex size-full flex-col gap-10 text-white">
        <h1 className="font-bold text-3xl">Personal Meeting Room</h1>
        <div className="flex flex-col gap-8">
          <Table
            title="Topic:"
            description={`${user?.username}'s meeting room`}
          />
          <Table title="Meeting ID:" description={meetingId!} />
          <Table title="Invite Link:" description={meetingLink} />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-8">
          <Button className="bg-blue-1" onClick={startRoom}>
            Start meeting
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast({ title: "Link Copied" });
            }}
            className="flex gap-[6px] bg-dark-3"
          >
            <Image
              src={"/icons/copy.svg"}
              alt="copy icon"
              width={14}
              height={14}
            />
            Copy Invitation
          </Button>
        </div>
      </section>
    </>
  );
};

export default PersonalRoom;
