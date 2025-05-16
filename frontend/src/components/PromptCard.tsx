/*
 * Author: Thamzid Karim
 * Date: 14/5/2025
 * PromptCard component that displays a prompt, generated images, and videos, in a card format.
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

// PromptCard component that handles the user input for prompts and displays generated images/videos.
const PromptCard = ({ prompt }: { prompt: string; setPrompt: (text: string) => void }) => {
    // State variables for managing prompt text, image URL, video URL, and image ID
    const [text, setText] = useState(prompt || ""); // Hook to manage textarea content
    const [imageUrl, setImageUrl] = useState<string | null>(null); // state for storing the generated image URL
    const [videoUrl, setVideoUrl] = useState<string | null>(null); // state for storing the generated video URL
    const [imageId, setImageId] = useState<string | null>(null); // state for storing the generated video URL

    // Handles image generation
    const handleGenerateImage = async () => {
        // Handles empty input
        if (!text.trim()) return;

        // Clears videos
        setVideoUrl(null);

        try {
            // Make a POST request to generate an image based on the prompt text
            const res = await axios.post("http://localhost:5000/api/generate-images", {
                text,
            });
            console.log(res.data)
            setImageId(res.data.imageId);
            setImageUrl(res.data.imageUrl);
            console.log("Generated Image URL:", res.data.imageUrl);
        } catch (error) {
            console.error("Failed to generate:", error);
        }
    }

    // Handles video generation
    const handleGenerateVideo = async () => {
        // Handles empty input
        if (!imageId) return;

        setVideoUrl(null);
        
        try {
            // Make a POST request to generate a video based on the image ID
            const res = await axios.post("http://localhost:5000/api/generate-videos", {
                imageId,
            });
            console.log(res.data)
            setVideoUrl(res.data.videoUrl);
            console.log("Generated Video URL:", res.data.videoUrl);
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
                            onClick={handleGenerateImage}
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
                            <Button onClick={handleGenerateVideo}
                            className="flex items-center justify-center rounded-full bg-[#F8F5F5] hover:bg-[#adadad] cursor-pointer w-[40px] h-[40px]"
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

            {/* If an image URL is available, display the generated image */}
            {imageUrl ? (
                <div className="absolute flex justify-center items-center">
                <img
                    src={imageUrl}
                    alt="Generated"
                    className="mt-[20px] w-[400px] h-[400px] object-cover rounded-lg shadow-md"
                />
            </div>
            ):
                null
            }

            {/* If a video URL is available, display the generated video */}
            {videoUrl ? (
                <div className="absolute flex justify-center items-center">
                <video controls className="max-w-full max-h-full object-cover rounded-lg shadow-md">
                    <source src={videoUrl} type="video/mp4" />
                </video>
            </div>
            ):
                null
            }
         </div>
  );
};

export default PromptCard;