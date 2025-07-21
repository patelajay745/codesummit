import Leaderboard from "@/components/Dashboard/Leaderboard";
import ProgressTracker from "@/components/Dashboard/ProgressTracker";

import ProblemTabel from "@/components/ProblemTable";
import { useUserProgress } from "@/queries/problemQueries";

const Dashboard = () => {
  const { data: progressData } = useUserProgress();

  return (
    <>
      <div className="flex flex-col 2xl:px-0 lg:px-5 py-2 mx-auto">
        {/* <Slogan /> */}

        {progressData && (
          <ProgressTracker
            solved={progressData.solved}
            total={progressData.total}
            easy={progressData.easy}
            medium={progressData.medium}
            hard={progressData.hard}
            className="mx-auto container mb-5"
          />
        )}

        <div className="container mx-auto grid grid-cols-4  gap-4 max-w-7xl">
          <ProblemTabel />

          <Leaderboard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
