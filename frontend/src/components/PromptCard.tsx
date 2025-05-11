/*
 * Author: Thamzid Karim
 * Date: 5/5/2025
 * PromptCard component that displays a prompt in a card format.
*/

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";
import { ArrowsRightLeftIcon, PencilIcon, PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const PromptCard = ({ prompt }: {prompt: string}) => {

    const [text, setText] = useState(prompt || ""); // Hook to manage textarea content
    const [imageUrl, setImageUrl] = useState<string | null>(null); // state for storing the generated image URL


    const handleClickButton = async () => {
        // Handles empty input
        if (!text.trim()) return;
        try {
            const res = await axios.post("http://localhost:5000/api/generate-images", {
                text,
            });
            console.log(res.data)
            setImageUrl(res.data.imageUrl);
            console.log("Generated Image URL:", res.data.imageUrl);
        } catch (error) {
            console.error("Failed to generate:", error);
        }
    }

    return (

        // Display the prompt text in a card
        <div className="rounded-2xl shadow-md overflow-visible bg-[#F8F5F5] hover:shadow-lg cursor-pointer p-4 w-[500px] h-[500px] flex flex-col justify-center items-center relative">
            
            {/* Buttons container */}
            <div className="absolute top-4 right-4 flex space-x-2">

                {/* Button to generate images with tooltip */}
                <TooltipProvider >
                    <Tooltip>
                        <TooltipTrigger>
                            <Button 
                            onClick={handleClickButton}
                            className="flex items-center justify-center rounded-full bg-[#F8F5F5] hover:bg-[#adadad] cursor-pointer w-[40px] h-[40px]"
                            >
                                <PhotoIcon className="stroke-black size-8" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Generate Image</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Button to generate videos with tooltip */}
                <TooltipProvider >
                    <Tooltip>
                        <TooltipTrigger>
                            <Button className="flex items-center justify-center rounded-full bg-[#F8F5F5] hover:bg-[#adadad] cursor-pointer w-[40px] h-[40px]"
                            >
                                <VideoCameraIcon className="stroke-black size-8" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Generate Video</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Button to write text with tooltip */}
                <TooltipProvider >
                    <Tooltip>
                        <TooltipTrigger>
                            <Button className="flex items-center justify-center rounded-full bg-[#F8F5F5] hover:bg-[#adadad] cursor-pointer w-[40px] h-[40px]"
                            >
                                <PencilIcon className="stroke-black size-7" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Write</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Button to switch modes */}
                <TooltipProvider >
                    <Tooltip>
                        <TooltipTrigger>
                            <Button className="flex items-center justify-center rounded-full bg-[#F8F5F5] hover:bg-[#adadad] cursor-pointer w-[40px] h-[40px]"
                            >
                                <ArrowsRightLeftIcon className="stroke-black size-7" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Switch</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* Display the prompt text */}
            <Textarea 
                placeholder="Add prompts to generate images or upload media"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-12 h-full w-full text-center py-[200px] resize-none text-black border-none"
            />

            {imageUrl ? (
                <div className="absolute flex justify-center items-center">
                <img
                    src={imageUrl}
                    alt="Generated"
                    className="max-w-full max-h-full object-cover rounded-lg shadow-md"
                />
            </div>
            ):
                null
            }
         </div>
  );
};

export default PromptCard;