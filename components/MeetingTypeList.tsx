"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    discreption: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  // ------------ toaster
  const { toast } = useToast();

  const createMeeting = async () => {
    if(!values.dateTime){
      toast({
        title: "Please select a date and time.",
      });
      return;
    }
    if (!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAT =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const discreption = values.discreption || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAT,
          custom: {
            discreption,
          },
        },
      });

      setCallDetails(call);

      if (!values.discreption) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        className="bg-orange-1"
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        className="bg-blue-1"
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        className="bg-purple-1"
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        className="bg-yellow-1"
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push("/recordings")}
      />

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        handleClick={createMeeting}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
      />
    </section>
  );
};

export default MeetingTypeList;
