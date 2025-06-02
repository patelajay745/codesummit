import {
  useDeletePlaylist,
  useGetAllPlaylist,
} from "@/queries/playlistQueries";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface props {
  createPlaylistfn?: () => void;
}

const PlaylistProfile: FC<props> = ({ createPlaylistfn }) => {
  const { data: playlists } = useGetAllPlaylist();
  const { mutate: deletePlaylist } = useDeletePlaylist();
  const [expandedPlaylist, setExpandedPlaylist] = useState<string | null>(null);

  const togglePlaylist = (id: string) => {
    if (expandedPlaylist === id) {
      setExpandedPlaylist(null);
    } else {
      setExpandedPlaylist(id);
    }
  };

  const handleDelete = (id: string) => {
    deletePlaylist(id);
  };

  return (
    <div className="card p-4 bg-background/50  md:p-8">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-4 md:mb-0">
            My Sheets
          </h1>
          {/* <Button className="bg-brand cursor-pointer text-white hover:bg-brand/80">
            Create Playlist
          </Button> */}
        </div>

        {playlists?.length === 0 ? (
          <div className="card bg-text-secondary/50 shadow-xl">
            <div className="card-body items-center text-center bg-vs-dark">
              <h3 className="text-xl font-medium">No Sheet found</h3>
              <p className="text-base-content/70">
                Create your first Sheet to organize problems!
              </p>
              <div className="card-actions justify-center mt-4">
                <Button
                  className="bg-brand text-white hover:bg-brand/80 cursor-pointer"
                  onClick={createPlaylistfn}
                >
                  Create DSA Sheet
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {playlists?.map((playlist) => (
              <div
                key={playlist.id}
                className="card bg-text-secondary/50 shadow-xl"
              >
                <div className=" p-4 ">
                  {/* Playlist Header */}
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => togglePlaylist(playlist.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <h3 className="text-xl font-bold">
                          {playlist.name} ({playlist.problems.length})
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 md:mt-0">
                      {expandedPlaylist === playlist.id ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base-content/80 mt-1">
                    {playlist.description}
                  </p>

                  {/* Expanded Problems List */}
                  {expandedPlaylist === playlist.id && (
                    <div className="mt-4 pt-4 border-t border-base-300">
                      <h4 className="text-lg font-semibold mb-3">
                        Problems in this playlist
                      </h4>

                      {playlist.problems.length === 0 ? (
                        <div className="alert">
                          <span>No problems added to this playlist yet.</span>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="table table-zebra w-full">
                            <thead>
                              <tr>
                                <th>Problem</th>
                                <th>Difficulty</th>
                                <th>Tags</th>
                                <th className="text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {playlist.problems.map((item) => (
                                <tr key={item.id} className="hover">
                                  <td className="font-medium">{item.title}</td>
                                  <td>
                                    {item.difficulty === "EASY" ? (
                                      <Badge className="bg-green-950 outline text-white">
                                        {item.difficulty}
                                      </Badge>
                                    ) : item.difficulty === "MEDIUM" ? (
                                      <Badge className="bg-yellow-950 outline text-white">
                                        {item.difficulty}
                                      </Badge>
                                    ) : (
                                      <Badge className="bg-red-950 outline text-white">
                                        {item.difficulty}
                                      </Badge>
                                    )}
                                    {/* {getDifficultyBadge(item.difficulty)} */}
                                  </td>
                                  <td>
                                    <div className="flex flex-wrap gap-1">
                                      {item.tags &&
                                        item.tags.map((tag) => (
                                          <>
                                            <Badge className="bg-transparent border-1 border-foreground/20 text-foreground capitalize">
                                              {tag}
                                            </Badge>
                                          </>
                                        ))}
                                    </div>
                                  </td>
                                  <td className="text-right">
                                    <Link to={`/problem/${item.id}`}>
                                      <Button className="bg-brand hover:bg-brand/80 cursor-pointer text-white">
                                        <ExternalLink size={12} />
                                        Solve
                                      </Button>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-4">
                        <Button
                          onClick={() => handleDelete(playlist.id)}
                          className="bg-text-secondary hover:bg-text-secondary/80 cursor-pointer text-white"
                        >
                          Delete Playlist
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistProfile;
