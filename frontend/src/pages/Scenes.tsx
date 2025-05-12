/*
 * Author: Thamzid Karim
 * Date: 5/5/2025
 * Scenes page that receives prompts from Story page via state and displays them.
 */

import { useLocation } from "react-router";
import PromptCard from "../components/PromptCard";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Scenes() {
    
    // useLocation hook to access the location object, which contains the state passed from the Story page
    const location = useLocation();
    // If location.state and location.state.prompts exist, use them. Otherwise, just use an array with one empty string.
    const initialPrompts = (location.state && location.state.prompts) ? location.state.prompts : [""];
    // Set up a state variable called prompts, starting with initialPrompts
    const [prompts, setPrompts] = useState(initialPrompts);

    // Add a new empty prompt to the array
    function addNewPrompt() {
    setPrompts([...prompts, ""]);
    }


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
                    )
                    }
                        <div className="items-center justify-center">
                            <Button onClick={addNewPrompt} className="h-[500px] w-[60px] text-3xl border border-dashed border-gray-400 hover:bg-gray-100">
                                +
                            </Button>
                        </div>
                </div>
            </div>
        </div>
    );

}

export default Scenes
