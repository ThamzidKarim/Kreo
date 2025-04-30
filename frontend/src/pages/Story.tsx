import Header from "../components/Header";
import NavBar from "../components/NavBar";
import PromptBar from "../components/PromptBar";
import TextInputBox from "../components/TextInputBox";

function Story() {
    return(
        <div>
            <Header />
            <NavBar />
            
            <div className="flex flex-col items-center space-y-8 px-4 pt-10">
                <TextInputBox />
                <PromptBar />
            </div>
        </div>
    );

}

export default Story
