/**
 * Author: Thamzid Karim
 * Date: 14/5/2025
 * This page displays the video editor interface with a timeline, preview window, and media pool.
 */

import { useState, useEffect, useRef } from "react";
import { DndContext } from "@dnd-kit/core";
import NavBar from "../components/NavBar";
import DraggableMedia from "./../components/DraggableMedia";
import Timeline from "../components/Timeline";
import { Card } from "@/components/ui/card";

function Editor() {
  // Dummy media for testing
  const testMedia = {
    id: "img-1",
    mediaType: "image",
    mediaContent: "/image.jpeg",
  };

  const testMedia2 = {
    id: "img-2",
    mediaType: "video",
    mediaContent: "/video.mp4",
  };
  // Stores dropped items per track
  const [droppedItems, setDroppedItems] = useState<{ [key: string]: any[] }>({});
  // Stores currently selected media for preview
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  // Playback state
  const [currentTime, setCurrentTime] = useState(0); // Keeps track of the current time in seconds
  const [isPlaying, setIsPlaying] = useState(false); // Indicates whether playback is active
  const intervalRef = useRef<any>(null); // Holds a reference to the playback timer interval so it can be cleared later

  // Handles dropping media into a timeline track - definition of logic assisted by ChatGPT
  function handleDragEnd(event: any) {
    const { active, over } = event; // active is the dragged item and over is the track the item was dropped onto

    // Ensure drop target is valid
    if (over && over.id.startsWith("track-")) {
      const trackId = over.id; // ID of the track the item was dropped onto
      const draggedItem = active; // The dragged item

      // Get the existing items in the track
      const existingItems = droppedItems[trackId] || [];
      const newItem = {
        ...draggedItem.data.current,
        startTime: existingItems.length * 1, // Assign start time based on number of clips in track
        duration: 1, // Fixed duration
      };

       // Add the new item to the track's existing items and update the state
      const updatedTrack = [...existingItems, newItem];
      const updatedState = { ...droppedItems, [trackId]: updatedTrack };

      setDroppedItems(updatedState);
      setSelectedMedia(newItem); // Update preview with new media
    }
  }

  // Play loop
  function handlePlay() {
    if (isPlaying) return;

    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => prev + 0.1);
    }, 100); // Advances currentTime every 100ms
  }

  // Stop loop
  // Resets the isPlaying state to false to prevent further updates
  function handleStop() {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
    setCurrentTime(0);
  }

  // useEffect hook to track changes in currentTime and droppedItems - logic assisted by ChatGPT
  useEffect(() => {
    let found = null; // Initialise a variable to store the found media item

    // Iterate through all the tracks in droppedItems
    Object.values(droppedItems).forEach((track) => {
      // Iterate through each media item in the track
      track.forEach((item) => {
        // Check if the currentTime is within the start and end time of the media item
        if (currentTime >= item.startTime && currentTime < item.startTime + item.duration) {
          found = item;
        }
      });
    });

    // If a media item is found, update the selectedMedia state to the found item, else null
    if (found) setSelectedMedia(found);
    else setSelectedMedia(null);
  }, [currentTime, droppedItems]); // Dependency array

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex">
        <div className="w-[210px]">
          <NavBar />
        </div>

        <div className="flex-col flex-1">
          <div className="flex flex-row p-4 space-x-4">
            {/* Media pool */}
            <Card className="flex-1 max-h-[600px] max-w-[200px]">
              <DraggableMedia
                id={testMedia.id}
                mediaType={testMedia.mediaType}
                mediaContent={testMedia.mediaContent}
              />
              <DraggableMedia
                id={testMedia2.id}
                mediaType={testMedia2.mediaType}
                mediaContent={testMedia2.mediaContent}
              />
            </Card>

            {/* Preview window for selected or dropped media */}
            <Card className="flex-1 h-[500px] bg-black flex items-center justify-center relative">
              {/* Renders media based on media type */}
              {selectedMedia ? (
                selectedMedia.mediaType === "image" ? (
                  <img
                    src={selectedMedia.mediaContent}
                    className="max-w-full max-h-full"
                    alt="Preview"
                  />
                ) : (
                  <video
                    src={selectedMedia.mediaContent}
                    autoPlay
                    muted
                    controls={false}
                    className="max-w-full max-h-full"
                  />
                )
              ) : (
                <p className="text-white">Drop clips in timeline and press play</p>
              )}

              {/* Playback controls */}
              <div className="absolute bottom-2 left-2 flex gap-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={handlePlay}
                >
                  Play
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={handleStop}
                >
                  Stop
                </button>
                <span className="text-white px-2">{currentTime.toFixed(1)}s</span>
              </div>
            </Card>
          </div>

          <div className="flex-1 p-4">
            {/* Timeline */}
            <div className="w-full">
              <Timeline droppedItems={droppedItems} onSelect={setSelectedMedia} />
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default Editor;