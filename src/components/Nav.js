import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
    return (
        <>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="About">About</Link>
            </div>
            <div>
                <Link to="Gallery">Gallery</Link>
            </div>
        </>
    );
};
