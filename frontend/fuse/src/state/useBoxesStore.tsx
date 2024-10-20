import { useState } from 'react';

export interface BoxStoreEntry {
    top: number;
    left: number;
    title: string;
    emoji: string;
    loading?: boolean;
}

// Custom hook to manage boxes
export const useBoxesStore = () => {
    // State to hold boxes, initialized with a default box
    const [boxes, setBoxes] = useState<{ [key: string]: BoxStoreEntry }>({
        a: { top: 20, left: 80, title: 'Fire', emoji: '🔥' },
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

    return { boxes, addBox, removeBox };
};
