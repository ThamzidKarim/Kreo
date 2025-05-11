/**
 * Author: Thamzid Karim
 * Date: 11/5/2025
 * This page displays the video editor interface with a timeline and media pool.
 */

import Timeline from "../components/Timeline";
import NavBar from "../components/NavBar";
import DraggableMedia from "./../components/DraggableMedia";
import { DndContext } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";


function Editor() {

  // Dummy media for testing
  const testMedia = {
    id: "img-1",
    mediaType: "image",
    mediaContent: "",
  };
  
    return(
        <div className="flex h-screen">
            <div className="w-[210px]">
                <NavBar />
            </div>

            <div className="flex-1 flex flex-col items-start p-4 space-y-4">
                
                {/* Media pool */}
                <Card className="flex-1 h-[600px] p-2 flex space-x-4"> 
                    <DndContext>
                        <DraggableMedia
                                id={testMedia.id}
                                mediaType={testMedia.mediaType}
                                mediaContent={testMedia.mediaContent}
                        />
                    </DndContext>
                </Card>

                {/* Timeline */}
                <div className="w-full">
                    <Timeline /> 
                </div>
                
                
            </div>
        </div>
    );
} 
export default Editor