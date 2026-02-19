const fallbackBaseUrl = "http://localhost:5173";
export const getBaseUrl = () => {
    if (typeof window !== "undefined") {
        return window.location.origin;
    }
    const envBaseUrl = import.meta.env.VITE_BASE_URL || import.meta.env.NEXT_PUBLIC_BASE_URL;
    if (envBaseUrl) {
        return envBaseUrl.replace(/\/$/, "");
    }
    return fallbackBaseUrl;
};
export const getMeetingPath = (meetingId, personal = false) => {
    return `/meeting/${meetingId}${personal ? "?personal=true" : ""}`;
};
export const getMeetingLink = (meetingId, personal = false) => {
    return `${getBaseUrl()}${getMeetingPath(meetingId, personal)}`;
};
