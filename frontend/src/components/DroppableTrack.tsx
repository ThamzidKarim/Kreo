/**
 * Author: Thamzid Karim
 * Date: 11/5/2025
 * This component uses the DnD Kit library to manage drag-and-drop functionality.
*/

import { useDroppable } from '@dnd-kit/core';

type DroppableTrackProps = {
  id: string;
  children: React.ReactNode;
};

function DroppableTrack({ id, children }: DroppableTrackProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
}

export default DroppableTrack;
