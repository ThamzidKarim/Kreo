/*
 * Author: Thamzid Karim
 * Date: 5/5/2025
 * Story page with textarea input and "Generate Prompts" button that sends the input text to the backend via POST.
*/
import { useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import PromptBar from "../components/PromptBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


function Story() {
    
    const [text, setText] = useState(""); // Hook to manage textarea content
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
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-col items-center flex-grow pl-30 pt-30">
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
                    <PromptBar />
                </div>
            </div>
        </div>
    );

}

export default Story
