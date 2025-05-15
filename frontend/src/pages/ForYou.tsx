/**
 * Author: Thamzid Karim
 * Date: 15/5/2025
 *
 * Displays all shared media with like functionality.
 */

import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { HeartIcon } from '@heroicons/react/24/outline';

const USER_ID = 1; // Hardocded for testing purposes

// Interface to define types
interface Media {
  id: number;
  image_url: string | "";
  video_url: string | "";
  like_count: number;
  liked: boolean;
}

function ForYou() {
    // State to hold arrays of images and video
    const [images, setImages] = useState<Media[]>([]);
    const [videos, setVideos] = useState<Media[]>([]);
    
     // Fetch media for this user
    useEffect(() => {
        axios.get(`http://localhost:5000/api/foryou?user_id=${USER_ID}`).then(res => {
        setImages(res.data.images);
        setVideos(res.data.videos);
        });
    }, []);


    // Toggle likes and unlikes for a media item
    const toggleLike = async (media_type: 'image' | 'video', media_id: number) => {
        const res = await axios.post("http://localhost:5000/api/like", {
        media_type,
        media_id,
        user_id: USER_ID,
        });

        // Updates the number of likes a media item has
        const likeUpdate = (arr: Media[]) => {
        return arr.map(item => { // Loop through each media item in array
            if (item.id === media_id) { // Check if the current item's id matches the media_id to update
            const liked = res.data.liked; // Get the updated liked status from response
             // Return a new object with updated liked status and like count
            return {
                ...item,
                liked,
                like_count: item.like_count + (liked ? 1 : -1),
            };
            }
            return item;
        });
        };

        // Update like based on media type
        if (media_type === "image") setImages(likeUpdate(images));
        else setVideos(likeUpdate(videos));
    };

    return (
        <div>
        <NavBar />

        {/*Container for media*/}
        <div className="mt-16 px-4 max-w-7xl mx-auto grid grid-cols-3 gap-4">
            {/* Map over images array to render each image */}
            {images.map((img) => (
            <div key={`img-${img.id}`} className="relative">
                {/*Display image*/}
                <img
                src={img.image_url}
                alt="shared image"
                className="rounded shadow-md object-cover w-full h-48"
                />
                {/*Like button*/}
                <button
                onClick={() => toggleLike("image", img.id)}
                className={`absolute top-2 right-2 p-1 text-white rounded-full ${
                    img.liked ? "bg-red-500" : "bg-gray-500"
                }`}
                >
                {img.liked ? (
                    <HeartIcon className="w-5 h-5 inline-block" />
                ) : (
                    <HeartIcon className="w-5 h-5 inline-block" />
                )}
                <span className="ml-1">{img.like_count}</span> {/*Like count*/}
                </button>
            </div>
            ))}
            {/* Map over videos array to render each */}
            {videos.map((vid) => (
            <div key={`vid-${vid.id}`} className="relative">
                {/*Display video*/}
                <video
                src={vid.video_url}
                controls
                className="rounded shadow-md w-full max-h-48 object-contain"
                />
                {/*Like button*/}
                <button
                onClick={() => toggleLike("video", vid.id)}
                className={`absolute top-2 right-2 p-1 text-white rounded-full ${
                    vid.liked ? "bg-red-500" : "bg-gray-500"
                }`}
                >
                {vid.liked ? (
                    <HeartIcon className="w-5 h-5 inline-block" />
                ) : (
                    <HeartIcon className="w-5 h-5 inline-block" />
                )}
                <span className="ml-1">{vid.like_count}</span> {/*Like count*/}
                </button>
            </div>
            ))}
        </div>
    </div>
    );
}

export default ForYou;
