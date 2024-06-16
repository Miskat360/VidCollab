"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

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
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time.",
        });
        return;
      }
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

  const meetingLink = `https://${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
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
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        className="bg-purple-1"
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push("/recordings")}
      />
      <HomeCard
        className="bg-yellow-1"
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-sky-2">Add a discreption</label>
            <Textarea
              className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, discreption: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-sky-2">Select Date & Time</label>
            <DatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 focus:outline-none px-2 py-1"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
          image={"/icons/checked.svg"}
          buttonIcon="/icons/copy.svg"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        handleClick={createMeeting}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        handleClick={() => router.push(values.link)}
        title="Type the link here"
        buttonText="Join Meeting"
      >
        <Input
          placeholder="Meeting link"
          className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e)=> setValues({...values, link: e.target.value})}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
