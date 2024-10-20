"use client";

import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Box from './Box';
import ItemCard from "./ItemCard";
import AvailableResources from "./AvailableResources";
import { useBoxesStore } from "../../state/useBoxesStore";

const DropContainer = () => {
  const store = useBoxesStore();
  const { boxes, addBox, moveBox, removeBox } = store;

  const containerElement = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      if (item.id) {
        const delta = monitor.getDifferenceFromInitialOffset();
        console.log("Delta", delta);
        if (delta && delta.x !== null && delta.y !== null) {
          moveBox(item.id, delta.x, delta.y);
        }
      } else {
        const delta = monitor.getClientOffset();
        const containerCoords = containerElement.current.getBoundingClientRect();
        if (delta && delta.x !== null && delta.y !== null) {
          const left = Math.round(delta.x - containerCoords.left - 40);
          const top = Math.round(delta.y - containerCoords.top - 15);
          addBox({left, top, title: item.title, emoji: item.emoji});
        }
      }
      return undefined;
    },
  }));

  useEffect(() => {
    if (containerElement.current) {
      drop(containerElement.current);
    }
  }, [drop]);

  return (
    <div ref={containerElement}>
      <main className="flex gap-x-3">
        <div className="w-3/4">
          <div className="container">
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
