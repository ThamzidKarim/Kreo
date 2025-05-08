/*
 * Author: Thamzid Karim
 * Date: 5/5/2025
 * PromptCard component that displays a prompt in a card format.
*/

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const PromptCard = ({ prompt }: {prompt: string}) => {

    const [text, setText] = useState(prompt || ""); // Hook to manage textarea content
    return (
        <div className="rounded-2xl shadow-md overflow-hidden bg-black hover:shadow-lg cursor-pointer p-4 w-[500px] h-[500px] flex flex-col justify-center items-center">
            <Textarea 
                placeholder="Add prompts to generate images or upload media"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-100 max-h-100 resize-none text-white border-none"
            />
         </div>
  );
};

export default PromptCard;