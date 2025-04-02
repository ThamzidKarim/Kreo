import Header from "../components/Header";
import NavBar from "../components/NavBar";

function Editor() {
    return(
        <div>
            <Header />
            <NavBar />
            <div className="flex justify-center items-start h-screen mt-16">
                <h1>Editor</h1>
            </div>
        </div>
    );
} 
export default Editor