// @ts-nocheck
"use client";

import React, {useEffect} from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const DraggableBox = ({ id, left, top, hideSourceOnDrag = false, loading = false, children }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));


  if (isDragging) {
    return null; // Don't render the box when it's being dragged
  }


  return (
    <>
      {isDragging && hideSourceOnDrag ? (
        <div ref={drag} />
      ) : (
        <div
          ref={drag}
          className="absolute"
          style={{ left: `${left}px`, top: `${top}px` }}
          role="Box"
          data-testid="box"
        >
          {loading ? (
            <div className="animate-ping border-gray-200 shadow hover:bg-gray-100 cursor-pointer transition inline-flex items-center text-2xl space-x-2.5 py-2.5 px-4 font-medium border rounded-lg">
              <img src="/spark.gif" className='h-[1.5em]'></img>
              <span>Fusing</span>
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </>
  );
};

export default DraggableBox;
