/**
 * Author: Thamzid Karim
 * Date: 15/5/2025
 * This component uses the DnD Kit library to manage drag-and-drop functionality.
 */

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// Define the props for the DraggableMedia component
type DraggableMediaProps = {
  id: string;
  data: {
    id: string; 
    mediaType: string;  // "image" or "video"
    mediaContent: string; // URL or path of the media file
  };
  children: React.ReactNode;
};

function DraggableMedia({ id, data, children }: DraggableMediaProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

export default DraggableMedia;
