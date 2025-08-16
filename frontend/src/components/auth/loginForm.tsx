import { Link } from "react-router-dom";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export const LoginForm = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="flex-col flex p-[30px] w-full max-w-[427px]">
                <h1 className="font-atyp-semibold justify-start text-black text-[25px] md:text-[30px] leading-7">Войдите в аккаунт</h1>
                <p className="font-atyp-regular justify-start text-black text-[12px] leading-3.5 mt-[6px] md:mt-[10px]">и начните удалять свои персональные данные <br className="hidden sm:flex"/> из сети прямо сейчас.</p>
                <form method="POST" action="/login" className="flex-col flex gap-[10px] mt-[16px]">
                    <Input type="email" id="email" name="email" placeholder="Введите почту" />
                    <Input type="password" id="password" name="password" placeholder="Введите пароль" />
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" name="remember" className="cursor-pointer w-[16px] h-[16px] appearance-none border border-black rounded-[4px] checked:bg-main checked:border-main checked:after:content-['✓'] checked:after:block checked:after:text-white checked:after:text-[12px] checked:after:leading-[14px] checked:after:text-center"/>
                        <label htmlFor="remember" className="text-[13px] text-black font-atyp-medium cursor-pointer">Запомнить меня</label>
                        <a className="block text-[11px] md:text-[12px] text-main font-atyp-regular cursor-pointer right-0 ml-auto hover:underline"><Link to="/forgot" className="text-main hover:underline cursor-pointer">Забыли пароль?</Link></a>
                    </div>
                    <Button title="Войти" link="/main"/>
                </form>
                <div className="mt-[6px] text-center">
                    <span className="text-[11px] md:text-[12px] text-black font-atyp-regular">Еще нет аккаунта? <Link to="/reg" className="text-main hover:underline cursor-pointer">Зарегистрироваться</Link></span>
                </div>
            </div>
        </div>
    )
}