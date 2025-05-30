import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SignIn as SignInForm } from "@clerk/clerk-react";
import useThemeStore from "@/stores/useThemeStore";

const SignIn = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate({ from: "/singin" });

  const { theme } = useThemeStore();

  useEffect(() => {
    if (authUser) navigate({ to: "/dashboard" });
  }, [authUser]);

  return (
    <div className="flex h-screen justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="container flex flex-col lg:flex-row justify-between items-center max-w-7xl h-full">
        {/* Left Image Section */}
        <div className="bg-bg-accent/50 w-full lg:w-1/2 sm:flex flex-col justify-center items-center gap-5  hidden  h-full ">
          <div className="h-fit flex flex-col items-center justify-center w-full gap-5 min-h-1/2 ">
            <div className="w-3/4 max-w-sm">
              <img
                src="code.png"
                alt="Sign Up Illustration"
                className="w-full h-auto"
              />
            </div>
            <div className="flex flex-col gap-1 text-center">
              <div className="text-2xl font-semibold font-['Inter'] tracking-wide text-brand">
                Welcome Back to CodeSummit 👋
              </div>
              <div className="text-lg sm:text-xl text-muted-foreground font-['Inter'] tracking-tight ">
                Sign in to continue your coding journey
              </div>
            </div>
          </div>
        </div>

        {/* <SignInFormOld /> */}
        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center   px-4 sm:px-6 lg:px-20 h-full min-h-1/2 ">
          <SignInForm
            fallbackRedirectUrl="/dashboard"
            signUpForceRedirectUrl="/signup"
            signUpUrl="/signup"
            appearance={{
              variables: {
                colorPrimary:
                  theme === "dark" ? "rgba(34, 130, 204, 1)" : "#6366f1", // Example: violet / indigo
                colorBackground:
                  theme === "dark" ? "rgba(76, 70, 70, .20)" : "#ffffff",
                colorText: theme === "dark" ? "#ffffff" : "#0f172a",
              },
              elements: {
                card: "shadow-xl rounded-2xl", // tailwind-like classes
                formButtonPrimary: "bg-violet-600 hover:bg-violet-700",
                headerTitle: "text-2xl font-bold",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
