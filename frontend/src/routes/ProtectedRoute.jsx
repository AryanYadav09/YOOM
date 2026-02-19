import { useAuth } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "@/components/Loader";
const ProtectedRoute = ({ children }) => {
    const { isLoaded, isSignedIn } = useAuth();
    const location = useLocation();
    if (!isLoaded)
        return <Loader />;
    if (!isSignedIn) {
        const redirectUrl = `${location.pathname}${location.search}`;
        return (<Navigate to={`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`} replace/>);
    }
    return <>{children}</>;
};
export default ProtectedRoute;
