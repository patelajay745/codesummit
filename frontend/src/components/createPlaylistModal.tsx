import { X } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPlaylistSchema } from "@/schemas";
import { z } from "zod";
import { Button } from "./ui/button";

interface props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
}

export type FormData = z.infer<typeof createPlaylistSchema>;

const CreatePlaylistModal: FC<props> = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(createPlaylistSchema) });

  const handleFormSubmit = async (data: FormData) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 dark:bg-black/80 bg-white/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-text-secondary rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-base-300">
          <h3 className="text-xl font-bold text-white">Create New DSA Sheet</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-4"
        >
          <div className="form-control gap-2 flex flex-col">
            <label className="label">
              <span className="label-text font-medium text-white">
                Sheet Name
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-vs-dark text-white"
              placeholder="Enter Sheet name"
              {...register("name", { required: "Sheet name is required" })}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.name.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control gap-2 flex flex-col">
            <label className="label">
              <span className="label-text font-medium text-white">
                Description
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 w-full bg-vs-dark text-white"
              placeholder="Enter Sheet description"
              {...register("description")}
            />
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
            >
              Create Sheet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
