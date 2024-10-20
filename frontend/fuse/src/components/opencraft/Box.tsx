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
            <div className="border-gray-200 shadow hover:bg-gray-100 cursor-pointer transition inline-flex items-center text-2xl space-x-2.5 py-2.5 px-4 font-medium border rounded-lg">
              <svg
                className="animate-spin -ml-1 mr-2 h-6 w-6 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Loading</span>
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
