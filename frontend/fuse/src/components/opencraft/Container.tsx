"use client";

import React, { useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import Box from "./Box";
import ItemCard from "./ItemCard";
import AvailableResources from "./AvailableResources";
import { useBoxesStore } from "../../state/useBoxesStore";
import { useResourcesStore } from "@/state/useResourcesStore";

const DropContainer = () => {
  const store = useBoxesStore();
  const resources_store = useResourcesStore()
  const { boxes, addBox, moveBox } = store;
  const { resources, addResource } = resources_store

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
        const containerCoords =
          containerElement.current.getBoundingClientRect();
        if (delta && delta.x !== null && delta.y !== null) {
          const left = Math.round(delta.x - containerCoords.left - 40);
          const top = Math.round(delta.y - containerCoords.top - 15);
          addBox({
            left,
            top,
            title: item.title,
            emoji: item.emoji,
            loading: false,
          });
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
                <ItemCard
                  size="large"
                  id={key}
                  title={value.title}
                  emoji={value.emoji}
                  boxes_store={store}
                  resources_store={resources_store}
                />
              </Box>
            ))}
          </div>
        </div>
        <div className="max-h-[80vh] w-1/4 overflow-y-scroll rounded-lg border border-gray-200 bg-white px-4 py-3 shadow">
          <h2 className="font-semibold">Resources</h2>
          <AvailableResources boxes_store={store} resources_store={resources_store}/>
        </div>
      </main>
    </div>
  );
};

export default DropContainer;
