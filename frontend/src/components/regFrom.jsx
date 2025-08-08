import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const RegForm = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="flex-col flex p-[30px] w-full max-w-[372px] h-auto">
                <h1 className="font-atyp-semibold justify-start text-black text-[25px] md:text-[30px] leading-7">Создайте аккаунт</h1>
                <p className="font-atyp-regular justify-start text-black text-[12px] leading-3.5 mt-[6px] md:mt-[10px]">и начните удалять свои персональные данные <br className="hidden sm:flex"/> из сети прямо сейчас.</p>
                <form method="POST" action="/login" className="flex-col flex gap-[10px] mt-[16px]">
                    <Input type="text" id="name" name="text" placeholder="Введите имя" />
                    <Input type="text" id="lastname" name="text" placeholder="Введите фамилию" />
                    <Input type="text" id="surname" name="text" placeholder="Введите отчество (при наличии)" />
                    <Input type="email" id="email" name="email" placeholder="Введите почту" />
                    <Input type="password" id="password" name="password" placeholder="Введите пароль" />
                    <Input type="password" id="password" name="password" placeholder="Повторите пароль" />
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" name="remember" className="cursor-pointer w-[16px] h-[16px] accent-main appearance-none border-[1px] border-black rounded-[4px]"/>
                        <label htmlFor="remember" className="text-[13px] text-black font-atyp-medium cursor-pointer">Запомнить меня</label>
                        <a className="block text-[11px] md:text-[12px] text-main font-atyp-regular cursor-pointer right-0 ml-auto hover:underline">Забыли пароль?</a>
                    </div>
                    <Button title="Войти" />
                </form>
                <div className="mt-[6px] text-center">
                    <span className="text-[11px] md:text-[12px] text-black font-atyp-regular">Уже есть аккаунт? <Link to="/reg" className="text-main hover:underline cursor-pointer">Войти</Link></span>
                </div>
            </div>
        </div>
    )
}