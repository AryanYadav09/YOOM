import { useEffect, useState } from "react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";

export const useGetCallById = (id) => {
  const [call, setCall] = useState(null);
  const [isCallLoading, setIsCallLoading] = useState(true);
  const client = useStreamVideoClient();

  useEffect(() => {
    let isMounted = true;

    if (!client || !id) {
      setCall(null);
      setIsCallLoading(false);
      return () => {
        isMounted = false;
      };
    }

    const loadCall = async () => {
      setIsCallLoading(true);

      try {
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        if (isMounted) {
          setCall(calls[0] ?? null);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setCall(null);
        }
      } finally {
        if (isMounted) {
          setIsCallLoading(false);
        }
      }
    };

    loadCall();

    return () => {
      isMounted = false;
    };
  }, [client, id]);

  return { call, isCallLoading };
};
