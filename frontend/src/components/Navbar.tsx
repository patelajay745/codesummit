import { Link } from "@tanstack/react-router";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";
import { useState } from "react";
import { Menu, User, X } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

import { useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [openDropDown, setOpenDropDown] = useState(false);

  const { openUserProfile } = useClerk();
  const { authUser } = useAuthStore();
  const { user } = useUser();
  const { signOut } = useClerk();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const activeLinkProps = {
    className: "text-brand font-semibold",
  };

  const inactiveLinkProps = {
    className: "text-gray-500",
  };

  const MenuItems = [
    {
      name: "Home",
      link: "/",
    },
    ...(user
      ? [
          {
            name: "Dashboard",
            link: "/dashboard",
          },
        ]
      : [
          {
            name: "Login",
            link: "/signin",
          },
        ]),
  ];

  return (
    <>
      <div className="sticky top-0 z-50 w-full flex items-center flex-col !bg-none px-5 backdrop-blur 2xl:px-0">
        <div className="container pt-6 flex items-center justify-between tracking-wider font-['Inter']">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex flex-rowflex flex-wrap items-center justify-between gap-4 sm:text-2xl">
              {MenuItems.map((menu) => (
                <Link
                  key={menu.name}
                  to={menu.link}
                  activeProps={activeLinkProps}
                  inactiveProps={inactiveLinkProps}
                >
                  <div>{menu.name}</div>
                </Link>
              ))}

              {/* <SignedIn>
                <UserButton
                  appearance={{
                    baseTheme: theme === "dark" ? dark : undefined,
                    variables: {
                      colorPrimary:
                        theme === "dark"
                          ? "rgba(34, 130, 204, 1)"
                          : "rgba(34, 130, 204, 1)",
                      colorBackground:
                        theme === "dark" ? "rgba(76, 70, 70)" : "#ffffff",
                      colorText: theme === "dark" ? "#ffffff" : "#0f172a",
                    },
                    elements: {
                      card: "shadow-xl rounded-2xl",
                      formButtonPrimary: "bg-violet-600 hover:bg-violet-700",
                      headerTitle: "text-2xl font-bold text-red-500",
                    },
                  }}
                />
              </SignedIn> */}

              {user && (
                <DropdownMenu
                  open={openDropDown}
                  onOpenChange={setOpenDropDown}
                >
                  <DropdownMenuTrigger>
                    <img
                      className="h-10 rounded-full"
                      src={authUser?.image || "user.png"}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-20">
                    <DropdownMenuHeader
                      title={user?.firstName || "" + user?.lastName}
                      description={user?.emailAddresses[0].emailAddress || ""}
                      icon={<User />}
                    />
                    <Link to="/profile">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    {authUser?.role === "ADMIN" && (
                      <Link to="/addproblem">
                        <DropdownMenuItem>Add Problem</DropdownMenuItem>
                      </Link>
                    )}

                    <Link to="/sheet">
                      <DropdownMenuItem>My Sheet</DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem onClick={() => openUserProfile()}>
                      Manage Account
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => signOut()}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* {authUser && (
                <Link to="/logout" inactiveProps={inactiveLinkProps}>
                  Logout
                </Link>
              )} */}
            </nav>
            <div className="flex items-center">
              <ModeToggle />
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="container border-b-2  border-myblue/40  mt-2 "></div> */}
        <div
          className="container border-b-2 border-myblue/40 mt-2 
                bg-gradient-to-r from-myblue/10 to-myblue/5 
                shadow-[0_0_20px_4px_rgba(0,123,255,0.5)] 
                animate-pulse rounded-full "
        ></div>
      </div>

      {isOpen && (
        <div className="md:hidden mx-5 mt-1">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 dark:bg-gray-800 bg-mygray/20">
            {MenuItems.map((menu) => (
              <Link
                key={menu.name}
                to={menu.link}
                activeProps={activeLinkProps}
                inactiveProps={inactiveLinkProps}
              >
                <div className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                  {menu.name}
                </div>
              </Link>
            ))}

            {authUser && (
              <Link to="/logout">
                <div className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                  Logout
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
