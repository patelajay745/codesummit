import { useLeaderboard } from "@/hooks/useLeaderboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useAuthStore } from "@/stores/useAuthStore";

const rankColors = [
  "bg-yellow-400 text-yellow-900", // 1st
  "bg-gray-300 text-gray-800", // 2nd
  "bg-amber-700 text-amber-100", // 3rd
];

const getInitials = (name: string) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Leaderboard = () => {
  const leaders = useLeaderboard();
  const { authUser } = useAuthStore();

  return (
    <div className="max-w-xl mx-auto h-fit p-6 bg-background/40 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold mb-4 text-center tracking-tight">
        Leaderboard
      </h2>
      <Table className="w-full text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="text-zinc-500 dark:text-zinc-300 text-base font-semibold">
              #
            </TableHead>
            <TableHead className="text-zinc-500 dark:text-zinc-300 text-base font-semibold">
              User
            </TableHead>
            <TableHead className="text-zinc-500 dark:text-zinc-300 text-base font-semibold">
              Solved
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaders.map((u, i) => {
            const isCurrentUser = u.id === authUser?.id;
            const rowBg = isCurrentUser
              ? "bg-blue-100 dark:bg-blue-900/40"
              : i % 2 === 0
                ? "bg-zinc-50 dark:bg-zinc-800"
                : "bg-white dark:bg-zinc-900";
            return (
              <TableRow
                key={u.id}
                className={`${rowBg} ${isCurrentUser ? "font-bold" : ""} transition-all`}
              >
                <TableCell className="align-middle">
                  {i < 3 ? (
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${rankColors[i]}`}
                    >
                      {i + 1}
                    </span>
                  ) : (
                    <span className="text-zinc-500 dark:text-zinc-400 font-semibold">
                      {i + 1}
                    </span>
                  )}
                </TableCell>
                <TableCell className="flex items-center gap-3 py-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold text-base">
                    {getInitials(u.name || "User")}
                  </span>
                  <span>{isCurrentUser ? "You" : u.name}</span>
                </TableCell>
                <TableCell className="text-center font-mono text-lg">
                  {u._count.ProblemSolved}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard;
