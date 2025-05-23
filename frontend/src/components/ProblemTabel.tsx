import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProblemType } from "@/stores/useProblemStore";
import { FC } from "react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";

type Props = {
  data: ProblemType[];
};

const ProblemTabel: FC<Props> = ({ data }) => {
  return (
    <Table className="rounded-xl">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader className="text-xl font-bold tracking-wider text-center bg-background py-4">
        <TableRow className="py-4">
          <TableHead className="w-[100px]">Solved</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead className="">Dificulty</TableHead>
          <TableHead className="">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-background/40">
        {data.map((problem) => (
          <TableRow key={problem.title}>
            <TableCell className="font-medium">
              {<Checkbox id="solved" checked={true} className="bg-amber-300" />}
            </TableCell>
            <TableCell>{problem.title}</TableCell>
            <TableCell>
              <div className="flex flex-row gap-2">
                {problem.tags.map((tag) => (
                  <Badge className="bg-brand text-white">{tag}</Badge>
                ))}
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
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};

export default ProblemTabel;
