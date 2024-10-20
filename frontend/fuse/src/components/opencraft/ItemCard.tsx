"use client";

import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const DraggableItem = ({ title, emoji, id, size, boxes_store, resources_store}) => {
  console.log(resources_store)
  const {boxes, removeBox, addBox, toggleLoadingBox} = boxes_store;
  const {resources, addResource} = resources_store
  
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    async drop(item) {
      if (item.id !== id) {
        const droppedId = item.id;
        const secondTitle = boxes[droppedId]?.title ?? item?.title;

        console.log(boxes)
        console.log("uwu", boxes[id])
        console.log(boxes)
        
        
        removeBox(droppedId)
        toggleLoadingBox(id)
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        sleep(500).then(
          ()=>{
            removeBox(id)
            const resultAnswer = "dog";
            const resultEmoji = "🤦‍♂️";
    
            addBox({
              title: resultAnswer,
              emoji: resultEmoji,
              left: boxes[id].left,
              top: boxes[id].top,
              loading: false
            });
    
            if (!resources.find((resource) => resource.title === resultAnswer)) {
              addResource({
                title: resultAnswer,
                emoji: resultEmoji,
              });
            }
          })
       
      }
    },
  }));

  const classNames = `
    ${size === 'large' ? 'text-2xl space-x-2.5 py-2.5 px-4' : 'space-x-1.5 px-3 py-1'}
    border-gray-200 bg-white shadow hover:bg-gray-100 cursor-pointer transition inline-block font-medium border rounded-lg
  `.trim();

  return (
    <div ref={drop} className={classNames}>
      <span>{emoji}</span>
      <span style={{ color: 'black' }}>{title}</span>
    </div>
  );
};

export default DraggableItem;
