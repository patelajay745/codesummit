import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useEmailSend } from "@/queries/authQueries";
import { signInSchema } from "@/schemas";
import { useAuthStore } from "@/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export interface loginFormDataTypes {
  email: string;
  password: string;
}

export function SignInForm() {
  const [showPassword, setPassword] = useState(false);
  const navigate = useNavigate();
  const { isLoggingIn, signIn } = useAuthStore();
  const [showResendEmail, setShowResendEmail] = useState(false);
  const { mutate: sendEmail } = useEmailSend();

  const sendEmailAgain = () => {
    const email = getValues("email");

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    console.log(email);

    sendEmail({ email });
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<loginFormDataTypes>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: loginFormDataTypes) => {
    try {
      const user = await signIn(data);

      if (user?.verified) {
        navigate({ to: "/dashboard" });
      }

      setShowResendEmail(true);
    } catch (error) {}
  };
  return (
    <div className="flex flex-col w-full space-y-5 dark:bg-text-secondary/20 bg-background/50 p-4 rounded-2xl shadow-xl border-1 border-muted-foreground/40 dark:border-muted-foreground/20">
      <div className="flex w-full flex-col justify-center items-center ">
        <img src="./logo.png" alt="Logo" width={50} height={50} />
        <div className="sm:text-2xl font-extrabold tracking-wider font-['Inter']">
          CodeSummit
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-0.5 ">
          <label className="w-full text-foreground/70 px-2">Email</label>
          <Input
            {...register("email")}
            type="text"
            placeholder="Enter your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-0.5 ">
          <label className="w-full text-foreground/70 px-2">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          disabled={isLoggingIn}
          className="bg-brand dark:text-foreground text-background mt-4 py-3 rounded-lg text-lg font-light font-['Inter'] w-full hover:bg-brand/80 cursor-pointer"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="animate-spin h-5 w-5">Loading...</Loader2>
            </>
          ) : (
            "SignIn"
          )}
        </Button>
      </form>
      <div className="flex w-full space-x-1  justify-center items-center text-muted-foreground ">
        <div>Don't Have an account?</div>

        <Link to="/signup" className="text-brand underline">
          SignUp
        </Link>
      </div>
      {showResendEmail && (
        <div className="flex w-full space-x-1  justify-center items-center text-muted-foreground ">
          <div>Didn't receive verification email?</div>
          <Button
            variant={"ghost"}
            className="cursor-pointer underline p-0 text-brand"
            onClick={sendEmailAgain}
          >
            Send Again
          </Button>
        </div>
      )}
    </div>
  );
}
