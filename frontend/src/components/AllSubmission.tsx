// import { Submission } from "@/stores/useSubmission";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MemoryStick,
  XCircle,
} from "lucide-react";
import { FC } from "react";
import { Badge } from "./ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Submission } from "@/queries/submissionQueries";

interface props {
  isLoading: boolean;
  submissions: Submission[] | null;
}

const AllSubmission: FC<props> = ({ isLoading, submissions }) => {
  const safeParse = (data: string) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };

  // Helper function to calculate average memory usage
  const calculateAverageMemory = (memoryData: string) => {
    const memoryArray = safeParse(memoryData).map((m: string) =>
      parseFloat(m.split(" ")[0])
    );
    if (memoryArray.length === 0) return 0;
    return (
      memoryArray.reduce((acc: number, curr: number) => acc + curr, 0) /
      memoryArray.length
    );
  };

  // Helper function to calculate average runtime
  const calculateAverageTime = (timeData: string) => {
    const timeArray = safeParse(timeData).map((t: string) =>
      parseFloat(t.split(" ")[0])
    );
    if (timeArray.length === 0) return 0;
    return (
      timeArray.reduce((acc: number, curr: number) => acc + curr, 0) /
      timeArray.length
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // No submissions state
  if (!submissions?.length) {
    return (
      <div className="text-center p-8">
        <div className="text-base-content/70">No submissions yet</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {submissions!.map((submission) => {
          const avgMemory = calculateAverageMemory(submission.memory);
          const avgTime = calculateAverageTime(submission.time);

          return (
            <>
              <AccordionItem
                value={submission.id}
                key={submission.id}
                className="space-y-2"
              >
                <AccordionTrigger className=" dark:bg-vs-dark bg-white/90 shadow-md hover:shadow-xl transition-shadow rounded-lg w-full flex items-center  hover:no-underline cursor-pointer ">
                  <div className="flex items-center justify-between pl-4 w-full ">
                    {/* Left Section: Status and Language */}
                    <div className="flex items-center gap-4 ">
                      {submission.status === "Accepted" ? (
                        <div className="flex items-center gap-2 text-success">
                          <CheckCircle2 className="w-6 h-6" />
                          <span className="font-semibold">Accepted</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-error">
                          <XCircle className="w-6 h-6" />
                          <span className="font-semibold">
                            {submission.status}
                          </span>
                        </div>
                      )}

                      <Badge className="bg-transparent border-1 border-foreground/20 text-foreground capitalize">
                        {submission.language}
                      </Badge>
                    </div>

                    {/* Right Section: Runtime, Memory, and Date */}
                    <div className="flex items-center gap-4 text-muted-foreground ">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{avgTime.toFixed(3)} s</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MemoryStick className="w-4 h-4" />
                        <span>{avgMemory.toFixed(0)} KB</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(submission.createAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <pre className="dark:bg-vs-dark shadow-md hover:shadow-xl transition-shadow bg-white/90 p-4 text-muted-foreground rounded-lg">
                    {submission.sourceCode}
                  </pre>
                </AccordionContent>
              </AccordionItem>
            </>
          );
        })}
      </Accordion>
    </div>
  );
};

export default AllSubmission;
