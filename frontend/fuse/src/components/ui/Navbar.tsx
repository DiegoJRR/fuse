import React from 'react'
import {
    DynamicContextProvider,
    DynamicWidget,
} from "@dynamic-labs/sdk-react-core";


const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Fuse</a>
            </div>
            <div className="flex-none gap-2">
                <DynamicWidget />
            </div>
        </div>

    )
}

export default Navbar