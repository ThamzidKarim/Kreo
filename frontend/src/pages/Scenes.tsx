/*
 * Author: Thamzid Karim
 * Date: 5/5/2025
 * Scenes page that receives prompts from Story page via state and displays them.
 */

import { useLocation } from "react-router";
import PromptCard from "../components/PromptCard";
import NavBar from "@/components/NavBar";

function Scenes() {
    // useLocation hook to access the location object, which contains the state passed from the Story page
    const location = useLocation();
    const { prompts } = location.state || {};

    return (

        <div className="flex h-screen">
            <div className="w-[210px]">
                <NavBar />
            </div>
            
            {/* Display the prompts received from the Story page*/}
            <div className="flex-1 flex items-center justify-start overflow-x-auto p-4">
                <div className="flex space-x-4">
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
                            prompt=""
                        />
                    )}
                </div>
            </div>
        </div>
    );

}

export default Scenes
