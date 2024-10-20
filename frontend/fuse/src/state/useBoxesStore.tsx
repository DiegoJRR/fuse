// @ts-nocheck
import { useState } from 'react';

export interface BoxStoreEntry {
    top: number;
    left: number;
    title?: string | undefined;
    emoji?: string | undefined;
    loading: boolean;
}

export interface BoxStores {
    [id : string] : BoxStoreEntry
}

// Custom hook to manage boxes
export const useBoxesStore = () => {
    // State to hold boxes, initialized with a default box
    const [boxes, setBoxes] = useState<{ [key: string]: BoxStoreEntry }>({
    });

    // Function to add a box
    const addBox = (box: BoxStoreEntry) => {
        const randomId = Math.random().toString(36).substr(2, 5);
        setBoxes((prevBoxes) => ({
            ...prevBoxes,
            [randomId]: box,
        }));
    };

    // Function to remove a box
    const removeBox = (id: string) => {
        setBoxes((prevBoxes) => {
            const newBoxes = { ...prevBoxes };
            delete newBoxes[id];
            return newBoxes;
        });
    };

    const moveBox = (id : string, delta_x : number, delta_y : number) => {
        setBoxes((prevBoxes) => {
            const newBoxes : BoxStores = { ...prevBoxes } as BoxStores;
            newBoxes[id] = {
                ...newBoxes[id],
                left: newBoxes[id].left + delta_x,
                top: newBoxes[id].top + delta_y
            } ;
            console.log(newBoxes)
            return newBoxes;
        });
    }

    const toggleLoadingBox = (id : string) => {
            setBoxes((prevBoxes) => {
                const newBoxes : BoxStores = { ...prevBoxes } as BoxStores;
                newBoxes[id] = {
                    ...newBoxes[id],
                    loading: !(newBoxes[id]?.loading)
                } ;
                return newBoxes;
            });
    }

    return { boxes, addBox, moveBox, removeBox, toggleLoadingBox};
};
