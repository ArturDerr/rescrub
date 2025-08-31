import { Link } from "react-router-dom"
import { Button } from "../../ui/button"
import { useEffect, useState } from "react"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { type AlertProps } from '@mui/material/Alert'
import type { IForgotPassword, IForgotPasswordResponse } from "../../interfaces"
import { forgotPassword } from "../../api/auth"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const ForgotPasswordForm = () => {

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const [email, setEmail] = useState({ email: "" })
    const [timer, setTimer] = useState(0)
    const [isDisabled, setIsDisabled] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        const savedEndTime = localStorage.getItem("forgotPasswordTimer")
        if (savedEndTime) {
            const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000)
            if (remaining > 0) {
                setTimer(remaining)
                setIsDisabled(true)
            } else {
                localStorage.removeItem("forgotPasswordTimer")
            }
        }
    }, [])

    useEffect(() => {
        let interval: number
        if (timer > 0) {
            interval = window.setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        localStorage.removeItem("forgotPasswordTimer")
                        setIsDisabled(false)
                        clearInterval(interval)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [timer])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        if (!email) return
        
        // Отправка ссылки сбрeоса пароля на почту (ручка /forgot-password/) 
        try {
            const payload: IForgotPassword = { ...email }
            const response: IForgotPasswordResponse = await forgotPassword(payload)
            setSuccess(response.message)

        } catch (err: any) {
            const resMessage = err.response?.data?.detail ||  err.response?.data?.message || err.message || "Ошибка отправки письма"
            setError(resMessage)
        }       

        const endTime = Date.now() + 120 * 1000; 
        localStorage.setItem("forgotPasswordTimer", endTime.toString())

        setIsDisabled(true)
        setTimer(120)
    }

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0")
        const s = (seconds % 60).toString().padStart(2, "0")
        return `${m}:${s}`
    }

    return (
        <div className="w-full flex justify-center">
            <div className="flex-col flex p-[30px] w-full max-w-[427px]">
                <h1 className="font-atyp-semibold justify-start text-black text-[25px] md:text-[30px] leading-7">Сброс пароля</h1>
                <p className="font-atyp-regular justify-start text-black text-[13px] leading-3.5 mt-[6px] md:mt-[10px]">Пожалуйста, введите свою почту, и перейдите по ссылке в письме для сброса пароля.</p>
                <form onSubmit={handleSubmit} className="flex-col flex gap-[10px] mt-[16px]">
                    <input type="email" value={email.email} onChange={handleChange} name="email" required placeholder="Введите почту" className="text-black text-[15px] placeholder-gray font-atyp-regular border-black border-[1px] p-[12px] rounded-[6px] w-full h-[44px] transition-all duration-200 focus:border-main focus:outline-none hover:border-main"/>
                    <Button title={isDisabled ? `Отправить повторно через ${formatTime(timer)}` : "Отправить письмо"} disabled={isDisabled} /> 
                </form>               
                <div className="mt-[6px] text-center">
                    <span className="text-[11px] md:text-[12px] text-black font-atyp-regular">Еще нет аккаунта? <Link to="/registration" className="text-main hover:underline cursor-pointer">Зарегистрироваться</Link></span>
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