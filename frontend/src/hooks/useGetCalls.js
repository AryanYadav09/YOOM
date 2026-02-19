import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";

export const useGetCalls = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadCalls = async () => {
      if (!client || !user?.id) {
        if (isMounted) {
          setCalls([]);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);

      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls: queriedCalls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        if (isMounted) {
          setCalls(queriedCalls ?? []);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setCalls([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCalls();

    return () => {
      isMounted = false;
    };
  }, [client, user?.id]);

  const { endedCalls, upcomingCalls } = useMemo(() => {
    if (calls.length === 0) {
      return { endedCalls: [], upcomingCalls: [] };
    }

    const now = Date.now();
    const ended = [];
    const upcoming = [];

    for (const call of calls) {
      const startsAt = call.state?.startsAt;
      const endedAt = call.state?.endedAt;
      const startsAtMs = startsAt ? new Date(startsAt).getTime() : 0;

      if ((startsAt && startsAtMs < now) || Boolean(endedAt)) {
        ended.push(call);
        continue;
      }

      if (startsAt && startsAtMs > now) {
        upcoming.push(call);
      }
    }

    return { endedCalls: ended, upcomingCalls: upcoming };
  }, [calls]);

  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
