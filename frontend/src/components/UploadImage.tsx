/*
 * Author: Thamzid Karim
 * Date: 14/5/2025
 * A component to allow the user to upload up to 4 images using a button.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const ImageUpload = ({ onImagesChange }: { onImagesChange: (images: File[]) => void }) => {
    const [images, setImages] = useState<File[]>([]); // State to hold the uploaded images

    // Handle image upload (only allow up to 4 images)
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            const fileArray = Array.from(files); // Convert to array

            // Only allow adding up to 4 images
            if (images.length + fileArray.length <= 4) {
                const newImages = [...images, ...fileArray];
                setImages(newImages);
                onImagesChange(newImages); // Pass the images to the parent
            } else {
                alert("You can only upload up to 4 images.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center">
        <TooltipProvider >
            <Tooltip>
                <TooltipTrigger>
                    {/* Plus Button to trigger file upload */}
                        <div className="items-center justify-center">
                            <Button 
                                onClick={()=> document.getElementById("image-input")?.click()}
                                className="h-[50px] w-[60px] hover:bg-gray-400 cursor-pointer">
                                +
                            </Button>
                        </div>

                        {/* Invisible file input triggered by the button */}
                            <input
                                type="file"
                                id="image-input"
                                onChange={handleUpload}
                                multiple
                                className="hidden"
                            />

                            {/* Display uploaded image names */}
                            <div className="mt-2 flex flex-wrap gap-4">
                                {images.length > 0 && (
                                    images.map((img, index) => (
                                        <div key={index} className="w-16 h-16">
                                            <img
                                                src={URL.createObjectURL(img)}
                                                className="object-cover w-full h-full rounded"
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Upload File</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
    );
};

export default ImageUpload;
