import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import type { IAnalyticsResponse, ICheckData, ICheckDataResponse, IDeleteData, IDeleteDataResponse } from "../../interfaces"
import { checkData, deleteData, getAnalytics } from "../../api/analytics"
import { getCurrentUser } from "../../api/auth"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { type AlertProps } from '@mui/material/Alert'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const Home = () => {

    const [progress, setProgress] = useState<number>(() => {
        return Number(localStorage.getItem("progress")) || 0
    })
    const [active, setActive] = useState<boolean>(() => {
        return localStorage.getItem("active") === "true"
    })
    const [finished, setFinished] = useState<boolean>(() => {
        return localStorage.getItem("finished") === "true"
    })

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const user = getCurrentUser()
    const email = user?.email
    const user_id = user?.user_id

    const { data } = useQuery<IAnalyticsResponse, Error>({
        queryKey: ["analytics"],
        queryFn: getAnalytics,
    })

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (active && progress < 100) {
            timer = setInterval(() => {
                setProgress(prev => {
                    const next = prev + 1
                    localStorage.setItem("progress", String(next))
                    if (next >= 100) {
                        clearInterval(timer)
                        localStorage.setItem("progress", "100")
                        localStorage.setItem("finished", "true")
                        localStorage.setItem("active", "false")
                        setFinished(true)
                        setSuccess("Процесс завершен успешно")
                        return 100
                    }
                    return next
                })
            }, 900)
        }
        return () => clearInterval(timer)
    }, [active, progress])

    useEffect(() => {
        localStorage.setItem("active", String(active))
    }, [active])

    useEffect(() => {
        localStorage.setItem("finished", String(finished))
    }, [finished])

    const handleClick = () => {
        if (!active && !finished) {
            setActive(true)
            setProgress(0)
            localStorage.setItem("progress", "0")
            localStorage.setItem("finished", "false")
        }
    }

    const submitDeleteData = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        try {
            const payload: IDeleteData = { user_id, email }
            const response: IDeleteDataResponse = await deleteData(payload)
            setSuccess(response.message)
            handleClick()

        } catch (err: any) {
            const resMessage = err.response?.data?.detail ||  err.response?.data?.message || err.message || "Ошибка удалениях данных, попробуйте позднее"
            setError(resMessage)
        }       
    }

    const submitCheckData = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        try {
            const payload: ICheckData = { user_id, email }
            const response: ICheckDataResponse = await checkData(payload)
            setSuccess(response.message)
            handleClick()

        } catch (err: any) {
            const resMessage = err.response?.data?.detail ||  err.response?.data?.message || err.message || "Ошибка проверки данных, попробуйте позднее" 
            setError(resMessage)
        }       

        handleClick()
    }

    return (
        <div className="flex flex-1">
            <div className="flex mt-3 mr-3 mb-3 ml-3 md:ml-0 w-full flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
                <div>
                    <p className="font-atyp-medium text-gray-500">Главная</p>
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="md:max-w-[350px] w-full md:w-auto p-6 h-auto md:min-h-[130px] relative rounded-lg shadow-[0px_2px_3px_0px_rgba(0,0,0,0.04)] outline outline-1 outline-offset-[-1px] outline-zinc-100">
                        <p className="justify-start text-black text-3xl font-normal font-atyp-semibold leading-none">{data ? data.mentions : "0"}</p>
                        <p className="justify-start mt-4 text-gray-500 text-[14px] font-normal font-atyp-regular leading-4">Упоминаний о вас удаленно с сайтов и сервисов.</p>
                    </div>
                    <div className="md:max-w-[350px] w-full md:w-auto p-6 h-auto md:min-h-[130px] relative rounded-lg shadow-[0px_2px_3px_0px_rgba(0,0,0,0.04)] outline outline-1 outline-offset-[-1px] outline-zinc-100">
                        <p className="justify-start text-black text-3xl font-normal font-atyp-semibold leading-none">{data ? data.scanned : "0"}</p>
                        <p className="justify-start mt-4 text-gray-500 text-[14px] font-normal font-atyp-regular leading-4">Сайтов в интернете просканированно нашей системой.</p>
                    </div>
                    <div className="md:max-w-[350px] w-full md:w-auto p-6 h-auto md:min-h-[130px] relative rounded-lg shadow-[0px_2px_3px_0px_rgba(0,0,0,0.04)] outline outline-1 outline-offset-[-1px] outline-zinc-100">
                        <p className="justify-start text-black text-3xl font-normal font-atyp-semibold leading-none">{data ? data.notScanned : "0"}</p>
                        <p className="justify-start mt-4 text-gray-500 text-[14px] font-normal font-atyp-regular leading-4">Сайтов не удалось просканировать и данные не были удалены.</p>
                    </div>
                </div>
                <div className="max-w-[1085px] h-47 bg-white rounded-xl shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] outline outline-1 outline-offset-[-1px] outline-zinc-100 inline-flex flex-col justify-start items-start">
                    <div className="self-stretch h-14 px-7 py-5 border-b border-gray-100 outline-zinc-100 inline-flex justify-start items-start">
                        <div className="justify-start text-black font-normal font-atyp-medium leading-none">Управление данными</div>
                    </div>
                    <div className="self-stretch px-7 py-4 border-b border-gray-100 outline-zinc-100 inline-flex justify-between items-center">
                        <div className="flex justify-start items-center gap-3.5">
                            <div className="inline-flex flex-col justify-center items-start gap-2">
                                <div className="justify-start text-black text-sm font-normal font-atyp-medium leading-none">Массовое удаление</div>
                            </div>
                        </div>
                        <form onSubmit={submitDeleteData}>
                            <button
                                disabled={active && !finished}
                                className={`px-3 py-2.5 rounded-md cursor-pointer flex justify-center items-center gap-2.5 overflow-hidden outline outline-1 outline-offset-[-1px] transition-colors ${finished  ? "outline-green-400" : active ? "outline-amber-400" : "bg-white outline-zinc-200 hover:bg-gray-50"}`}>
                                    <p className={`text-xs font-normal font-atyp-medium leading-3 ${finished ? "text-green-600" : active ? "text-amber-500" : "text-gray-500"}`}>
                                        {finished
                                            ? "Удаление завершено"
                                            : active 
                                                ? `Удаление данных ${progress}%`
                                                : "Начать удаление"
                                        }
                                    </p>
                            </button>
                        </form>
                    </div>
                    <div className="self-stretch px-7 py-4 outline-zinc-100 inline-flex justify-between items-center">
                        <div className="flex justify-start items-center gap-3.5">
                            <div className="inline-flex flex-col justify-center items-start gap-2">
                                <div className="justify-start text-black text-sm font-normal font-atyp-medium leading-none">Проверить на новые утечки</div>
                            </div>
                        </div>
                        <form onSubmit={submitCheckData}>
                            <button
                                disabled={active && progress >= 100}
                                className={`px-3 py-2.5 rounded-md cursor-pointer flex justify-center items-center gap-2.5 overflow-hidden outline outline-1 outline-offset-[-1px] transition-colors ${active ? "outline-amber-400" : "bg-white outline-zinc-200 hover:bg-gray-50"}`}>
                                    <p className={`text-xs font-normal font-atyp-medium leading-3 ${ active ? "text-amber-500" : "text-gray-500"}`}>
                                        {active
                                            ? `Проверка данных ${progress}%`
                                            : "Начать проверку"}
                                    </p>
                            </button>
                        </form>
                    </div>
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