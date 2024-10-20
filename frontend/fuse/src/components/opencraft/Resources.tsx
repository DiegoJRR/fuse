"use client";

import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import ItemCard from './ItemCard';

const DraggableItem = ({ emoji, title }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item: { title, emoji },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [title, emoji]);

    return (
        <div
            ref={drag}
            role="Box"
            data-testid="box"
            className="inline-block"
            style={{ opacity: isDragging ? 0.5 : 1 }} 
        >
            <ItemCard title={title} emoji={emoji} />
        </div>
    );
};

export default DraggableItem;
