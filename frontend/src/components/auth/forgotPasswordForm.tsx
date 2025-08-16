import { Link } from "react-router-dom";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export const ForgotPasswordForm = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="flex-col flex p-[30px] w-full max-w-[427px]">
                <h1 className="font-atyp-semibold justify-start text-black text-[25px] md:text-[30px] leading-7">Сброс пароля</h1>
                <p className="font-atyp-regular justify-start text-black text-[13px] leading-3.5 mt-[6px] md:mt-[10px]">Пожалуйста, введите свою почту, и перейдите по ссылке в письме для сброса пароля.</p>
                <form method="POST" action="/forgotPassword" className="flex-col flex gap-[10px] mt-[16px]">
                    <Input type="email" id="email" name="email" placeholder="Введите почту" />
                    <Button title="Перейти на почту"/>
                </form>
                <div className="mt-[6px] text-center">
                    <span className="text-[11px] md:text-[12px] text-black font-atyp-regular">Еще нет аккаунта? <Link to="/reg" className="text-main hover:underline cursor-pointer">Зарегистрироваться</Link></span>
                </div>
            </div>
        </div>
    )
}