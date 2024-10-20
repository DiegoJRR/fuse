"use client";

import React from 'react';
import { useDrag } from 'react-use-gesture';
import useItemStore from '../../state/itemStore';

// Component for individual draggable items
const DraggableItem: React.FC<{ item: { id: number; type: string; x: number; y: number } }> = ({ item }) => {
  const updateItem = useItemStore((state) => state.updateItem);

  // Use gesture hook to handle dragging
  const bind = useDrag(({ offset: [x, y] }) => {
    updateItem(item.id, x, y); // Update position on drag
  });

  return (
    <div
      {...bind()}
      style={{
        position: 'absolute',
        left: item.x,
        top: item.y,
        width: 50,
        height: 50,
        backgroundColor: item.type === 'tree' ? 'green' : 'blue',
        cursor: 'move',
      }}
    />
  );
};

// Draggable canvas to contain the items
const DraggableCanvas: React.FC = () => {
  const items = useItemStore((state) => state.items); // Get the list of items from the store

  return (
    <div className="relative w-full h-full bg-gray-200">
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default DraggableCanvas;
