import ProgressTracker from "@/components/Dashboard/ProgressTracker";
import Slogan from "@/components/Dashboard/Slogan";
import ProblemTabel from "@/components/ProblemTable";
import { useUserProgress } from "@/queries/problemQueries";

const Dashboard = () => {
  const { data: progressData } = useUserProgress();

  return (
    <>
      <div className="flex flex-col 2xl:px-0 lg:px-5">
        <Slogan />

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

        <ProblemTabel />
      </div>
    </>
  );
};

export default Dashboard;
