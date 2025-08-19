import { Button } from "../../ui/button"

export const ResetPasswordForm = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="flex-col flex p-[30px] w-full max-w-[427px]">
                <h1 className="font-atyp-semibold justify-start text-black text-[25px] md:text-[30px] leading-7">Сброс пароля</h1>
                <p className="font-atyp-regular justify-start text-black text-[13px] leading-3.5 mt-[6px] md:mt-[10px]">Пожалуйста, введите новый пароль.</p>
                <form method="POST" action="/resetPassword" className="flex-col flex gap-[10px] mt-[16px]">
                    <input type="password" id="password" name="password" placeholder="Введите пароль" className="text-black text-[15px] placeholder-gray font-atyp-regular border-black border-[1px] p-[12px] rounded-[6px] w-full h-[44px] transition-all duration-200 focus:border-main focus:outline-none hover:border-main"/>
                    <input type="password" id="password" name="password" placeholder="Повторите пароль" className="text-black text-[15px] placeholder-gray font-atyp-regular border-black border-[1px] p-[12px] rounded-[6px] w-full h-[44px] transition-all duration-200 focus:border-main focus:outline-none hover:border-main"/>                    
                    <Button title="Сбросить пароль" />
                </form>
            </div>
        </div>
    )
}