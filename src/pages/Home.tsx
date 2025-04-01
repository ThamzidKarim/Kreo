import Card from "../components/Card.tsx";
import Header from "../components/Header.tsx";
import NavBar from "../components/NavBar.tsx";

function Home() {
    return (
        <div>
            <Header />
            <NavBar />
            <main className="mt-16">
                <section className="flex justify-center items-start">
                    <h1>Home</h1>
                </section>
                <section className="flex justify-center items-center">
                    <Card />
                </section>
            </main>
        </div>
    );
}

export default Home;
