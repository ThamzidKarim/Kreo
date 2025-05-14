/*
 * Author: Thamzid Karim
 * Date: 14/5/2025
 * Canvas page where the user can generate consistent assets. 
 */

import { useState } from "react";
import NavBar from "../components/NavBar";
import PromptBar from "../components/PromptBar";
import { Card } from "@/components/ui/card";
import PromptCard from "@/components/PromptCard";

// Canvas component that displays a single editable prompt card, a chat sidebar, and a prompt input bar.
function Canvas() {

    const [prompt, setPrompt] = useState(""); 
    const [messages, setMessages] = useState<{ userPrompt: string; aiResponse: string }[]>([]);

    return(
        <div className="flex h-screen">

            <div className="w-[210px]">
                <NavBar />
            </div>

            <div className="flex-1 flex flex-col items-center pl-30 pt-30">

                {/* PromptCard */}
                <div>
                    <PromptCard prompt={prompt} setPrompt={setPrompt} />
                </div>
                
                {/* Prompt bar at the bottom */}
                <div className="mt-auto mb-10">
                    <PromptBar 
                        onSend={(userPrompt: string, aiResponse: string) =>
                            setMessages([...messages, { userPrompt, aiResponse }])
                        }
                    />
                </div>
            </div>

            {/* Chat Sidebar on right */}
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

export default Canvas;