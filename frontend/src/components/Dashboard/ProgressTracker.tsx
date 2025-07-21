import React from "react";
import { cn } from "@/lib/utils";

interface DifficultyData {
  solved: number;
  total: number;
}

interface ProgressIndicatorProps {
  solved: number;
  total: number;
  easy: DifficultyData;
  medium: DifficultyData;
  hard: DifficultyData;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  solved,
  total,
  easy,
  medium,
  hard,
  className,
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progressPercentage = total > 0 ? (solved / total) * 100 : 0;
  const strokeDashoffset =
    circumference - (progressPercentage / 100) * circumference;

  const getPercentage = (solved: number, total: number) => {
    return total > 0 ? Math.round((solved / total) * 100) : 0;
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 flex w-full gap-6  border border-muted-foreground/20  max-w-7xl mx-auto",
        className
      )}
    >
      <div className="flex items-center justify-center  ">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(55, 65, 81, 0.3)"
              strokeWidth="6"
              fill="none"
            />

            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-out"
            />

            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center dark:text-white text-foreground">
            <div className="text-2xl font-bold">{solved}</div>
            <div className="text-xs dark:text-gray-400 text-muted-foreground">
              /{total}
            </div>
            <div className="text-xs dark:text-gray-300 text-muted-foreground mt-1">
              Solved
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-4">
        <div className="flex flex-col justify-between dark:bg-transparent bg-white/10 rounded-xl p-5 w-full border border-slate-600/50 hover:border-emerald-500/50 transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="w-4 h-4 rounded-full bg-emerald-500 mr-3 shadow-lg shadow-emerald-500/30"></div>
            <span className="text-emerald-400 font-semibold">Easy</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="dark:text-white text-foreground font-mono text-lg font-bold">
                {easy.solved}/{easy.total}
              </span>
              <span className="text-emerald-300 font-semibold text-sm">
                {getPercentage(easy.solved, easy.total)}%
              </span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(easy.solved, easy.total)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between dark:bg-transparent bg-white/10 rounded-xl p-5 w-full border border-slate-600/50 hover:border-amber-500/50 transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="w-4 h-4 rounded-full bg-amber-500 mr-3 shadow-lg shadow-amber-500/30"></div>
            <span className="text-amber-400 font-semibold">Medium</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="dark:text-white text-foreground font-mono text-lg font-bold">
                {medium.solved}/{medium.total}
              </span>
              <span className="text-amber-300 font-semibold text-sm">
                {getPercentage(medium.solved, medium.total)}%
              </span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${getPercentage(medium.solved, medium.total)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between dark:bg-transparent bg-white/10 rounded-xl p-5 w-full border border-slate-600/50 hover:border-red-500/50 transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-3 shadow-lg shadow-red-500/30"></div>
            <span className="text-red-400 font-semibold">Hard</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="dark:text-white text-foreground font-mono text-lg font-bold">
                {hard.solved}/{hard.total}
              </span>
              <span className="text-red-300 font-semibold text-sm">
                {getPercentage(hard.solved, hard.total)}%
              </span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(hard.solved, hard.total)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
