import { IconArrowLeft, IconCreditCard, IconHome, IconNote, IconSettings } from "@tabler/icons-react"
import { Sidebar, SidebarBody, SidebarLink } from "../../ui/sidebar"
import { useEffect, useState } from "react"
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import logo from "/images/logo.svg"
import { getCurrentUser, logout } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import { getAnalytics } from "../../api/analytics";
import type { IAnalyticsResponse } from "../../interfaces";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MainForm = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const user = getCurrentUser()
    const userEmail = user?.email

    const links = [
        {
            label: (
                <p className="font-atyp-medium text-black">Главная</p>
            ),
            href: "#",
            icon: (
                <IconHome className="h-5 w-5 shrink-0 text-black dark:text-neutral-200" />
            ),
        },
        {
            label: (
                <p className="font-atyp-medium text-black">Отчеты</p>
            ),
            href: "#",
            icon: (
                <IconNote className="h-5 w-5 shrink-0 text-black dark:text-neutral-200" />
            ),
        },
        {
            label: (
                <p className="font-atyp-medium text-black">Управление подпиской</p>
            ),
            href: "#",
            icon: (
                <IconCreditCard className="h-5 w-5 shrink-0 text-black dark:text-neutral-200" />
            ),
        },
        {
            label: (
                <p className="font-atyp-medium text-black">Настройки</p>
            ),
            href: "#",
            icon: (
                <IconSettings className="h-5 w-5 shrink-0 text-black dark:text-neutral-200" />
            ),
        },
        {   
            label: (
                <p className="font-atyp-medium text-black">Выйти из аккаунта</p>
            ),
            href: () => handleLogout(),
            icon: (
                <IconArrowLeft className="h-5 w-5 shrink-0 text-black dark:text-neutral-200" />
            ),
        },
    ]    

    const [open, setOpen] = useState(false)

    return (
        <div className={cn("mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800", "h-screen", )}>
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <img src={logo} className="w-7 h-7"/>
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink link={{label: userEmail, href: "#", icon: <img src="https://assets.aceternity.com/manu.png" className="h-7 w-7 shrink-0 rounded-full" width={50} height={50} alt="Avatar" />}} />
                    </div>
                </SidebarBody>
            </Sidebar>
            <Dashboard />
        </div>
    )
}

const Dashboard = () => {
    // заглушки убрать
    const [progress, setProgress] = useState(0)
    const [active, setActive] = useState(false)

    const { data, error } = useQuery<IAnalyticsResponse, Error>({
        queryKey: ["analytics"],
        queryFn: getAnalytics,
    })

    // заглушки убрать
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (active && progress < 100) {
        timer = setInterval(() => {
            setProgress(prev => {
            if (prev >= 100) {
                clearInterval(timer)
                return 100
            }
            return prev + 1
            })
        }, 200)
        }
        return () => clearInterval(timer)
    }, [active, progress])

    const handleClick = () => {
        if (!active) {
        setActive(true)
        setProgress(0)
        }
    }
    return (
        <div className="flex flex-1">
            <div className="flex mt-3 mr-3 mb-3 ml-3 md:ml-0 w-full flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
                <div>
                    <p className="font-atyp-medium text-gray-500">Главная</p>
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="md:max-w-[350px] w-full md:w-auto p-6 h-auto md:min-h-[130px] relative rounded-lg shadow-[0px_2px_3px_0px_rgba(0,0,0,0.04)] outline outline-1 outline-offset-[-1px] outline-zinc-100">
                        <p className="justify-start text-black text-3xl font-normal font-atyp-semibold leading-none">{data ? data.mentions : 90}</p>
                        <p className="justify-start mt-4 text-gray-500 text-[14px] font-normal font-atyp-regular leading-4">Упоминаний о вас удаленно с сайтов и сервисов.</p>
                    </div>
                    <div className="md:max-w-[350px] w-full md:w-auto p-6 h-auto md:min-h-[130px] relative rounded-lg shadow-[0px_2px_3px_0px_rgba(0,0,0,0.04)] outline outline-1 outline-offset-[-1px] outline-zinc-100">
                        <p className="justify-start text-black text-3xl font-normal font-atyp-semibold leading-none">{data ? data.scanned : "50%"}</p>
                        <p className="justify-start mt-4 text-gray-500 text-[14px] font-normal font-atyp-regular leading-4">Сайтов в интернете просканированно нашей системой.</p>
                    </div>
                    <div className="md:max-w-[350px] w-full md:w-auto p-6 h-auto md:min-h-[130px] relative rounded-lg shadow-[0px_2px_3px_0px_rgba(0,0,0,0.04)] outline outline-1 outline-offset-[-1px] outline-zinc-100">
                        <p className="justify-start text-black text-3xl font-normal font-atyp-semibold leading-none">{data ? data.notScanned : 10}</p>
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
                        {/* убрать заглушку эту */}
                        <button
                            onClick={handleClick}
                            disabled={active && progress >= 100}
                            className={`px-3 py-2.5 rounded-md cursor-pointer flex justify-center items-center gap-2.5 overflow-hidden outline outline-1 outline-offset-[-1px] transition-colors ${
                                active ? "outline-amber-400" : "bg-white outline-zinc-200 hover:bg-gray-50"
                            }`}
                            >
                            <p
                                className={`text-xs font-normal font-atyp-medium leading-3 ${
                                active ? "text-amber-500" : "text-gray-500"
                                }`}
                            >
                                {active
                                ? `Удаление данных ${progress}%`
                                : "Начать удаление"}
                            </p>
                        </button>
                    </div>
                    <div className="self-stretch px-7 py-4 outline-zinc-100 inline-flex justify-between items-center">
                        <div className="flex justify-start items-center gap-3.5">
                            <div className="inline-flex flex-col justify-center items-start gap-2">
                                <div className="justify-start text-black text-sm font-normal font-atyp-medium leading-none">Проверить на новые утечки</div>
                            </div>
                        </div>
                        <button className="px-3 py-2.5 bg-white cursor-pointer hover:bg-gray-50 rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-200 flex justify-center items-center gap-2.5 overflow-hidden">
                            <p className="justify-start text-gray-500 text-xs font-normal font-atyp-medium leading-3">Начать проверку</p>
                        </button>
                    </div>
                </div>                
            </div>          
        </div>
    )
}