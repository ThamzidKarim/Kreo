import Timeline from "../components/Timeline";
import NavBar from "../components/NavBar";

function Editor() {
    return(
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-col flex-grow items-center justify-start px-4">
                <h1>Editor</h1>

                <div className="mt-auto w-full max-w-5xl">
                    <Timeline />
                </div>
                
            </div>
        </div>
    );
} 
export default Editor