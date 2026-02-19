import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import ReactDatePicker from "react-datepicker";
import { gsap } from "gsap";

import HomeCard from "./HomeCard";
import Loader from "./Loader";
import MeetingModal from "./MeetingModal";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { getMeetingLink, getMeetingPath } from "@/lib/urls";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingTypeList = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [meetingState, setMeetingState] = useState();
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const isInstantMeeting = meetingState === "isInstantMeeting";
  const isScheduleMeeting = meetingState === "isScheduleMeeting";
  const isJoiningMeeting = meetingState === "isJoiningMeeting";
  const meetingLink = useMemo(
    () => (callDetail ? getMeetingLink(callDetail.id) : ""),
    [callDetail]
  );

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-home-card]",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.65,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const createMeeting = async () => {
    if (!client || !user) return;

    if (!values.dateTime) {
      toast({ title: "Please select a date and time" });
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: values.dateTime.toISOString(),
          custom: { description },
        },
      });

      setCallDetail(call);

      if (isInstantMeeting) {
        navigate(getMeetingPath(call.id));
      } else {
        toast({ title: "Meeting Created" });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to create Meeting" });
    }
  };

  const handleJoinMeeting = () => {
    if (!values.link) return;

    if (values.link.startsWith("http://") || values.link.startsWith("https://")) {
      window.location.href = values.link;
      return;
    }

    navigate(values.link);
  };

  if (!client || !user) return <Loader />;

  return (
    <section
      ref={sectionRef}
      className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 opacity-100 visible"
    >
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-[#8b5d45]"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-[#3d5f8d]"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-[#5f4f85]"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-[#867438]"
        handleClick={() => navigate("/recordings")}
      />

      {!callDetail ? (
        <MeetingModal
          isOpen={isScheduleMeeting}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, description: event.target.value }))
              }
            />
          </div>

          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => {
                if (date) {
                  setValues((prev) => ({ ...prev, dateTime: date }));
                }
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={isScheduleMeeting}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={isJoiningMeeting}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={handleJoinMeeting}
      >
        <Input
          placeholder="Meeting link"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, link: event.target.value }))
          }
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      <MeetingModal
        isOpen={isInstantMeeting}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
