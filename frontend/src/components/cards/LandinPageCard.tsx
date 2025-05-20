import { FC } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

interface props {
  title: string;
  description: string;
}

const LandinPageCard: FC<props> = ({ title, description }) => {
  return (
    <Card className="w-full max-w-md py-3 gap-2 sm:gap-3  sm:py-4 text-start dark:bg-text-secondary/50 border border-brand/40 rounded-2xl bg-text-secondary/20 shadow-2xl hover:scale-110 transition delay-150 duration-300 ease-in-out">
      <CardHeader className="text-brand text-xl sm:text-2xl font-bold">
        {title}
      </CardHeader>
      <CardContent className="text-muted-foreground text-base sm:text-lg tracking-tight">
        {description}
      </CardContent>
    </Card>
  );
};

export default LandinPageCard;
