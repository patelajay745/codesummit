import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Input from "@/components/ui/input";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";

export interface FormDataTypes {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const SignUpForm = () => {
  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const { isSignInUp, signUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataTypes>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: FormDataTypes) => {
    await signUp(data);
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
          <label className="w-full text-foreground/70 px-2">Name</label>

          <Input
            {...register("name")}
            type="text"
            placeholder="Enter your Name"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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

        <div className="flex flex-col gap-0.5 ">
          <label className="w-full text-foreground/70 px-2">
            Confirm Password
          </label>

          <div className="relative">
            <Input
              {...register("confirm_password")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        <Button
          className="bg-brand dark:text-foreground text-background mt-4 py-3 rounded-lg text-lg font-light font-['Inter'] w-full hover:bg-brand/80 cursor-pointer"
          disabled={isSignInUp}
        >
          {isSignInUp ? (
            <>
              <Loader2 className="animate-spin h-5 w-5">Loading...</Loader2>
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
      <div className="flex w-full space-x-1  justify-center items-center text-muted-foreground ">
        <div> Have an account?</div>

        <Link to="/signin" className="text-brand underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
