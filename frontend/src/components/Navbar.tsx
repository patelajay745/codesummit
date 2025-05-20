import { Link } from "@tanstack/react-router";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const activeLinkProps = {
    className: "text-myblue font-semibold",
  };

  const inactiveLinkProps = {
    className: "text-gray-500",
  };

  const MenuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Login",
      link: "/singin",
    },
    {
      name: "SignUp",
      link: "/signup",
    },
  ];

  return (
    <>
      <div className="w-full flex items-center flex-col !bg-none sm:px-0 px-5">
        <div className="container pt-6 flex items-center justify-between tracking-wider font-['Inter']">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center">
            <nav className="hidden md:flex flex-rowflex flex-wrap items-center justify-between gap-4 sm:text-2xl">
              {MenuItems.map((menu) => (
                <Link
                  to={menu.link}
                  activeProps={activeLinkProps}
                  inactiveProps={inactiveLinkProps}
                >
                  <div>{menu.name}</div>
                </Link>
              ))}
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
                to={menu.link}
                activeProps={activeLinkProps}
                inactiveProps={inactiveLinkProps}
              >
                <div className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                  {menu.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
