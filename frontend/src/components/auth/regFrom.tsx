import { useRef } from "react";
import { Link } from "react-router-dom";
import useDataStore from "../../store/useDataStore";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export const RegForm = () => {
    const inputRef = useRef(null)
    const setUserEmail = useDataStore((state) => state.setUserEmail)

    return (
        <div className="w-full flex justify-center mb-10">
            <div className="flex-col flex p-[30px] w-full max-w-[427px]">
                <h1 className="font-atyp-semibold justify-start text-black text-[25px] md:text-[30px] leading-7">Создайте аккаунт</h1>
                <p className="font-atyp-regular justify-start text-black text-[12px] leading-3.5 mt-[6px] md:mt-[10px]">и начните удалять свои персональные данные <br className="hidden sm:flex"/> из сети прямо сейчас.</p>
                <form method="POST" action="/register" className="flex-col flex gap-[10px] mt-[16px]">
                    <Input type="text" id="name" name="text" placeholder="Введите имя" />
                    <Input type="text" id="lastname" name="text" placeholder="Введите фамилию" />
                    <Input type="text" id="surname" name="text" placeholder="Введите отчество (при наличии)" />
                    <Input type="email" id="email" name="email" placeholder="Введите почту" inputRef={inputRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}/>
                    <label className="text-[13px] font-atyp-medium">Дата рождения</label>
                    <Input type="date" id="date" name="date" placeholder="ДД.ММ.ГГГГ" />
                    <label className="text-[13px] font-atyp-medium">Пароль</label>
                    <Input type="password" id="password" name="password" placeholder="Введите пароль" />
                    <Input type="password" id="password" name="password" placeholder="Повторите пароль" />
                    <div className="flex items-center gap-2 mt-[3px] mb-[3px]">
                        <input type="checkbox" id="policies" name="policies" className="cursor-pointer w-[16px] h-[16px] appearance-none border border-black rounded-[4px] checked:bg-main checked:border-main checked:after:content-['✓'] checked:after:block checked:after:text-white checked:after:text-[12px] checked:after:leading-[14px] checked:after:text-center"/>
                        <label htmlFor="policies" className="text-[11px] text-black font-atyp-regular leading-3">Я подтверждаю свое согласие с <br/><span className="cursor-pointer underline hover:text-main">политикой конфиденциальности</span> и с <span className="cursor-pointer underline hover:text-main">договором оферты</span></label>
                    </div>
                    <Button title="Зарегистрироваться" link="/confirm"/>
                </form>
                <div className="mt-[6px] text-center">
                    <span className="text-[11px] md:text-[12px] text-black font-atyp-regular">Уже есть аккаунт? <Link to="/log" className="text-main hover:underline cursor-pointer">Войти</Link></span>
                </div>
            </div>
        </div>
    )
}