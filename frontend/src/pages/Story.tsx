/*
 * Author: Thamzid Karim
 * Date: 12/5/2025
 * Story page with textarea input and "Generate Prompts" button that sends the input text to the backend via POST.
*/
import { useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import PromptBar from "../components/PromptBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

function Story() {
    
    const [text, setText] = useState(""); // Hook to manage textarea content
    const [messages, setMessages] = useState<{ userPrompt: string; aiResponse: string }[]>([]);
    const navigate = useNavigate(); // Hook to navigate between pages

    // Function to handle the "Generate Prompts" button click
    const handleGeneratePrompts = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/generate-prompts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });
            if (!res.ok) {
                throw new Error("Failed to generate prompts");
            }
            const data = await res.json();
            console.log(data.prompts); 
            navigate("/scenes", { state: { prompts: data.prompts } }); // Navigate to the scenes page and send the prompts as state
            console.log("Received prompts:", data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return(
        <div className="flex h-screen">

            <div className="w-[210px]">
                <NavBar />
            </div>

            <div className="flex-1 flex flex-col items-center pl-30 pt-30">
                
                {/* Textarea for user text input and button to generate prompts */}
                <div className="grid w-md gap-4">
                    <Textarea 
                        placeholder="Type your text here. Max length is 10,000..."
                        maxLength={10000}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-100 max-h-100 resize-none"
                    />
                    <p className="text-sm text-muted-foreground text-right">
                        {text.length.toLocaleString()} / 10,000 characters
                    </p>
                    <Button onClick={handleGeneratePrompts}>Generate Prompts</Button>
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

export default Story
