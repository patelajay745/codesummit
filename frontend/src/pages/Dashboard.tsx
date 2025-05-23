import Slogan from "@/components/Dashboard/Slogan";
import ProblemTabel from "@/components/ProblemTabel";
import CircularLoader from "@/components/ui/snappy-loader";
import { useProblemStore } from "@/stores/useProblemStore";
import { useEffect } from "react";

const Dashboard = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularLoader />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <Slogan />
        <div className="container flex h-screen mx-auto">
          <ProblemTabel data={problems} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
