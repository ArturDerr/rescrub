import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import type { ILogin, ILoginResponse } from "../../interfaces";
import { login } from "../../api/auth";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { type AlertProps } from '@mui/material/Alert'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const LoginForm = () => {

    const navigate = useNavigate()

    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({ phone: "", email: "", password: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        try {
            const payload: ILogin = { ...formData }
            const response: ILoginResponse = await login(payload)
            setSuccess(response.email)
            navigate("/main")

        } catch (err: any) {
            const resMessage = err.response?.data?.detail ||  err.response?.data?.message || err.message || "Ошибка авторизации"
            setError(resMessage)
        }
        

    }

    return (
        <div className="w-full flex justify-center">
            <div className="flex-col flex p-[30px] w-full max-w-[427px]">
                <h1 className="font-atyp-semibold justify-start text-black text-[25px] md:text-[30px] leading-7">Войдите в аккаунт</h1>
                <p className="font-atyp-regular justify-start text-black text-[12px] leading-3.5 mt-[6px] md:mt-[10px]">и начните удалять свои персональные данные <br className="hidden sm:flex"/> из сети прямо сейчас.</p>
                <form onSubmit={handleLogin} className="flex-col flex gap-[10px] mt-[16px]">
                    <input type="email" name="email" required placeholder="Введите почту" value={formData.email} onChange={handleChange} className="text-black text-[15px] placeholder-gray font-atyp-regular border-black border-[1px] p-[12px] rounded-[6px] w-full h-[44px] transition-all duration-200 focus:border-main focus:outline-none hover:border-main"/>
                    <input type="password" name="password" required placeholder="Введите пароль" value={formData.password} onChange={handleChange} className="text-black text-[15px] placeholder-gray font-atyp-regular border-black border-[1px] p-[12px] rounded-[6px] w-full h-[44px] transition-all duration-200 focus:border-main focus:outline-none hover:border-main"/>
                    <Button title="Войти" link="/main" />
                </form>
                <div className="mt-[6px] text-center">
                    <span className="text-[11px] md:text-[12px] text-black font-atyp-regular">Еще нет аккаунта? <Link to="/reg" className="text-main hover:underline cursor-pointer">Зарегистрироваться</Link></span>
                    <a className="block text-[11px] md:text-[12px] text-main font-atyp-regular cursor-pointer left-0 mr-auto hover:underline"><Link to="/forgot" className="text-main hover:underline cursor-pointer">Забыли пароль?</Link></a>
                </div>
            </div>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>
            <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess(null)}>
                <Alert severity="success">{success}</Alert>
            </Snackbar>
        </div>
    )
}