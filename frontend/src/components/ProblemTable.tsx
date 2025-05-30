import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC, useEffect, useMemo, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";

import { Bookmark, PencilIcon, Trash2Icon, Plus, Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Input from "./ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { ProblemType, useDeleteProblem } from "@/queries/problemQueries";
import { useAddPlaylist } from "@/queries/playlistQueries";
import AddToPlaylist from "./AddToPlaylist";
import CreatePlaylistModal, { FormData } from "./createPlaylistModal";
import { getTagCounts } from "@/lib/lang";

type Props = {
  data: ProblemType[];
};

const ProblemTabel: FC<Props> = ({ data }) => {
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModal, setIsAddToPlaylistModal] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const { authUser } = useAuthStore();

  const navigate = useNavigate();

  if (!data) {
    return <></>;
  }

  const { mutate: deleteProblem, isPending } = useDeleteProblem();
  const { mutate: addPlaylist } = useAddPlaylist();

  const filteredProblems = useMemo(() => {
    return (data || [])
      .filter((problem) =>
        search.length === 0
          ? true
          : problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "All" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "All" ? true : problem.tags?.includes(selectedTag)
      )
      .filter((problem) =>
        selectedCompany === "All"
          ? true
          : problem.company?.includes(selectedCompany)
      );
  }, [data, difficulty, selectedTag, search, selectedCompany]);

  useEffect(() => {
    setCurrentPage(1);
  }, [difficulty, selectedTag, search, selectedCompany]);

  const tagCounts = getTagCounts(data);

  const uniqueTags = Array.from(
    new Set(data.flatMap((problem) => problem.tags))
  ).sort((a, b) => a.localeCompare(b));

  const uniqueDifficulty = Array.from(
    new Set(data.flatMap((problem) => problem.difficulty))
  );

  const uniqueCompany = Array.from(
    new Set(data.flatMap((problem) => problem.company).filter(Boolean))
  );

  const companyColorMap: Record<string, string> = {
    Amazon: "bg-yellow-800",
    Google: "bg-blue-800",
    Microsoft: "bg-green-800",
    Facebook: "bg-indigo-800",
    Apple: "bg-gray-800",
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const pageinatedProblems = useMemo(() => {
    return (filteredProblems || data).slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage, data]);

  const handleCreatePlaylist = async (data: FormData) => {
    addPlaylist(data);
  };

  const handleAddToPlaylist = (problemId: string) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModal(true);
  };

  return (
    <div className="container flex flex-col  mx-auto pb-8">
      {/* search div */}

      <div className="gap-2 flex overflow-hidden justify-evenly  pr-20">
        <Badge
          className="capitalize cursor-pointer"
          variant={"outline"}
          onClick={() => setSelectedTag("All")}
        >
          All
        </Badge>
        <Badge
          className="capitalize cursor-pointer"
          variant={"outline"}
          onClick={() => setSelectedTag("demo")}
        >
          Demo
        </Badge>
        {Object.entries(tagCounts).map(([tag, count]) =>
          tag !== "demo" ? (
            <Badge
              variant={"outline"}
              className="capitalize cursor-pointer"
              key={tag}
              onClick={() => setSelectedTag(tag)}
            >
              {tag} ({count})
            </Badge>
          ) : (
            <></>
          )
        )}
      </div>

      <div className="flex justify-between items-center mt-5 mb-6">
        <h2 className="text-2xl font-bold">Problems</h2>
        <div className="flex gap-4">
          <Input
            type="text"
            className="h-9 w-auto"
            placeholder="Search by title"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(search);
            }}
          />

          <Select
            onValueChange={(value) => {
              setDifficulty(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"All"}>All Difficulties</SelectItem>
                {uniqueDifficulty.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() +
                      difficulty.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => {
              setSelectedCompany(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"All"}>All Company</SelectItem>
                {uniqueCompany.map((company) => (
                  <SelectItem
                    key={company}
                    value={company}
                    className="capitalize"
                  >
                    {company}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => {
              setSelectedTag(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All" defaultChecked={true}>
                  All Tags
                </SelectItem>
                {uniqueTags.map((tag) => (
                  <SelectItem key={tag} value={tag} className="capitalize">
                    {tag}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            className="bg-text-secondary text-white gap-2 hover:bg-brand/80 cursor-pointer"
            onClick={() => {
              setIsCreateModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Create Playlist
          </Button>
        </div>
      </div>

      {/* problem table */}
      <Table className="rounded-xl  border  overflow-hidden text-start  ">
        <TableHeader className="text-lg font-bold tracking-wider text-center  py-4 bg-brand ">
          <TableRow className="py-4 ">
            <TableHead className=" text-white text-center">Solved</TableHead>
            <TableHead className=" text-white">Title</TableHead>
            <TableHead className=" text-white">Tags</TableHead>
            <TableHead className=" text-white">Company</TableHead>
            <TableHead className="text-white">Dificulty</TableHead>

            <TableHead className="text-white  ">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-background/50 ">
          {pageinatedProblems.length > 0 ? (
            pageinatedProblems.map((problem) => {
              const isSolved = problem.ProblemSolved.some(
                (user) => user.userId === authUser?.id
              );
              return (
                <TableRow key={problem.id}>
                  <TableCell className="font-medium text-center ">
                    {
                      <Checkbox
                        id="solved"
                        checked={isSolved}
                        className="bg-foreground/10"
                      />
                    }
                  </TableCell>

                  <TableCell>
                    <Link
                      to={`/problem/${problem.id}`}
                      className="cursor-pointer hover:underline"
                    >
                      {problem.title}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-row gap-2">
                      {problem.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-transparent border-1 border-foreground/20 text-foreground capitalize"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-2">
                      {problem.company ? (
                        <Badge
                          className={`${companyColorMap[problem.company] || "bg-text-secondary"} text-white`}
                        >
                          {problem.company}
                        </Badge>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="text-start">
                    {problem.difficulty === "EASY" ? (
                      <Badge className="bg-green-950 outline text-white">
                        {problem.difficulty}
                      </Badge>
                    ) : problem.difficulty === "MEDIUM" ? (
                      <Badge className="bg-yellow-950 outline text-white">
                        {problem.difficulty}
                      </Badge>
                    ) : (
                      <Badge className="bg-red-950 outline text-white">
                        {problem.difficulty}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                      {authUser?.role === "ADMIN" && (
                        <div className="flex gap-2">
                          <Button
                            id={problem.id}
                            type="button"
                            variant={"outline"}
                            disabled={isPending}
                            onClick={() => {
                              deleteProblem(problem.id);
                            }}
                            className="outline p-2 rounded cursor-pointer "
                          >
                            {isPending ? (
                              <Loader className="animate-spin w-4 h-4"></Loader>
                            ) : (
                              <Trash2Icon className="w-4 h-4 text-foreground" />
                            )}
                          </Button>
                          <Button
                            variant={"outline"}
                            className="outline p-2 rounded cursor-pointer"
                            onClick={() =>
                              navigate({ to: `/updateproblem/${problem.id}` })
                            }
                          >
                            <PencilIcon className="w-4 h-4 text-foreground" />
                          </Button>
                        </div>
                      )}
                      <Button
                        variant={"outline"}
                        className="outline p-2 rounded flex gap-2 items-center  cursor-pointer"
                        onClick={() => {
                          handleAddToPlaylist(problem.id);
                        }}
                      >
                        <Bookmark className="w-4 h-4" />
                        <span className="hidden sm:inline">
                          Save to Playlist
                        </span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                No problems found.
              </td>
            </tr>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-6 gap-2 items-center">
        <Button
          size={"sm"}
          className={
            "bg-text-secondary  rounded-xl text-white disabled:cursor-not-allowed hover:bg-brand/80"
          }
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </Button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <Button
          size={"sm"}
          className="bg-text-secondary hover:bg-brand/80 rounded-xl text-white disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>

      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />

      <AddToPlaylist
        isOpen={isAddToPlaylistModal}
        onClose={() => setIsAddToPlaylistModal(false)}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default ProblemTabel;
