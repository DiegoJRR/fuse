import { useState } from 'react';

export interface ResourceStoreEntry {
    title: string;
    emoji: string;
}

export const useResourcesStore = () => {
    // Initialize resources with default values
    const [resources, setResources] = useState<ResourceStoreEntry[]>([
        { title: 'Fire', emoji: '🔥' },
        { title: 'Water', emoji: '💧' },
        { title: 'Earth', emoji: '🌍' },
        { title: 'Air', emoji: '💨' },
    ]);

    // Function to add a resource
    const addResource = (resource: ResourceStoreEntry) => {
        setResources((prevResources) => [...prevResources, resource]);
    };

    return { resources, addResource };
};
