import React from "react";

export const Button = ({ title }) => {
    return (
        <button type="submit" className="cursor-pointer flex justify-center items-center bg-black transition-colors duration-200 hover:bg-main max-w-[327px] h-[40px] rounded-[6px]">
            <p className="text-white text-[13px] font-atyp-semibold">{title}</p>
        </button>
    )
}