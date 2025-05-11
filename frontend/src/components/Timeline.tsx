/**
 * Author: Thamzid Karim
 * Date: 11/5/2025
 * This component displays a dynamic timeline and flexible media tracks.
 */

import { Card } from "@/components/ui/card";
import DroppableTrack from "./DroppableTrack";

function Timeline({ droppedItems }: { droppedItems: { [key: string]: any[] } }) {
  const seconds = 10;

  // Starts with 3 empty tracks
  const tracks = Array(3).fill(null);

  return (
    <Card className="overflow-x-auto">
      <div className="px-3 space-y-2">

        {/* Time ruler */}
        <div className="flex h-[20px]">
          {Array.from({ length: seconds }).map((_, index) => (
            <div
              key={index}
              className="w-[100px] border-r border-gray-400 text-xs text-center text-gray-500"
            >
              {index}s
            </div>
          ))}
        </div>

        {/* Dynamic droppable tracks */}
        {tracks.map((_, index) => {
          const trackId = `track-${index}`;
          return (
            <DroppableTrack key={trackId} id={trackId}>
              <div className="flex h-[60px] rounded-sm border border-gray-300 bg-gray-200">
                {droppedItems[trackId]?.map((item, i) => (
                  <img
                    key={i}
                    src={item.mediaContent}
                    alt="Dropped"
                    style={{ width: "100px" }}
                  />
                ))}
              </div>
            </DroppableTrack>
          );
        })}
      </div>
    </Card>
  );
}

export default Timeline;
