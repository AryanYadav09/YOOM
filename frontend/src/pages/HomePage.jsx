import { useEffect, useMemo, useState } from "react";

import MeetingTypeList from "@/components/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";

const HomePage = () => {
    const [now, setNow] = useState(() => new Date());
    const { upcomingCalls } = useGetCalls();
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    const time = useMemo(() => now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }), [now]);
    const date = useMemo(() => new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now), [now]);
    const nextUpcomingCall = useMemo(() => {
        if (!upcomingCalls || upcomingCalls.length === 0) {
            return null;
        }
        let nearestCall = null;
        let nearestStartsAt = Number.POSITIVE_INFINITY;
        for (const call of upcomingCalls) {
            const startsAtValue = call.state?.startsAt;
            if (!startsAtValue)
                continue;
            const startsAt = startsAtValue instanceof Date
                ? startsAtValue
                : new Date(startsAtValue);
            const startsAtMs = startsAt.getTime();
            if (Number.isNaN(startsAtMs))
                continue;
            if (startsAtMs < nearestStartsAt) {
                nearestStartsAt = startsAtMs;
                nearestCall = call;
            }
        }
        return nearestCall;
    }, [upcomingCalls]);
    const upcomingMeetingLabel = useMemo(() => {
        if (!nextUpcomingCall?.state?.startsAt) {
            return "";
        }
        const startsAtValue = nextUpcomingCall.state.startsAt;
        const startsAt = startsAtValue instanceof Date
            ? startsAtValue
            : new Date(startsAtValue);
        const isToday = startsAt.toDateString() === now.toDateString();
        if (isToday) {
            return `Upcoming Meeting at: ${startsAt.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            })}`;
        }
        return `Upcoming Meeting: ${new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(startsAt)}`;
    }, [nextUpcomingCall, now]);
    return (<section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          {upcomingMeetingLabel && (<h2 className="glassmorphism max-w-[340px] rounded py-2 text-center text-base font-normal">
              {upcomingMeetingLabel}
            </h2>)}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>);
};
export default HomePage;
