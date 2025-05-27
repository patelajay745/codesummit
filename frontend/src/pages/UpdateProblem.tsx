import { Button } from "@/components/ui/button";
import CircularLoader from "@/components/ui/snappy-loader";
import { cn } from "@/lib/utils";
import { useProblemById, useUpdateProblem } from "@/queries/problemQueries";
import { addProblemSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@monaco-editor/react";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  Code2,
  Lightbulb,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Problem } from "./AddProblem";

const UpdateProblem = () => {
  const { Id } = useParams({ strict: false });

  const { data, isFetching } = useProblemById(Id);

  const navigate = useNavigate();

  useEffect(() => {
    reset({
      ...data,
      hints: data?.hints ?? "",
      editorial: data?.editorial ?? "",
    });
  }, [data]);

  const { mutate: updateProblem, isPending, isSuccess } = useUpdateProblem();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<Problem>({
    resolver: zodResolver(addProblemSchema),

    defaultValues: {
      tags: [""],
    },
  });

  const mainBackgroundColor = "bg-gray-300 dark:bg-zinc-800";
  const submainBackgroundColor = "bg-gray-200 dark:bg-zinc-700";
  const textviewBackgroundColor = "dark:bg-[#1e1e1e] text-white";

  const onSubmit = (data: Problem) => {
    updateProblem({ id: Id, data: data });
  };

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  if (isFetching) {
    <div className="flex items-center justify-center h-screen">
      <CircularLoader />
    </div>;
  }

  const tags = watch("tags") || [];

  if (isSuccess) {
    navigate({ to: "/dashboard" });
  }

  return (
    <>
      <div className="hidden md:block container mx-auto py-8 ">
        <div className="card bg-background/50 shadow-xl">
          <div className="card-body p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text text-base md:text-lg font-semibold">
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    className={cn(
                      "input input-bordered w-full text-base md:text-lg",
                      mainBackgroundColor
                    )}
                    {...register("title")}
                    placeholder="Enter problem title"
                  />
                  {errors.title && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.title.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text text-base md:text-lg font-semibold">
                      Description
                    </span>
                  </label>
                  <textarea
                    className={cn(
                      "textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y ",
                      mainBackgroundColor
                    )}
                    {...register("description")}
                    placeholder="Enter problem description"
                  />
                  {errors.description && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.description.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* tags */}

              <div
                className={cn(
                  "card p-4 md:p-6 shadow-md bg-gray-300 dark:bg-zinc-800",
                  mainBackgroundColor
                )}
              >
                <Controller
                  control={control}
                  name="tags"
                  render={({ field: { value, onChange } }) => (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                          <BookOpen className="w-5 h-5" />
                          Tags
                        </h3>

                        <Button
                          type="button"
                          className="bg-brand hover:bg-brand/80 btn-sm text-white"
                          onClick={() => onChange([...value, ""])}
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add Tags
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {value.map((tag, index) => (
                          <div
                            key={index}
                            className="flex gap-2 items-center flex-wrap "
                          >
                            <input
                              value={tag}
                              {...register(`tags.${index}`)}
                              className={cn(
                                "input input-bordered ",
                                textviewBackgroundColor
                              )}
                              placeholder="Enter tag"
                              onChange={(e) => {
                                const newTags = [...value];
                                newTags[index] = e.target.value;
                                onChange(newTags);
                              }}
                            />

                            <button
                              type="button"
                              disabled={tags.length === 1}
                              className="btn btn-ghost btn-square btn-sm"
                              onClick={() => {
                                const newTags = value.filter(
                                  (_, i) => i !== index
                                );
                                onChange(newTags);
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-error" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                />
                {errors.tags && (
                  <div className="mt-2">
                    <span className="text-error text-sm">
                      {errors.tags.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Test Cases */}
              <div
                className={cn(
                  "card  p-4 md:p-6 shadow-md ",
                  mainBackgroundColor
                )}
              >
                <div className="flex items-center justify-between mb-6 ">
                  <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Test Cases
                  </h3>
                  <Button
                    className="bg-brand hover:bg-brand/80 btn-sm text-white"
                    onClick={() => appendTestCase({ input: "", output: "" })}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Test Case
                  </Button>
                </div>
                <div className="space-y-6">
                  {testCaseFields.map((field, index) => (
                    <div
                      key={field.id}
                      className={cn("card  shadow-md", submainBackgroundColor)}
                    >
                      <div className="card-body p-4 md:p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-base md:text-lg font-semibold">
                            Test Case #{index + 1}
                          </h4>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm text-error"
                            onClick={() => removeTestCase(index)}
                            disabled={testCaseFields.length === 1}
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Input
                              </span>
                            </label>
                            <textarea
                              className={cn(
                                "textarea textarea-bordered h-auto w-full p-3 resize-y",
                                textviewBackgroundColor
                              )}
                              {...register(`testcases.${index}.input`)}
                              placeholder="Enter test case input"
                            />
                            {errors.testcases?.[index]?.input && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.testcases[index].input.message}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Expected Output
                              </span>
                            </label>
                            <textarea
                              className={cn(
                                "textarea textarea-bordered h-auto w-full p-3 resize-y",
                                textviewBackgroundColor
                              )}
                              {...register(`testcases.${index}.output`)}
                              placeholder="Enter expected output"
                            />
                            {errors.testcases?.[index]?.output && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.testcases[index].output.message}
                                </span>
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.testcases && !Array.isArray(errors.testcases) && (
                  <div className="mt-2">
                    <span className="text-error text-sm">
                      {errors.testcases.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Code Editor Sections */}
              <div className="space-y-8">
                {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
                  <div
                    key={language}
                    className={cn(
                      "card p-4 md:p-6 shadow-md",
                      mainBackgroundColor
                    )}
                  >
                    <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      {language}
                    </h3>

                    <div className="space-y-6">
                      {/* Starter Code */}
                      <div
                        className={cn(
                          "card bg-base-100 shadow-md",
                          submainBackgroundColor
                        )}
                      >
                        <div className="card-body p-4 md:p-6">
                          <h4 className="font-semibold text-base md:text-lg mb-4">
                            Starter Code Template
                          </h4>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`codeSnippets.${language}`}
                              control={control}
                              render={({ field }) => (
                                <Editor
                                  className={cn(textviewBackgroundColor)}
                                  height="300px"
                                  language={language.toLowerCase()}
                                  theme="vs-dark"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                  }}
                                />
                              )}
                            />
                          </div>
                          {errors.codeSnippets?.[language] && (
                            <div className="mt-2">
                              <span className="text-error text-sm">
                                {errors.codeSnippets[language].message}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Reference Solution */}
                      <div
                        className={cn(
                          "card bg-base-100 shadow-md",
                          submainBackgroundColor
                        )}
                      >
                        <div className="card-body p-4 md:p-6">
                          <h4 className="font-semibold text-base md:text-lg mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                            Reference Solution
                          </h4>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`referenceSolution.${language}`}
                              control={control}
                              render={({ field }) => (
                                <Editor
                                  height="300px"
                                  language={language.toLowerCase()}
                                  theme="vs-dark"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                  }}
                                />
                              )}
                            />
                          </div>
                          {errors.referenceSolution?.[language] && (
                            <div className="mt-2">
                              <span className="text-error text-sm">
                                {errors.referenceSolution[language].message}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Examples */}
                      <div
                        className={cn(
                          "card bg-base-100 shadow-md",
                          submainBackgroundColor
                        )}
                      >
                        <div className="card-body p-4 md:p-6">
                          <h4 className="font-semibold text-base md:text-lg mb-4">
                            Example
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Input
                                </span>
                              </label>
                              <textarea
                                className={cn(
                                  "textarea textarea-bordered min-h-20 w-full p-3 resize-y",
                                  textviewBackgroundColor
                                )}
                                {...register(`examples.${language}.input`)}
                                placeholder="Example input"
                              />
                              {errors.examples?.[language]?.input && (
                                <label className="label">
                                  <span className="label-text-alt text-error">
                                    {errors.examples[language].input.message}
                                  </span>
                                </label>
                              )}
                            </div>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Output
                                </span>
                              </label>
                              <textarea
                                className={cn(
                                  "textarea textarea-bordered min-h-20 w-full p-3 resize-y",
                                  textviewBackgroundColor
                                )}
                                {...register(`examples.${language}.output`)}
                                placeholder="Example output"
                              />
                              {errors.examples?.[language]?.output && (
                                <label className="label">
                                  <span className="label-text-alt text-error">
                                    {errors.examples[language].output.message}
                                  </span>
                                </label>
                              )}
                            </div>
                            <div className="form-control md:col-span-2">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Explanation
                                </span>
                              </label>
                              <textarea
                                className={cn(
                                  "textarea textarea-bordered min-h-24 w-full p-3 resize-y",
                                  textviewBackgroundColor
                                )}
                                {...register(
                                  `examples.${language}.explanation`
                                )}
                                placeholder="Explain the example"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Information */}
              <div
                className={cn(
                  "card bg-base-200 p-4 md:p-6 shadow-md",
                  mainBackgroundColor
                )}
              >
                <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  Additional Information
                </h3>
                <div className="space-y-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Difficulty</span>
                    </label>
                    <select
                      className={cn(
                        "select select-bordered w-full text-base md:text-lg",
                        textviewBackgroundColor
                      )}
                      {...register("difficulty")}
                    >
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>
                    {errors.difficulty && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.difficulty.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Constraints
                      </span>
                    </label>
                    <textarea
                      className={cn(
                        "textarea textarea-bordered min-h-24 w-full p-3 resize-y",
                        textviewBackgroundColor
                      )}
                      {...register("constraints")}
                      placeholder="Enter problem constraints"
                    />
                    {errors.constraints && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.constraints.message}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Hints (Optional)
                      </span>
                    </label>
                    <textarea
                      defaultValue={""}
                      className={cn(
                        "textarea textarea-bordered min-h-24 w-full p-3 resize-y",
                        textviewBackgroundColor
                      )}
                      {...register("hints")}
                      placeholder="Enter hints for solving the problem"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Editorial (Optional)
                      </span>
                    </label>
                    <textarea
                      defaultValue={""}
                      className={cn(
                        "textarea textarea-bordered min-h-32 w-full p-3 resize-y",
                        textviewBackgroundColor
                      )}
                      {...register("editorial")}
                      placeholder="Enter problem editorial/solution explanation"
                    />
                  </div>
                </div>
              </div>

              <div className="card-actions justify-end pt-4 border-t">
                <Button className="bg-brand hover:bg-brand/80 text-white btn-lg gap-2">
                  {isPending ? (
                    <span className="loading loading-spinner text-white"></span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Update Problem
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="md:hidden container mx-auto bg-background/50 h-screen flex items-center justify-center text-2xl font-extrabold">
        Not available for small screen
      </div>
    </>
  );
};

export default UpdateProblem;
