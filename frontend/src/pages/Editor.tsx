/**
 * Author: Thamzid Karim
 * Date: 13/5/2025
 * This page displays the video editor interface with a timeline, preview window, and media pool.
 */

import { useState } from "react";
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

  // Handles dropping media into a timeline track - definition of logic assisted by ChatGPT
  function handleDragEnd(event: any) {
    const { active, over } = event; // active is the dragged item and over is the track the item was dropped onto
  
    // Ensure drop target is valid
    if (over && over.id.startsWith("track-")) {
      const trackId = over.id; // ID of the track the item was dropped onto
      const draggedItem = active; // The dragged item
      
      // Get the existing items in the track
      const existingItems = droppedItems[trackId] || [];
      const newItem = { ...draggedItem.data.current };
      
      // Add the new item to the track's existing items and update the state
      const updatedTrack = [...existingItems, newItem];
      const updatedState = { ...droppedItems, [trackId]: updatedTrack };
  
      setDroppedItems(updatedState);

      setSelectedMedia(newItem); // Update preview with new media
    }
  }
  
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
            <Card className="flex-1 h-[500px] bg-black flex items-center justify-center">

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
                    controls
                    className="max-w-full max-h-full"
                  />
                )
              ) : (
                <p className="text-white">Drop or click a clip to preview</p>
              )}
            </Card>
          </div>

          <div className="flex-1 p-4">
              {/* Timeline */}
              <div className="w-full">
                <Timeline droppedItems={droppedItems} onSelect={(item) => setSelectedMedia(item)}/>
              </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default Editor;
