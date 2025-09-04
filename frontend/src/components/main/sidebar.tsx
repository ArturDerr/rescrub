import { IconArrowLeft, IconCreditCard, IconHome, IconNote, IconSettings } from "@tabler/icons-react"
import { Sidebar, SidebarBody, SidebarLink } from "../../ui/sidebar"
import { useState } from "react"
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import logo from "/images/logo.svg"
import { getCurrentUser, logout } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "./home";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SideBar = () => {
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
                <Link to="/home" className="font-atyp-medium text-black">Главная</Link>
            ),
            href: <Link to="/home">Главная</Link>,
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
                <Link to="/settings" className="font-atyp-medium text-black">Настройки</Link>
            ),
            href: <Link to="/settings"></Link>,
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
                        <SidebarLink link={{label: userEmail, href: "#", icon: ""}} />
                    </div>
                </SidebarBody>
            </Sidebar>
            <Home />
        </div>
    )
}
