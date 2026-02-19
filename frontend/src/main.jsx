import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import App from "./App";
import { Toaster } from "@/components/ui/toaster";
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
    import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
    throw new Error("Missing Clerk publishable key");
}
ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode>
    <ClerkProvider publishableKey={publishableKey} appearance={{
        layout: {
            socialButtonsVariant: "iconButton",
            logoImageUrl: "/icons/yoom-logo.svg",
        },
        variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A41",
            colorInputText: "#fff",
        },
    }}>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>);
