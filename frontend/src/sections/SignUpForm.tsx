import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";

interface FormDataTypes {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const SignUpForm = () => {
  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataTypes>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: FormDataTypes) => {
    console.log("clicked");
    console.log(data);
  };

  return (
    <div className="flex flex-col w-full space-y-5 ">
      <div className="flex w-full flex-col justify-center items-center ">
        <img src="./logo.png" alt="Logo" width={50} height={50} />
        <div className="sm:text-2xl font-extrabold tracking-wider font-['Inter']">
          CodeSummit
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-0.5 ">
          <label className="w-full text-foreground/70 px-2">Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Enter your Name"
            className="w-full rounded-lg px-4 py-3 dark:bg-mygray bg-mygray/20"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-0.5 ">
          <label className="w-full text-foreground/70 px-2">Email</label>
          <input
            {...register("email")}
            type="text"
            placeholder="Enter your Email"
            className="w-full rounded-lg px-4 py-3 dark:bg-mygray bg-mygray/20"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-0.5 ">
          <label className="w-full text-foreground/70 px-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full rounded-lg px-4 py-3 dark:bg-mygray bg-mygray/20"
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
            <input
              {...register("confirm_password", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full rounded-lg px-4 py-3 dark:bg-mygray bg-mygray/20"
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

        <input
          type="submit"
          value="Sign Up"
          className="bg-logoblue dark:text-foreground text-background mt-4 py-3 rounded-lg text-lg font-light font-['Inter'] w-full hover:bg-logoblue/80 cursor-pointer"
        />
      </form>
      <div className="flex w-full space-x-1  justify-center items-center text-muted-foreground ">
        <div> Have an account?</div>

        <Link to="/singin" className="text-blue-500 underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
