import React from "react";
import logo from "/images/logo.svg"

export const Footer = () => {
    return (
        <footer className="flex text-center justify-center">
            <div className="flex-wrap flex max-w-[327px] text-center justify-center items-center">
                <img src={logo} alt="Rescrub" className="hidden mb-[10px] md:flex"/>
                <p className="text-[10px] text-black font-atyp-regular sm:text-[12px] leading-3 sm:leading-4">Нажатие кнопки «Войти», подтверждает ваше согласие с <br className="sm:hidden"/><span className="cursor-pointer underline hover:text-main">политикой конфиденциальности</span> и с <span className="cursor-pointer underline hover:text-main">договором оферты</span></p>
            </div>
        </footer>
    )
}