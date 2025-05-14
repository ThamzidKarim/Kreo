import { Bars3Icon, HomeIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router";

const NavLinks = [
  { name: "Home", path: "/home", icon: <HomeIcon className="size-7" />},
  { name: "Library", path: "/library", icon: <HomeIcon className="size-7" />},
  { name: "Story", path: "/story", icon: <HomeIcon className="size-7" />},
  { name: "Scenes", path: "/scenes", icon: <HomeIcon className="size-7" />},
  { name: "Editor", path: "/editor", icon: <HomeIcon className="size-7" />},
  { name: "Canvas", path: "/canvas", icon: <HomeIcon className="size-7" />},
  { name: "For You", path: "/for-you", icon: <HomeIcon className="size-7" />},
];

function NavBar() {
  const location = useLocation(); // Get current path

  return (
    <nav className="bg-[#F8F5F5] text-[#000000] p-4 h-full fixed top-0 left-0 w-[210px]">
      {/* Logo Section */}
      <div className="flex items-center mb-8">
        <div className="flex items-center justify-center rounded-full bg-[#F8F5F5] hover:bg-[#adadad] cursor-pointer relative w-[40px] h-[40px]">
          <Bars3Icon className="size-8" /> 
        </div>
        <div className="ml-6 text-4xl font-inter">KREO</div>
      </div>

      {/* Nav Links */}
      <div className="flex flex-col gap-2">
        {NavLinks.map(({ name, path, icon }) => {
          const isActive = location.pathname === path;

          return (
            <Link key={name} to={path}>
              <div
                className={`h-[40px] rounded-lg flex items-center justify-start gap-3 px-3 text-base font-inter transition-colors ${
                  isActive ? "bg-[#E6E6E6]" : "bg-[#F8F5F5] hover:bg-[#E6E6E6]"}`
                }
              >
                {icon}
                {name}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default NavBar;
