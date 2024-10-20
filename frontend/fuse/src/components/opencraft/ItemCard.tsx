"use client";

import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { useBoxesStore } from '../../state/useBoxesStore';
import { useResourcesStore } from '../../state/useResourcesStore';

const DraggableItem = ({ title, emoji, id, size }) => {
  const store = useBoxesStore();
  const { removeBox, addBox } = store;
  const { resources } = useResourcesStore();
  const { addResource } = useResourcesStore();
  
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    async drop(item) {
      if (item.id !== id) {
        const droppedId = item?.id;
        const secondTitle = store.boxes[droppedId]?.title ?? item?.title;

        if (droppedId) {
          removeBox(droppedId);
        }

        store.boxes[id].loading = true;

        const resultAnswer = "dog";
        const resultEmoji = "🤦‍♂️";

        addBox({
          title: resultAnswer,
          emoji: resultEmoji,
          left: store.boxes[id].left,
          top: store.boxes[id].top,
        });

        if (!resources.value.find((resource) => resource.title === resultAnswer)) {
          addResource({
            title: resultAnswer,
            emoji: resultEmoji,
          });
        }

        removeBox(id);
      }
    },
  }));

  // Conditionally set class names based on the size prop
  const classNames = `
    ${size === 'large' ? 'text-2xl space-x-2.5 py-2.5 px-4' : 'space-x-1.5 px-3 py-1'}
    border-gray-200 bg-white shadow hover:bg-gray-100 cursor-pointer transition inline-block font-medium border rounded-lg
  `.trim();

  return (
    <div ref={drop} className={classNames}>
      <span>{emoji}</span>
      <span>{title}</span>
    </div>
  );
};

export default DraggableItem;
