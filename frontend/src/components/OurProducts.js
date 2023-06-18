
import React from "react";
import HomePage from "./HomePage";

function JumpScrollButton() {
    const handleClick = () => {
        window.scrollTo({
            bottom: 100, // replace 0 with the Y coordinate you want to scroll to
            behavior: "smooth" // this makes the scrolling smooth
        });
    };

    return (
        <HomePage isHomePage='false'/>
    );
}

export default function OurProducts(){

    return (
        <JumpScrollButton/>
    );
}