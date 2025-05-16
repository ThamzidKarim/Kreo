// Author: Thamzid Karim
// Date: 12/5/2025
// Prompt bar component that allows user input to return AI generated responses

import { useState } from "react";

function PromptBar({ onSend }: {onSend: (userPrompt: string, aiResponse: string) => void }) {
    // State to manage the prompt input
    const [prompt, setPrompt] = useState("");
    
    // Function to handle fetching responses when button clicked
    const handleClickButton = async () => {
        // Handles empty input
        if (!prompt.trim()) return;

        // Fetches repsonse from generate-responses endpoint
        try {
            const res = await fetch("http://localhost:5000/api/generate-responses", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ text: prompt }),
            });
            if (!res.ok) {
                throw new Error("Failed to generate responses");
            }
            const data = await res.json();
            console.log(data);
            onSend(prompt, data.prompts);
            setPrompt(""); // Clear input to regenerate new responses
        } catch (error) {
            console.error("Failed to generate:", error);
        }
    };

    return (
        // Prompt bar component with input field and button
        <div className="h-[121px] w-[1000px] bg-[#FFFFFF] rounded-[30px] outline-1 outline-gray-300 cursor-text shadow-lg input">
            <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-transparent text-lg px-10 py-6 outline-none" 
                placeholder="Chat with me to brainstorm ideas, enhance your scripts, or enhance your prompts..." 
            />
            <div className="flex justify-end mt-[-50px] mr-10">
                <button 
                    onClick={handleClickButton} 
                    className="bg-[#F2F2F2] text-[#000000] rounded-[20px] px-4 py-2 font-semibold hover:bg-[#adadad] cursor-pointer"
                >
                    Generate
                </button>
            </div>
        </div>
    );
}

export default PromptBar;
