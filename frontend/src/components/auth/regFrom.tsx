import { useState } from "react"
import MuiAlert, { type AlertProps } from '@mui/material/Alert'
import { register } from "../../api/auth"
import type { IRegister, IRegisterResponse } from "../../interfaces"
import Snackbar from "@mui/material/Snackbar"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../ui/button"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const RegForm = () => {

    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const [formData, setFormData] = useState({ email: "", phone: "+79993332315", password: "", firstName: "", lastName: "", middleName: "", birthDate: "" })
    
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const [policies, setPolicies] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "")

        if (value.length > 2) value = value.slice(0, 2) + "-" + value.slice(2)
        if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5, 9)

        setFormData({ ...formData, birthDate: value.slice(0, 10) })
    }

    const validateForm = () => {
        if (!formData.firstName.trim()) return "Введите имя"
        if (!formData.lastName.trim()) return "Введите фамилию"
        if (!formData.email.match(/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i)) return "Некорректный email"
        if (!formData.birthDate) return "Введите дату рождения"
        if (!formData.password.match(passwordRegEx)) return "Пароль должен содержать минимум 8 символов, а также включать в себя цифры и буквы"
        if (formData.password.length < 8) return "Пароль должен содержать минимум 8 символов"
        if (formData.password !== passwordRepeat) return "Пароли не совпадают"
        if (!policies) return "Необходимо согласиться с политикой"
        return null
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        const validationError = validateForm()
        if (validationError) {
            setError(validationError)
            return
        }

        try {
            const payload: IRegister = { ...formData }
            const response: IRegisterResponse = await register(payload)
            setSuccess(response.message)
            setPasswordRepeat("")
            navigate("/confirm", { state: { email: response.email } })

        } catch (err: any) {
            const resMessage = err.response?.data?.detail ||  err.response?.data?.message || err.message || "Ошибка регистрации"
            setError(resMessage)
        }
        

    }
    
    return (
        <div className="w-full flex justify-center mt-[60px]">
            <div className="flex-col flex p-[30px] w-full max-w-[427px]">
                <h1 className="font-atyp-semibold justify-start text-black text-[25px] md:text-[30px] leading-7">Создайте аккаунт</h1>
                <p className="font-atyp-regular justify-start text-black text-[12px] leading-3.5 mt-[6px] md:mt-[10px]">и начните удалять свои персональные данные <br className="hidden sm:flex"/> из сети прямо сейчас.</p>
                <form onSubmit={handleRegister} className="flex-col flex gap-[10px] mt-[16px] relative w-full max-w-[427px]">
                    <input type="text" name="firstName" required placeholder="Введите имя" value={formData.firstName} onChange={handleChange} className="text-black text-[15px] placeholder-gray font-atyp-regular border-black border-[1px] p-[12px] rounded-[6px] w-full h-[44px] transition-all duration-200 focus:border-main focus:outline-none hover:border-main"/>
                    <input type="text" name="lastName" required placeholder="Введите фамилию" value={formData.lastName} onChange={handleChange} className="text-black text-[15px] placeholder-gray font-atyp-regular border-black border-[1px] p-[12px] rounded-[6px] w-full h-[44px] transition-all duration-200 focus:border-main focus:outline-none hover:border-main"/>
                    <input type="text" name="middleName" placeholder="Введите отчество (при наличии)" value={formData.middleName} onChange={handleChange} className="text-black text-[15px] placeholder-gray font-atyp-regular border-black border-[1px] p-[12px] rounded-[6px] w-full h-[44px] transition-all duration-200 focus:border-main focus:outline-none hover:border-main"/>
                    <input type="email" name="email" required placeholder="Введите почту" value={formData.email} onChange={handleChange} className="text-black text-[15px] placeholder-gray font-atyp-regular border-black border-[1px] p-[12px] rounded-[6px] w-full h-[44px] transition-all duration-200 focus:border-main focus:outline-none hover:border-main"/>
                    
                    <label className="text-[13px] font-atyp-medium">Дата рождения</label>
                    <input type="text" name="birthDate" maxLength={10} value={formData.birthDate} onChange={handleDateInput} required placeholder="ДД-ММ-ГГГГ" className="text-black text-[15px] placeholder-gray font-atyp-regular border-black border-[1px] p-[12px] rounded-[6px] w-full h-[44px] transition-all duration-200 focus:border-main focus:outline-none hover:border-main"/>
                    
                    <label className="text-[13px] font-atyp-medium">Пароль</label>
                    <input type="password" name="password" required placeholder="Введите пароль" value={formData.password} onChange={handleChange} className="text-black text-[15px] placeholder-gray font-atyp-regular border-black border-[1px] p-[12px] rounded-[6px] w-full h-[44px] transition-all duration-200 focus:border-main focus:outline-none hover:border-main"/>
                    <input type="password" name="passwordRepeat" required placeholder="Повторите пароль" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} className="text-black text-[15px] placeholder-gray font-atyp-regular border-black border-[1px] p-[12px] rounded-[6px] w-full h-[44px] transition-all duration-200 focus:border-main focus:outline-none hover:border-main"/>
                    
                    <div className="flex items-center gap-2 mt-[3px] mb-[3px]">
                        <input type="checkbox" id="policies" name="policies" checked={policies} onChange={(e) => setPolicies(e.target.checked)} className="cursor-pointer w-[16px] h-[16px] appearance-none border border-black rounded-[4px] checked:bg-main checked:border-main checked:after:content-['✓'] checked:after:block checked:after:text-white checked:after:text-[12px] checked:after:leading-[14px] checked:after:text-center"/>
                        <label htmlFor="policies" className="text-[11px] text-black font-atyp-regular leading-3">Я подтверждаю свое согласие с <br/><Link to="/policies" className="cursor-pointer underline hover:text-main">политикой конфиденциальности</Link> и с <Link to="/agreement" className="cursor-pointer underline hover:text-main">договором оферты</Link></label>
                    </div>
                    <Button title="Зарегистрироваться" link="/confirm"/>
                </form>
                <div className="mt-[6px] text-center">
                    <span className="text-[11px] md:text-[12px] text-black font-atyp-regular">Уже есть аккаунт? <Link to="/login" className="text-main hover:underline cursor-pointer">Войти</Link></span>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)} className="justify-center flex">
                <Alert severity="error">{error}</Alert>
                </Snackbar>
                <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess(null)}>
                    <Alert severity="success">{success}</Alert>
                </Snackbar>
            </div>
        </div>
    )
}