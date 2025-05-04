import { useState } from "react";
import NavBar from "../components/NavBar";
import PromptBar from "../components/PromptBar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


function Story() {
    const [text, setText] = useState("");


    return(
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-col items-center flex-grow pl-30 pt-30">
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
                    <Button>Generate Prompts</Button>
                </div>
                <div className="mt-auto mb-10">
                    <PromptBar />
                </div>
            </div>
        </div>
    );

}

export default Story
