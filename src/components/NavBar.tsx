import { Link, useLocation } from "react-router";

const NavLinks = [
  { name: "Home", path: "/home" },
  { name: "Library", path: "/library" },
  { name: "Story", path: "/story" },
  { name: "Scenes", path: "/scenes" },
  { name: "Editor", path: "/editor" },
  { name: "For You", path: "/for-you" },
];

function NavBar() {
  const location = useLocation(); // Get current path

  return (
    <nav className="bg-[#F8F5F5] text-[#000000] p-4 h-full fixed top-0 left-0 w-[210px]">
      {/* Logo Section */}
      <div className="flex items-center mb-8">
        <div className="flex flex-col gap-[12.5px] ml-2">
          <div className="w-[60px] h-[1px] bg-black"></div>
          <div className="w-[60px] h-[1px] bg-black"></div>
          <div className="w-[60px] h-[1px] bg-black"></div>
        </div>
        <div className="ml-4 text-4xl font-inter">KREO</div>
      </div>

      {/* Nav Links */}
      <div className="flex flex-col gap-2">
        {NavLinks.map(({ name, path }) => {
          const isActive = location.pathname === path;

          return (
            <Link key={name} to={path}>
              <div
                className={`h-[40px] rounded-lg flex items-center justify-center text-base font-inter transition-colors ${
                  isActive ? "bg-[#E6E6E6]" : "bg-[#F8F5F5] hover:bg-[#E6E6E6]"}`
                }
              >
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
