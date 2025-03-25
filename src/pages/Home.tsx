import Card from "../components/Card.tsx";
import Header from "../components/Header.tsx";
import NavBar from "../components/NavBar.tsx";

function Home() {
    return(
        <div>
            <Header />
            <NavBar />
            <h1>Home</h1>
            <div className="flex justify-center items-center h-screen">
                <Card />
            </div>
        </div>
    );
}

export default Home;
