import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CircularLoader from "@/components/ui/snappy-loader";
import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  Clock,
  Code2,
  FileText,
  Lightbulb,
  MessageSquare,
  Terminal,
  ThumbsUp,
  Users,
} from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { getLanguageId } from "@/lib/lang";
import axios from "axios";
import { toast } from "sonner";
import SubmissionCard from "@/components/Submission";
import useThemeStore from "@/stores/useThemeStore";
import AllSubmission from "@/components/AllSubmission";
import { cn } from "@/lib/utils";
import { CodeSnippets, useProblemById } from "@/queries/problemQueries";
import {
  useGetSubmissionById,
  useGetSubmissionCount,
  useGetSuccessRate,
} from "@/queries/submissionQueries";
import { useExecuteCode } from "@/queries/executeQueries";
type testcase = {
  input: string;
  output: string;
};

const Problem = () => {
  const { Id } = useParams({ strict: false });
  const { theme } = useThemeStore();
  const [codeEditorColor, setCodeEditorColor] = useState(theme);
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedlanguage, setSelectedLanguage] =
    useState<string>("javascript");
  const [testCases, setTestCases] = useState<testcase[]>([]);

  const { data: problem, isFetching: isProblemLoading } = useProblemById(Id);
  const { data: submissions, isFetching: isSubmissionsLoading } =
    useGetSubmissionById(Id);
  const { data: submissionCount } = useGetSubmissionCount(Id);
  const { data: successRate } = useGetSuccessRate(Id);
  const {
    mutate: executeCode,
    data: submission,
    isPending: isExecuting,
  } = useExecuteCode(Id);

  useEffect(() => {
    if (problem) {
      setCode(
        problem.codeSnippets![
          selectedlanguage.toString().toUpperCase() as keyof CodeSnippets
        ] ||
          // || submission
          ""
      );

      const inputOutputArray = problem.testcases.map((testcase) => ({
        input: testcase.input,
        output: testcase.output,
      }));

      setTestCases(inputOutputArray);
    }
  }, [problem, selectedlanguage]);

  useEffect(() => {
    setCodeEditorColor(theme === "dark" ? "vs-dark" : "light");
  }, [theme]);

  const handleLanguageChange = (value: string) => {
    console.log(value);
    setSelectedLanguage(value);
    setCode(problem!.codeSnippets![value as keyof CodeSnippets] || "");
  };

  if (isProblemLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularLoader />
      </div>
    );

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-lg mb-6">{problem?.description}</p>

            {problem?.examples && (
              <>
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {problem?.examples &&
                  Object.entries(problem?.examples).map(([lang, example]) => (
                    <div
                      key={lang}
                      className="dark:bg-vs-dark bg-white/90 shadow-md p-6 rounded-xl mb-6 font-mono"
                    >
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Input:
                        </div>
                        <span className=" px-4 py-1 rounded-lg font-semibold text-white dark:bg-background bg-foreground/80">
                          {example.input}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Output:
                        </div>
                        <span className="px-4 py-1 rounded-lg font-semibold text-white dark:bg-background bg-foreground/80">
                          {example.output}
                        </span>
                      </div>
                      {example.explanation && (
                        <div>
                          <div className="text-emerald-300 mb-2 text-base font-semibold">
                            Explanation:
                          </div>
                          <p className="text-muted-foreground text-lg ">
                            {example.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
              </>
            )}

            {problem?.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                <div className=" p-6 rounded-xl mb-6 dark:bg-vs-dark bg-white/90 shadow-md">
                  <span className="px-4 py-1 rounded-lg font-semibold text-white text-lg dark:bg-background bg-foreground/80">
                    {problem?.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <AllSubmission
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      case "discussion":
        return (
          <div className="p-4 text-center text-base-content/70">
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-base-200 p-6 rounded-xl">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleRunCode = () => {
    try {
      const language_id = +(
        getLanguageId(
          selectedlanguage[0].toUpperCase() + selectedlanguage.slice(1)
        ) || 0
      );

      const stdin = problem?.testcases.map((testcases) => testcases.input);
      const expected_outputs = problem?.testcases.map(
        (testcases) => testcases.output
      );

      executeCode({
        source_code: code,
        language_id: language_id!,
        expected_outputs: expected_outputs!,
        stdin: stdin!,
        problemId: Id,
      });
    } catch (error) {
      let message = "Something went wrong";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  };

  return (
    <div className="container mx-auto py-6 flex gap-4 flex-col ">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center gap-2 ">
          <Link to={"/dashboard"}>
            <ChevronLeft />
          </Link>
          <div className="font-bold text-2xl">{problem?.title}</div>
        </div>

        <div className="">
          <div className="flex items-center gap-2 text-sm text-muted-foreground ml-6">
            <Clock className="w-4 h-4" />
            <span>
              Updated{" "}
              {problem?.createdAt
                ? new Date(problem!.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </span>
            <span className="text-base-content/30">•</span>
            <Users className="w-4 h-4" />
            <span>{submissionCount ?? 0} Submissions</span>
            <span className="text-base-content/30">•</span>
            <ThumbsUp className="w-4 h-4" />
            <span>
              {successRate == "NaN" ? 0 : (+successRate).toFixed(1)}% Success
              Rate
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="card bg-background/50 shadow-xl">
            <div className="card-body p-0">
              <div className="tabs tabs-border  text-brand ">
                <button
                  className={`tab gap-2 ${activeTab === "description" ? "tab-active hover:!text-foreground" : "!text-muted-foreground"}`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={cn(
                    `tab gap-2 ${activeTab === "submissions" ? "tab-active hover:!text-foreground" : "!text-muted-foreground"}`
                  )}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`tab gap-2 ${activeTab === "discussion" ? "tab-active hover:!text-foreground" : "!text-muted-foreground"}`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </button>
                <button
                  className={`tab gap-2 ${activeTab === "hints" ? "tab-active hover:!text-foreground" : "!text-muted-foreground"}`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hints
                </button>
              </div>

              <div className="p-6">{renderTabContent()}</div>
            </div>
          </div>

          <div className="card bg-background/50 shadow-xl">
            <div className="card-body p-0">
              <div className="tabs tabs-bordered flex  justify-between items-center py-2 pr-2">
                <button className="tab tab-active gap-2">
                  <Terminal className="w-4 h-4" />
                  Code Editor
                </button>

                <Select
                  defaultValue={selectedlanguage}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.keys(problem?.codeSnippets || {}).map((lang) => (
                        <SelectItem key={lang} value={lang.toLowerCase()}>
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* code editor */}
              <div className="h-[600px] w-full">
                <Editor
                  height="100%"
                  language={selectedlanguage.toLowerCase()}
                  theme={codeEditorColor}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              <div className="p-4 ">
                <div className="flex justify-between items-center">
                  <Button
                    type="button"
                    size={"lg"}
                    className={`bg-brand gap-2 text-white hover:bg-brand/50 cursor-pointer`}
                    onClick={handleRunCode}
                    disabled={isExecuting}
                  >
                    {isExecuting ? (
                      <span className="loading loading-spinner text-white"></span>
                    ) : (
                      <>Submit</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-background/50 shadow-xl mt-6">
          <div className="card-body">
            {submission?.problemId === Id ? (
              <SubmissionCard submission={submission!} />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Test Cases</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Input</th>
                        <th>Expected Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testCases.map((testCase, index) => (
                        <tr key={index}>
                          <td className="font-mono">{testCase.input}</td>
                          <td className="font-mono">{testCase.output}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;
