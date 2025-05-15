/**
 * Author: Thamzid Karim
 * Date: 15/5/2025
 * 
 * Displays a scrollable grid of media items
 */
import { useEffect, useState } from "react";
import axios from "axios";
import DraggableMedia from "./DraggableMedia";

// Interfaces for images
interface Image {
  id: number;
  image_url: string;
  prompt: string | null;
}

// Interfaces for videos
interface Video {
  id: number;
  video_url: string;
}

function MediaPool() {
  // States to hold arrays of images and videos fetched from backend
  const [images, setImages] = useState<Image[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  // Fetch media data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/library")
      .then((res) => {
         // Save fetched images and videos or empty arrays if missing
        setImages(res.data.images || []);
        setVideos(res.data.videos || []);
      })
      .catch(() => {
        // On error, reset state to empty arrays
        setImages([]);
        setVideos([]);
      });
  }, []);

  return (
    <>
      {/* If no media found, show message */}
      {images.length === 0 && videos.length === 0 ? (
        <div className="mt-16 px-4 max-w-7xl mx-auto text-center">No media found.</div>
      ) : (
        /* Otherwise, show the media grid with images and videos */
        <div className="mt-16 px-4 max-w-7xl mx-auto grid grid-cols-3 gap-4">
          {/* Map over images array and render each image */}
          {images.map((img) => (
            <DraggableMedia
              key={`img-${img.id}`}
              id={`img-${img.id}`}
              data={{
                id: `img-${img.id}`,
                mediaType: "image",
                mediaContent: img.image_url,
              }}
            >
              <img
                src={img.image_url}
                alt={img.prompt || "Generated image"}
                className="rounded shadow-md object-cover w-[60px] h-[60px]"
              />
            </DraggableMedia>
          ))}
          {/* Map over videos array and render each video */}
          {videos.map((vid) => (
            <DraggableMedia
              key={`vid-${vid.id}`}
              id={`vid-${vid.id}`}
              data={{
                id: `vid-${vid.id}`,
                mediaType: "video",
                mediaContent: vid.video_url,
              }}
            >
              <video
                src={vid.video_url}
                controls
                className="rounded shadow-md w-[60px] h-[60px] object-contain"
              />
            </DraggableMedia>
          ))}
        </div>
      )}
    </>
  );
}

export default MediaPool;
