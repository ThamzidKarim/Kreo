import Header from "../components/Header";
import NavBar from "../components/NavBar";
import PromptBar from "../components/PromptBar";

function Story() {
    return(
        <div>
            <Header />
            <NavBar />
            <div className="flex justify-center items-center mt-[950px] ml-[200px]">
                <PromptBar />
            </div>
        </div>
    );

}

export default Story
