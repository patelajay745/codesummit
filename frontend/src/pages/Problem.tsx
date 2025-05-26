import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CircularLoader from "@/components/ui/snappy-loader";
import { useProblemStore } from "@/stores/useProblemStore";
import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CodeSnippets } from "./AddProblem";
import {
  ChevronLeft,
  Code2,
  FileText,
  Lightbulb,
  MessageSquare,
  Terminal,
} from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";

type testcase = {
  input: string;
  output: string;
};

const Problem = () => {
  const { Id } = useParams({ strict: false });
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedlanguage, setSelectedLanguage] =
    useState<string>("javascript");
  const [_, setTestCases] = useState<testcase[]>([]);

  //   const { executeCode, submission, isExecuting } = useExecutionStore();

  useEffect(() => {
    getProblemById(Id);
  }, [Id]);

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

  const handleLanguageChange = (value: string) => {
    console.log(value);
    setSelectedLanguage(value);
    setCode(problem!.codeSnippets![value as keyof CodeSnippets] || "");
  };

  console.log(problem);
  if (isProblemLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularLoader />
      </div>
    );

  //   console.log("aaaa", problem!.codeSnippets);

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
                      className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
                    >
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Input:
                        </div>
                        <span className="bg-background/50 px-4 py-1 rounded-lg font-semibold text-white">
                          {example.input}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Output:
                        </div>
                        <span className="bg-background/50 px-4 py-1 rounded-lg font-semibold text-white">
                          {example.output}
                        </span>
                      </div>
                      {example.explanation && (
                        <div>
                          <div className="text-emerald-300 mb-2 text-base font-semibold">
                            Explanation:
                          </div>
                          <p className="text-base-content/70 text-lg font-sem">
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
                <div className="bg-base-200 p-6 rounded-xl mb-6">
                  <span className="bg-background/50 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                    {problem?.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <></>
          //   <SubmissionsList
          //     submissions={submissions}
          //     isLoading={isSubmissionsLoading}
          //   />
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

  return (
    <div className="container mx-auto py-6 flex gap-1 flex-col">
      <div className="flex justify-between gap-4 w-full ">
        <div className="flex items-center gap-2">
          <Link to={"/dashboard"}>
            <ChevronLeft />
          </Link>
          <div className="font-bold text-2xl">{problem?.title}</div>
        </div>
      </div>

      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="card bg-background/50 shadow-xl">
            <div className="card-body p-0">
              <div className="tabs tabs-bordered">
                <button
                  className={`tab gap-2 ${activeTab === "description" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={`tab gap-2 ${activeTab === "submissions" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`tab gap-2 ${activeTab === "discussion" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </button>
                <button
                  className={`tab gap-2 ${activeTab === "hints" ? "tab-active" : ""}`}
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

              <div className="h-[600px] w-full">
                <Editor
                  height="100%"
                  language={selectedlanguage.toLowerCase()}
                  theme={"vs-dark"}
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
                    size={"lg"}
                    className={`bg-brand gap-2 text-white hover:bg-brand/50 cursor-pointer`}
                    // onClick={handleRunCode}
                    // disabled={isExecuting}
                  >
                    {/* {!isExecuting && <Play className="w-4 h-4" />} */}
                    Run Code
                  </Button>
                  <Button
                    size={"lg"}
                    className={`bg-brand gap-2 text-white hover:bg-brand/50 cursor-pointer`}
                  >
                    Submit Solution
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;
