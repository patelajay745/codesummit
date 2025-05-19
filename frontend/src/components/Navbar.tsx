import { Link } from "@tanstack/react-router";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";

const Navbar = () => {
  return (
    <div className="w-full flex items-center flex-col !bg-none sm:px-0 px-5">
      <div className="container pt-6 flex items-center justify-between tracking-wider font-['Inter']">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="flex flex-rowflex flex-wrap items-center justify-between gap-4 sm:text-2xl">
          <Link
            to="/"
            activeProps={{ className: "text-myblue font-semibold" }}
            inactiveProps={{ className: "text-gray-500" }}
          >
            <div>Home</div>
          </Link>
          <Link
            to="/singin"
            activeProps={{ className: "text-myblue font-semibold" }}
            inactiveProps={{ className: "text-gray-500" }}
          >
            <div>Login</div>
          </Link>
          <ModeToggle />
        </nav>
      </div>
      <div className="container border-b-2  border-myblue/40  mt-2 "></div>
    </div>
  );
};

export default Navbar;
