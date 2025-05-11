/**
 * Author: Thamzid Karim
 * Date: 11/5/2025
 * This component uses the DnD Kit library to manage drag-and-drop functionality.
*/

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// Define the props for the DraggableMedia component
type DraggableMediaProps = {
  id: string;
  mediaType: string;
  mediaContent: string;
};

function DraggableMedia({ id, mediaType, mediaContent }: DraggableMediaProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      id,
      mediaType,
      mediaContent,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    width: "100px",
    height: "60px",
    cursor: "grab",
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {mediaType === "image" && (
        <img
          src={mediaContent}
          alt="Draggable Media"
          className="w-full h-full object-cover"
        />
      )}
    </button>
  );
}

export default DraggableMedia;