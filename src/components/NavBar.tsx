import { Link } from "react-router";

function NavBar() {
    return(
        <nav className="bg-blue-500 text-white p-4 h-full fixed top-0 left-0">
            <ul className="flex flex-col gap-6">
                <li><Link to="/library">Library</Link></li>
                <li><Link to="/story">Story</Link></li>
                <li><Link to="/scenes">Scenes</Link></li>
                <li><Link to="/editor">Editor</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar
