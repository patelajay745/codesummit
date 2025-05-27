import Slogan from "@/components/Dashboard/Slogan";
import ProblemTabel from "@/components/ProblemTable";
import CircularLoader from "@/components/ui/snappy-loader";
import { useAllProblems } from "@/queries/problemQueries";

const Dashboard = () => {
  const { data: problems, isLoading } = useAllProblems();

  if (isLoading) {
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

        <ProblemTabel data={problems} />
      </div>
    </>
  );
};

export default Dashboard;
