import { Outlet } from "react-router-dom";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import ProtectedRoute from "./ProtectedRoute";
const ProtectedApp = () => {
    return (<ProtectedRoute>
      <StreamVideoProvider>
        <Outlet />
      </StreamVideoProvider>
    </ProtectedRoute>);
};
export default ProtectedApp;
