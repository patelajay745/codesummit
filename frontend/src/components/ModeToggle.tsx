import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import useThemeStore from "@/stores/useThemeStore";

const ModeToggle = () => {
  const { toogleTheme } = useThemeStore();
  return (
    <Button
      variant={"ghost"}
      type="button"
      size={"icon"}
      className="px-2"
      onClick={toogleTheme}
    >
      <SunIcon className="h-[1.5rem] w-[1.5rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
      <MoonIcon className="hidden h-[1.5rem] w-[1.5rem] text-neutral-800 dark:block dark:text-neutral-200" />
    </Button>
  );
};

export default ModeToggle;
