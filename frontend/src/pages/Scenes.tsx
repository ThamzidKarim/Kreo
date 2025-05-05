/*
 * Author: Thamzid Karim
 * Date: 5/5/2025
 * Scenes page that receives prompts from Story page via state and displays them.
 */

import { useLocation } from "react-router";
import NavBar from "../components/NavBar";
import PromptCard from "../components/PromptCard";

function Scenes() {
    // useLocation hook to access the location object, which contains the state passed from the Story page
    const location = useLocation();
    const { prompts } = location.state || {};

    return (
        <div className="flex flex-col h-screen">
            <NavBar />

            {/* Display the prompts received from the Story page*/}
            <div className="flex overflow-x-auto space-x-4 py-4">
                {prompts ? (
                    prompts.map((prompt: string, index: number) => (
                        <PromptCard 
                            key={index} 
                            prompt={prompt} 
                        />
                    ))
                ) : (
                    <p>No prompts to display</p>
                )}
            </div>

        </div>
    );

}

export default Scenes
