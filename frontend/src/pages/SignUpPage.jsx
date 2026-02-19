import { SignUp, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
const SignUpPage = () => {
    const { isSignedIn } = useAuth();
    if (isSignedIn) {
        return <Navigate to="/" replace/>;
    }
    return (<main className="flex h-screen w-full items-center justify-center">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in"/>
    </main>);
};
export default SignUpPage;
