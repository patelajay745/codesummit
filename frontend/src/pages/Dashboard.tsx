import ProgressTracker from "@/components/Dashboard/ProgressTracker";
import Slogan from "@/components/Dashboard/Slogan";
import ProblemTabel from "@/components/ProblemTable";
import CircularLoader from "@/components/ui/snappy-loader";
import { useAllProblems, useUserProgress } from "@/queries/problemQueries";

const Dashboard = () => {
  const { data: problems, isLoading: problemsLoading } = useAllProblems();
  const { data: progressData, isLoading: progressLoading } = useUserProgress();

  if (problemsLoading || progressLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularLoader />
      </div>
    );
  }

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

        {<ProblemTabel data={problems} />}
      </div>
    </>
  );
};

export default Dashboard;
