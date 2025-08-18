import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { fetchMeAction, registerAction, useAuthStore } from "../../store/useAuthStore";
import { AlertError } from "../../ui/alertError";

export const RegForm = () => {
    const { token, user, logout } = useAuthStore()

    const [error, setError] = useState<string | null>(null)
    const [titleError, setTitleError] = useState<string>("Ошибка")

    const [formData, setFormData] = useState({ name: "", surname: "", lastname: "", email: "", birthDate: "", password: "" })

    // обработка ошибки
    useEffect(() => {
        if (token && !user) {
            fetchMeAction().catch((e: any) => {
                setTitleError("Ошибка проверки токена")
                setError(e || 'Неизвестная ошибка')
            })
        }
    }, [token, user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // регистрация
    const handleRegister = async () => {
        try {
            
            const payload = {
                ...formData,
                birthDate: new Date(formData.birthDate),

            }

            await registerAction(payload)
        } catch (e) {
            setTitleError("Ошибка регистрации")
            setError((e as Error).message)
        }
    }
    
    return (
        <div className="w-full flex justify-center mb-10">
            <div className="flex-col flex p-[30px] w-full max-w-[427px]">
                <h1 className="font-atyp-semibold justify-start text-black text-[25px] md:text-[30px] leading-7">Создайте аккаунт</h1>
                <p className="font-atyp-regular justify-start text-black text-[12px] leading-3.5 mt-[6px] md:mt-[10px]">и начните удалять свои персональные данные <br className="hidden sm:flex"/> из сети прямо сейчас.</p>
                <form method="POST" action="/register" className="flex-col flex gap-[10px] mt-[16px]">
                    <Input type="text" id="name" name="name" placeholder="Введите имя" value={formData.name} onChange={handleChange}/>
                    <Input type="text" id="surname" name="surname" placeholder="Введите фамилию" value={formData.surname} onChange={handleChange}/>
                    <Input type="text" id="lastname" name="lastname" placeholder="Введите отчество (при наличии)" value={formData.lastname} onChange={handleChange}/>
                    <Input type="email" id="email" name="email" placeholder="Введите почту" value={formData.email} onChange={handleChange}/>
                    <label className="text-[13px] font-atyp-medium">Дата рождения</label>
                    <Input type="date" id="birthDate" name="birthDate" placeholder="ДД.ММ.ГГГГ" value={formData.birthDate} onChange={handleChange}/>
                    <label className="text-[13px] font-atyp-medium">Пароль</label>
                    <Input type="password" id="password" name="password" placeholder="Введите пароль" value={formData.password} onChange={handleChange}/>
                    <Input type="password" id="passwordRepeat" name="passwordRepeat" placeholder="Повторите пароль" />
                    <div className="flex items-center gap-2 mt-[3px] mb-[3px]">
                        <input type="checkbox" id="policies" name="policies" className="cursor-pointer w-[16px] h-[16px] appearance-none border border-black rounded-[4px] checked:bg-main checked:border-main checked:after:content-['✓'] checked:after:block checked:after:text-white checked:after:text-[12px] checked:after:leading-[14px] checked:after:text-center"/>
                        <label htmlFor="policies" className="text-[11px] text-black font-atyp-regular leading-3">Я подтверждаю свое согласие с <br/><span className="cursor-pointer underline hover:text-main">политикой конфиденциальности</span> и с <span className="cursor-pointer underline hover:text-main">договором оферты</span></label>
                    </div>
                    <Button title="Зарегистрироваться" link="/confirm" onClick={handleRegister}/>
                </form>
                <div className="mt-[6px] text-center">
                    <span className="text-[11px] md:text-[12px] text-black font-atyp-regular">Уже есть аккаунт? <Link to="/log" className="text-main hover:underline cursor-pointer">Войти</Link></span>
                </div>
            </div>
            {error && <AlertError title={titleError} description={error}/>}
        </div>
    )
}