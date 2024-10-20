// @ts-nocheck
"use client";

import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import ItemCard from './ItemCard';

const DraggableItem = ({ emoji, title, boxes_store, resources_store }) => {
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
            <ItemCard title={title} emoji={emoji} boxes_store={boxes_store} resources_store={resources_store}/>
        </div>
    );
};

export default DraggableItem;
