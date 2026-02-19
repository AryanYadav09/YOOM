import { SignIn, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
const SignInPage = () => {
    const { isSignedIn } = useAuth();
    if (isSignedIn) {
        return <Navigate to="/" replace/>;
    }
    return (<main className="flex h-screen w-full items-center justify-center">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up"/>
    </main>);
};
export default SignInPage;
