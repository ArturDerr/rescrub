import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

export const ResetPasswordForm = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="flex-col flex p-[30px] w-full max-w-[427px]">
                <h1 className="font-atyp-semibold justify-start text-black text-[25px] md:text-[30px] leading-7">Сброс пароля</h1>
                <p className="font-atyp-regular justify-start text-black text-[13px] leading-3.5 mt-[6px] md:mt-[10px]">Пожалуйста, введите новый пароль.</p>
                <form method="POST" action="/resetPassword" className="flex-col flex gap-[10px] mt-[16px]">
                    <Input type="password" id="password" name="password" placeholder="Введите пароль" />
                    <Input type="password" id="password" name="password" placeholder="Повторите пароль" />                    
                    <Button title="Сбросить пароль" />
                </form>
            </div>
        </div>
    )
}