import { Link } from "react-router";

function Header() {
    
    return(
    <header className="bg-blue-500 text-white p-4 absolute top-0 left-0">
        <Link to="/">Kreo</Link>
    </header>
    );

}

export default Header
