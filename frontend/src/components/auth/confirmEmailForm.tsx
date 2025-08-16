import useDataStore from "../../store/useDataStore";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

export const ConfirmEmailForm = () => {
    const userEmail = useDataStore((state) => state.userEmail)
    
    return (
        <div className="w-full flex justify-center">
            <div className="flex-col flex p-[30px] w-full max-w-[427px]">
                <h1 className="font-atyp-semibold justify-start text-black text-[25px] md:text-[30px] leading-7">Подтвердите почту</h1>
                <p className="font-atyp-regular justify-start text-black text-[13px] leading-3.5 mt-[6px] md:mt-[10px]">Пожалуйста, перейдите по ссылке, отправленной на вашу почту <span className="text-main">{userEmail}</span> для подтверждения учетной записи.</p>
                <form method="POST" action="/confirmEmail" className="flex-col flex gap-[10px] mt-[16px]">
                    <Button title="Перейти на почту"/>
                </form>
                <div className="mt-[6px] text-center">
                    <span className="text-[11px] md:text-[12px] text-black font-atyp-regular">Не получили письмо? <Link to="/confirm" className="text-main hover:underline cursor-pointer">Отправить повторно</Link></span>
                </div>
            </div>
        </div>
    )
}