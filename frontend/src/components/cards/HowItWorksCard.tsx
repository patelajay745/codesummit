import { FC } from "react";

interface props {
  stepNumber: string;
  title: string;
  description: string;
}

const HowItWorksCard: FC<props> = ({ stepNumber, title, description }) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full h-full lg:max-w-[220px] 2xl:max-w-none">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-brand/80 text-white border border-text-secondary text-2xl font-extrabold">
        {stepNumber}
      </div>
      <div className="flex flex-col gap-1 text-center">
        <div className="font-bold text-text-secondary dark:text-foreground/80">
          {title}
        </div>
        <div className="text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};

export default HowItWorksCard;
