import { Link, useLocation } from "react-router-dom"
import { Button } from "../../ui/button"
import { useEffect, useState } from "react"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { type AlertProps } from '@mui/material/Alert'
import type { IConfirmEmail, IConfirmEmailResponse } from "../../interfaces"
import { confirmEmail } from "../../api/auth"

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const ConfirmEmailForm = () => {   
    const location = useLocation()
    const email = (location.state as { email: string })?.email

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [timer, setTimer] = useState(0)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        const savedEndTime = localStorage.getItem("confirmEmailTimer")
        if (savedEndTime) {
            const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000)
            if (remaining > 0) {
                setTimer(remaining)
                setIsDisabled(true)
            } else {
                localStorage.removeItem("confirmEmailTimer")
            }
        }
    }, [])

    useEffect(() => {
        let interval: number
        if (timer > 0) {
            interval = window.setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        localStorage.removeItem("confirmEmailTimer")
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

    const handleConfirm = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        if (!email) return
        
        // Отправка ссылки подтверждения почты (ручка /confirm-email/) 
        try {
            const payload: IConfirmEmail = { email }
            const response: IConfirmEmailResponse = await confirmEmail(payload)
            setSuccess(response.message)

        } catch (err: any) {
            const resMessage = err.response?.data?.detail ||  err.response?.data?.message || err.message || "Ошибка отправки письма"
            setError(resMessage)
        }       

        const endTime = Date.now() + 120 * 1000; 
        localStorage.setItem("confirmEmailTimer", endTime.toString())

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
                <h1 className="font-atyp-semibold justify-start text-black text-[25px] md:text-[30px] leading-7">Подтвердите почту</h1>
                <p className="font-atyp-regular justify-start text-black text-[13px] leading-3.5 mt-[6px] md:mt-[10px]">Пожалуйста, перейдите по ссылке, отправленную на вашу почту {email} <span className="text-main"></span> для подтверждения учетной записи.</p>
                <form onSubmit={handleConfirm} className="flex-col flex gap-[10px] mt-[16px]">
                    <Button title={isDisabled ? `Отправить повторно через ${formatTime(timer)}` : "Отправить повторно"} disabled={isDisabled} /> 
                </form>
            </div>
            <div className="flex justify-center items-center">
                
            </div>             
        </div>
    )
}