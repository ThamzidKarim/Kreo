/**
 * Author: Thamzid Karim
 * Date: 11/5/2025
 * This page displays the video editor interface with a timeline and media pool.
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

  // Stores dropped items per track
  const [droppedItems, setDroppedItems] = useState<{ [key: string]: any[] }>({});

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
    }
  }
  

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen">
        <div className="w-[210px]">
          <NavBar />
        </div>

        <div className="flex-1 flex flex-col items-start p-4 space-y-4">
          {/* Media pool */}
          <Card className="flex-1 max-h-[600px] p-2 flex space-x-4 max-w-[200px]">
            <DraggableMedia
              id={testMedia.id}
              mediaType={testMedia.mediaType}
              mediaContent={testMedia.mediaContent}
            />
          </Card>

          {/* Timeline */}
          <div className="w-full">
            <Timeline droppedItems={droppedItems} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default Editor;
