import { useNavigate } from "react-router";
import Header from "../components/Header.tsx";
import NavBar from "../components/NavBar.tsx";

function Home() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/new-project");
    };

    return (
        <div>
            <Header />
            <NavBar />
            <main className="mt-16">
                <section className="flex justify-center items-start">
                    <h1>Home</h1>
                </section>
                <section className="flex justify-center items-center">
                    <button
                        onClick={handleButtonClick}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                    New Project
                    </button>
                </section>
            </main>
        </div>
    );
}

export default Home;
