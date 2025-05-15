/*
 * Author: Thamzid Karim
 * Date: 14/5/2025
 * Scenes page that receives prompts from Story page via state and displays them.
 */

import { useLocation } from "react-router";
import PromptCard from "../components/PromptCard";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PromptBar from "@/components/PromptBar";
import { Card } from "@/components/ui/card";

// Scenes component that renders multiple prompt cards.
function Scenes() {
    
    // useLocation hook to access the location object, which contains the state passed from the Story page
    const location = useLocation();
    // If location.state and location.state.prompts exist, use them. Otherwise, just use an array with one empty string.
    const initialPrompts = (location.state && location.state.prompts) ? location.state.prompts : [""];
    // Set up a state variable called prompts, starting with initialPrompts
    const [prompts, setPrompts] = useState(initialPrompts);
    const [messages, setMessages] = useState<{ userPrompt: string; aiResponse: string }[]>([]);

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
            <div className="flex flex-1 flex-col items-start justify-between overflow-x-auto p-20">
                <div className="flex space-x-4">
                    {prompts && prompts.length > 0 ? (
                        prompts.map((prompt: string, index: number) => (
                            <PromptCard 
                                key={index} 
                                prompt={prompt} 
                                setPrompt={(newPrompt: string) => {
                                const updatedPrompts = [...prompts];
                                updatedPrompts[index] = newPrompt; // Update the specific prompt
                                setPrompts(updatedPrompts); // Update the state with the new prompts array
                            }}
                            />
                        ))
                    ) : (
                        <PromptCard 
                            key="empty"
                            prompt=""
                            setPrompt={() => {}}
                        />                     
                    )
                    }
                        <div className="items-center justify-center">
                            <Button onClick={addNewPrompt} className="h-[500px] w-[60px] text-3xl border border-dashed border-gray-400 hover:bg-gray-100">
                                +
                            </Button>
                        </div>
                </div>

                {/* Prompt bar at the bottom */}
                <div className="ml-30">
                    <PromptBar 
                        onSend={(userPrompt: string, aiResponse: string) =>
                            setMessages([...messages, { userPrompt, aiResponse }])
                        }
                    />
                </div>
            </div>
            
            {/* Chat Sidebar on Right */}
            <Card className="w-[400px] my-3 mx-3 bg-gray-100 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Kreo Chat</h2>
                {messages.map((msg, i) => (
                    <div key={i} className="mb-4">
                        <p className="font-semibold text-right">You: {msg.userPrompt}</p>
                        <p className="text-left text-gray-800">AI: {msg.aiResponse}</p>
                    </div>
                ))}
            </Card>
            
        </div>
    );

}

export default Scenes
