"use client";

import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Box from './Box';
import ItemCard from "./ItemCard";
import AvailableResources from "./AvailableResources";
import { useBoxesStore } from "../../state/useBoxesStore";

const DropContainer = () => {
  const store = useBoxesStore();
  const { boxes } = store;

  const containerElement = useRef(null);

  const moveBox = (id, left, top, title, emoji) => {
    if (id) {
      Object.assign(boxes[id], { left, top });
    } else {
      const key = Math.random().toString(36).substring(7);
      boxes[key] = { top, left, title, emoji };
      console.log(boxes);
    }
  };

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      if (item.id && item.left !== null && item.top !== null) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta && delta.x !== null && delta.y !== null) {
          const left = Math.round(item.left + delta.x);
          const top = Math.round(item.top + delta.y);
          moveBox(item.id, left, top);
        }
      } else {
        const delta = monitor.getClientOffset();
        const containerCoords = containerElement.current.getBoundingClientRect();
        if (delta && delta.x !== null && delta.y !== null) {
          const left = Math.round(delta.x - containerCoords.left - 40);
          const top = Math.round(delta.y - containerCoords.top - 15);
          moveBox(null, left, top, item.title, item.emoji);
        }
      }
      return undefined;
    },
  }));

  return (
    <div ref={containerElement}>
      <main className="flex gap-x-3">
        <div className="w-3/4">
          <div ref={drop} className="container">
            {Object.entries(boxes).map(([key, value]) => (
              <Box
                id={key}
                key={key}
                left={value.left}
                top={value.top}
                loading={value.loading}
              >
                <ItemCard size="large" id={key} title={value.title} emoji={value.emoji} />
              </Box>
            ))}
          </div>
        </div>
        <div className="w-1/4 bg-white shadow px-4 py-3 border-gray-200 border rounded-lg overflow-y-scroll max-h-[80vh]">
          <h2 className="font-semibold">Resources</h2>
          <AvailableResources />
        </div>
      </main>
    </div>
  );
};

export default DropContainer;
