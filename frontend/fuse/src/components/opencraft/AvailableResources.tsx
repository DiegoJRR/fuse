"use client";

import React, { useState, useMemo } from 'react';
import Resource from './Resources';

const ResourceList = ({boxes_store, resources_store}) => {
    const { resources } = resources_store// Assuming this hook directly returns resources
    const [searchTerm, setSearchTerm] = useState('');

    // Filter resources based on the search term
    const filteredResources = useMemo(() => {
        return resources.filter((resource) =>
            resource.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [resources, searchTerm]);

    return (
        <div className="flex gap-3 flex-wrap pt-3">
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredResources.map((resource) => (
                <Resource
                    key={resource.title}
                    title={resource.title}
                    emoji={resource.emoji}
                    boxes_store={boxes_store}
                    resources_store={resources_store}
                />
            ))}
        </div>
    );
};

export default ResourceList;
