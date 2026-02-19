"use client";
import { useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/clerk-react";
import Loader from "@/components/Loader";
const API_KEY = import.meta.env.VITE_STREAM_API_KEY || import.meta.env.NEXT_PUBLIC_STREAM_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const StreamVideoProvider = ({ children }) => {
    const [videoClient, setVideoClient] = useState();
    const { user, isLoaded } = useUser();
    useEffect(() => {
        if (!isLoaded || !user)
            return;
        if (!API_KEY)
            throw new Error("Stream API key is missing");
        const tokenProvider = async () => {
            const response = await fetch(`${API_BASE_URL}/api/stream/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: user.id }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch stream token");
            }
            const data = (await response.json());
            return data.token;
        };
        const client = new StreamVideoClient({
            apiKey: API_KEY,
            user: {
                id: user.id,
                name: user.username || user.id,
                image: user.imageUrl,
            },
            tokenProvider,
        });
        setVideoClient(client);
        return () => {
            client
                .disconnectUser()
                .catch(() => {
                // ignore disconnect errors during teardown
            });
            setVideoClient(undefined);
        };
    }, [isLoaded, user]);
    if (!videoClient)
        return <Loader />;
    return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
export default StreamVideoProvider;
