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
        <div className="flex items-center justify-center h-screen">

            {/* Display the prompts received from the Story page*/}
            <div className="flex overflow-x-auto space-x-4 py-4">
                {prompts && prompts.length > 0 ? (
                    prompts.map((prompt: string, index: number) => (
                        <PromptCard 
                            key={index} 
                            prompt={prompt} 
                        />
                    ))
                ) : (
                    <PromptCard 
                            key="empty"
                            prompt="Add prompts to generate images or upload media"
                    />
                )}
            </div>

        </div>
    );

}

export default Scenes
