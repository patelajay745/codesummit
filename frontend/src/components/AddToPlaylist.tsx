import {
  useAddProblemToPlaylist,
  useGetAllPlaylist,
} from "@/queries/playlistQueries";
import { Loader, Plus, X } from "lucide-react";
import { FC, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

interface props {
  isOpen: boolean;
  onClose: () => void;
  problemId: string;
}

const AddToPlaylist: FC<props> = ({ isOpen, onClose, problemId }) => {
  const { data: playlists, isFetching } = useGetAllPlaylist();
  const { mutate: addProblemToPlaylist, isPending } = useAddProblemToPlaylist();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const handleSubmit = async () => {
    if (!selectedPlaylist) return;
    addProblemToPlaylist({ playlistId: selectedPlaylist, problemId });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 dark:bg-black/80 bg-white/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-text-secondary rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-base-300">
          <h3 className="text-xl font-bold">Add to DSA Sheet</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="form-control gap-2 flex flex-col">
            <label className="label">
              <span className="label-text font-medium">Select Sheet</span>
            </label>

            <Select
              onValueChange={(value: string) => setSelectedPlaylist(value)}
              disabled={isFetching}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Sheet" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {playlists!.map((playlist) => (
                    <SelectItem key={playlist.id} value={playlist.id}>
                      {playlist.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              onClick={onClose}
              className="bg-black/80 text-white cursor-pointer hover:bg-black/60"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-brand hover:bg-brand/80 cursor-pointer text-white"
              disabled={!selectedPlaylist || isPending}
            >
              {isPending ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add to Sheet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToPlaylist;
