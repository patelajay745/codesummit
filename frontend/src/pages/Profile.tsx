import CreatePlaylistModal from "@/components/createPlaylistModal";
import PlaylistProfile from "@/components/PlaylistProfile";
import ProfileSubmission from "@/components/ProfileSubmission";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  createPlaylistFormData,
  useAddPlaylist,
} from "@/queries/playlistQueries";
import { useAuthStore } from "@/stores/useAuthStore";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Image, Mail, Shield, User } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const { authUser } = useAuthStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { mutate: addPlaylist } = useAddPlaylist();
  const handleCreatePlaylist = async (data: createPlaylistFormData) => {
    addPlaylist(data);
  };
  const openCreatePlaylist = () => {
    setIsCreateModalOpen(true);
  };
  return (
    <div className="mx-auto container py-5 flex flex-col gap-5  2xl:px-0 lg:px-5">
      <div className="flex flex-row justify-between items-center w-full ">
        <div className="flex items-center gap-3">
          <Link to={"/"} className="btn btn-circle btn-ghost">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold text-primary">Profile</h1>
        </div>
      </div>

      <div className="w-full  mx-auto">
        {/* Profile Card */}
        <div className="card bg-background/50 shadow-xl">
          <div className="card-body">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="avatar placeholder">
                <div className=" text-neutral-content rounded-full w-24 h-24 ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center">
                  {authUser?.image ? (
                    <img
                      src={authUser?.image || "user.png"}
                      alt={authUser.name}
                    />
                  ) : (
                    <div className="text-3xl  w-full h-full items-center justify-center flex text-muted-foreground">
                      {authUser?.name ? authUser.name.charAt(0) : "U"}
                    </div>
                  )}
                </div>
              </div>

              {/* Name and Role Badge */}
              <div className="text-center md:text-left flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{authUser?.name}</h2>
                <Badge className="bg-transparent border-1 border-foreground/20 text-foreground capitalize">
                  {authUser?.role}
                </Badge>
              </div>
            </div>

            <div className="divider"></div>

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="stat dark:bg-vs-dark bg-white/90 shadow-lg border-1 rounded-box ">
                <div className="stat-figure text-primary">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="stat-title text-foreground">Email</div>
                <div className="stat-value text-lg break-all">
                  {authUser?.email}
                </div>
              </div>

              {/* User ID */}
              <div className="stat dark:bg-vs-dark bg-white/90 shadow-lg border-1 rounded-box">
                <div className="stat-figure text-primary">
                  <User className="w-8 h-8" />
                </div>
                <div className="stat-title text-foreground">User ID</div>
                <div className="stat-value text-sm break-all">
                  {authUser?.id}
                </div>
              </div>

              {/* Role Status */}
              <div className="stat dark:bg-vs-dark bg-white/90 shadow-lg border-1 rounded-box">
                <div className="stat-figure text-primary">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="stat-title text-foreground">Role</div>
                <div className="stat-value text-lg">{authUser?.role}</div>
                <div className="stat-desc text-muted-foreground">
                  {authUser?.role === "ADMIN"
                    ? "Full system access"
                    : "Limited access"}
                </div>
              </div>

              {/* Profile Image Status */}
              <div className="stat dark:bg-vs-dark bg-white/90 shadow-lg border-1 rounded-box">
                <div className="stat-figure text-primary">
                  <Image className="w-8 h-8" />
                </div>
                <div className="stat-title text-foreground">Profile Image</div>
                <div className="stat-value text-lg">
                  {authUser?.image ? "Uploaded" : "Not Set"}
                </div>
                <div className="stat-desc text-muted-foreground">
                  {authUser?.image
                    ? "Image available"
                    : "Upload a profile picture"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card-actions justify-end mt-6">
              <Button className="bg-brand text-white hover:bg-brand/80 cursor-pointer hidden">
                Edit Profile
              </Button>
              {/* <Button className="text-white cursor-pointer bg-text-secondary ">
                Change Password
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      <ProfileSubmission />

      <PlaylistProfile createPlaylistfn={openCreatePlaylist} />

      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
};

export default Profile;
