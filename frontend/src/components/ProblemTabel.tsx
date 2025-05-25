import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProblemType } from "@/stores/useProblemStore";
import { FC, useMemo, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";

// import { Bookmark, PencilIcon, Trash2, Trash2Icon, Plus } from "lucide-react";
// import { useAuthStore } from "@/stores/useAuthStore";
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
import { Plus } from "lucide-react";

type Props = {
  data: ProblemType[];
};

const ProblemTabel: FC<Props> = ({ data }) => {
  const [search, setSearch] = useState("");
  // const { authUser } = useAuthStore();

  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [selectedCompany, setSelectedCompany] = useState("ALL");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredProblems = useMemo(() => {
    return (data || [])
      .filter((problem) =>
        search.length === 0
          ? true
          : problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      )
      .filter((problem) =>
        selectedCompany === "ALL"
          ? true
          : problem.company?.includes(selectedCompany)
      );
  }, [data, difficulty, selectedTag, search, selectedCompany]);

  const uniqueTags = Array.from(
    new Set(data.flatMap((problem) => problem.tags))
  ).sort((a, b) => a.localeCompare(b));

  // const itemsPerPage = 5;
  // const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  // const pageinatedProblems = useMemo(() => {
  //   return filteredProblems.slice((currentPage - 1) * itemsPerPage);
  // }, [filteredProblems]);

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

  return (
    <div className="container flex flex-col h-screen mx-auto">
      <div className="flex justify-between items-center mb-6">
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
                <SelectItem value="ALL" defaultChecked={true}>
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
            className="bg-brand text-white gap-2 hover:bg-brand/80 cursor-pointer"
            onClick={() => {
              // setIsCreateModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Create Playlist
          </Button>
        </div>
      </div>

      <Table className="rounded-xl">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className="text-xl font-bold tracking-wider text-center bg-background py-4">
          <TableRow className="py-4">
            <TableHead className="w-[100px]">Solved</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="">Dificulty</TableHead>

            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-background/40">
          {(filteredProblems.length > 0 ? filteredProblems : data).map(
            (problem) => (
              <TableRow key={problem.title}>
                <TableCell className="font-medium">
                  {
                    <Checkbox
                      id="solved"
                      checked={true}
                      className="bg-amber-300"
                    />
                  }
                </TableCell>
                <TableCell>{problem.title}</TableCell>
                <TableCell>
                  <div className="flex flex-row gap-2">
                    {problem.tags.map((tag) => (
                      <Badge className="bg-brand text-white">{tag}</Badge>
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
                <TableCell className="">
                  {problem.difficulty === "EASY" ? (
                    <Badge className="bg-green-500 text-white">
                      {problem.difficulty}
                    </Badge>
                  ) : problem.difficulty === "MEDIUM" ? (
                    <Badge className="bg-yellow-500 text-white">
                      {problem.difficulty}
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500 text-white">
                      {problem.difficulty}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
};

export default ProblemTabel;
