function NavBar() {
    
    return(
        <nav className="bg-blue-500 text-white p-4 w-full fixed top-0 left-0">
            <ul className="flex gap-6">
                <li><a href="">Library</a></li>
                <li><a href="">Story</a></li>
                <li><a href="">Scenes</a></li>
                <li><a href="">Editor</a></li>
            </ul>
        </nav>
    );

}

export default NavBar
