import { useGetAllSubmission } from "@/queries/submissionQueries";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Code,
  HardDrive,
  Terminal,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CodeBlock } from "./ui/code-block";

const ProfileSubmission = () => {
  const { data: submissions } = useGetAllSubmission();
  const [expandedSubmission, setExpandedSubmission] = useState<string | null>(
    null
  );
  const [filter, setFilter] = useState("all");

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-success text-success-content";
      case "Wrong Answer":
        return "bg-error text-error-content";
      case "Time Limit Exceeded":
        return "bg-warning text-warning-content";
      default:
        return "bg-info text-info-content";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const toggleExpand = (id: string) => {
    if (expandedSubmission === id) {
      setExpandedSubmission(null);
    } else {
      setExpandedSubmission(id);
    }
  };

  const filteredSubmissions = submissions?.filter((submission) => {
    if (filter === "all") return true;
    return submission.status === filter;
  });

  return (
    <div className="card bg-background/50 shadow-xl p-4 md:p-8">
      <div className="w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6  ">
          <h1 className="text-3xl font-bold text-primary mb-4 md:mb-0">
            My Submissions
          </h1>

          <div className=" justify-center items-center flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Select
              defaultValue="all"
              onValueChange={(value) => {
                setFilter(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Submission Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Submissions</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Wrong Answer">Wrong Answer</SelectItem>
                  <SelectItem value="Time Limit Exceeded">
                    Time Limit Exceeded
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="stats shadow outline px-2 space-x-5 py-1">
              <div className="flex items-center gap-2 ">
                <div className="stat-title text-lg text-foreground">Total</div>
                <div className="stat-value text-lg">{submissions?.length}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="stat-title text-lg text-foreground">
                  Accepted
                </div>
                <div className="stat-value text-lg text-success">
                  {submissions?.filter((s) => s.status === "Accepted").length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredSubmissions?.length === 0 ? (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title">No submissions found</h2>
              <p>
                You haven't submitted any solutions yet, or none match your
                current filter.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSubmissions?.map((submission) => (
              <div
                key={submission.id}
                className="card dark:bg-vs-dark bg-white/90 shadow-lg border-1 rounded-box  overflow-hidden transition-all duration-300 "
              >
                <div
                  className="card-body p-0"
                  role="button"
                  onClick={() => toggleExpand(submission.id)}
                >
                  {/* Submission Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 cursor-pointer ">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
                      <div
                        className={`badge px-2 badge-lg !text-background ${getStatusClass(submission.status)}`}
                      >
                        {submission.status === "Accepted" ? (
                          <Check size={14} className="mr-1" />
                        ) : (
                          <X size={14} className="mr-1" />
                        )}
                        {submission.status.split(" ")[0]}
                      </div>

                      <div className="flex items-center gap-2">
                        <Code size={16} />
                        <span className="font-medium">
                          {submission.language}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>
                          Submitted {formatDate(submission.createAt!)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3 md:mt-0">
                      {expandedSubmission === submission.id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedSubmission === submission.id && (
                    <div className="border-t border-base-300">
                      {/* Code Section */}
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                          <Code size={18} />
                          Solution Code
                        </h3>

                        <CodeBlock
                          className="mockup-code bg-neutral/50 text-neutral-content overflow-x-auto"
                          language={submission.language.toLowerCase()}
                          code={submission.sourceCode}
                        />
                      </div>

                      {/* Input/Output Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-t border-base-300">
                        <div>
                          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <Terminal size={18} />
                            Input
                          </h3>
                          <div className="mockup-code bg-neutral/50 text-neutral-content">
                            <pre className="p-4">
                              <code>
                                {submission.stdin || "No input provided"}
                              </code>
                            </pre>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <Terminal size={18} />
                            Output
                          </h3>
                          <div className="mockup-code bg-neutral/50 text-neutral-content ">
                            <pre className="p-4">
                              <code>
                                {Array.isArray(JSON.parse(submission.stdout))
                                  ? JSON.parse(submission.stdout).join("")
                                  : submission.stdout || "No output"}
                              </code>
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* Performance Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border-t border-base-300">
                        <div className="stats shadow">
                          <div className="stat">
                            <div className="stat-figure text-primary">
                              <Clock size={24} />
                            </div>
                            <div className="stat-title">Execution Time</div>
                            <div className="stat-value text-lg">
                              {Array.isArray(JSON.parse(submission.time))
                                ? JSON.parse(submission.time)[0]
                                : submission.time || "N/A"}
                            </div>
                          </div>
                        </div>

                        <div className="stats shadow">
                          <div className="stat">
                            <div className="stat-figure text-primary">
                              <HardDrive size={24} />
                            </div>
                            <div className="stat-title">Memory Used</div>
                            <div className="stat-value text-lg">
                              {Array.isArray(JSON.parse(submission.memory))
                                ? JSON.parse(submission.memory)[0]
                                : submission.memory || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSubmission;
