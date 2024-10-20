import React from 'react'
import {
    DynamicContextProvider,
    DynamicWidget,
} from "@dynamic-labs/sdk-react-core";


const Navbar = () => {
    return (
        <div className="border-b border-gray-300 py-4 px-4 fixed z-20 w-full bg-white shadow-sm h-[72px]">
            <div className='flex w-full px-4 mx-auto justify-between items-center'>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl font-exo">Fuse</a>
            </div>
            <div className="flex-none gap-2">
                <DynamicWidget />
            </div>
            </div>
        </div>

    )
}

export default Navbar