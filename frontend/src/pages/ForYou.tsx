import Header from "../components/Header";
import NavBar from "../components/NavBar";

function ForYou() {
    return(
        <div>
            <Header />
            <NavBar />
            <div className="flex justify-center items-start h-screen mt-16">
                <h1>For You</h1>
            </div>
        </div>
    );
} 
export default ForYou