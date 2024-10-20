// @ts-nocheck
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
    const wallet = false

    return (
        <div className="flex gap-3 flex-wrap pt-3">
            <div className='flex flex-col w-full'>
                {wallet && <button disabled={true} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">Mint your Concepts</button>}
                {!wallet && <button disabled={true} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full opacity-50 cursor-not-allowed">Mint your Concepts</button>}
            </div>
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-slate-400"
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
