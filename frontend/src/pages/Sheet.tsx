import CreatePlaylistModal from "@/components/createPlaylistModal";
import PlaylistProfile from "@/components/PlaylistProfile";
import {
  createPlaylistFormData,
  useAddPlaylist,
} from "@/queries/playlistQueries";
import { useState } from "react";

const Sheet = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { mutate: addPlaylist } = useAddPlaylist();
  const handleCreatePlaylist = async (data: createPlaylistFormData) => {
    addPlaylist(data);
  };
  const [] = useState(false);

  const openCreatePlaylist = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <div className="mx-auto container my-5">
      <PlaylistProfile createPlaylistfn={openCreatePlaylist} />
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
};

export default Sheet;
