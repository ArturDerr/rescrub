import React from "react";
import background from "/images/bg-image.svg"

export const Aside = () => {
    return (
        <aside className="w-1/2 h-screen hidden lg:flex bg-main justify-center items-center">
            <img src={background} className="max-w-[700px] h-[475px] "/>
        </aside>
    )
}