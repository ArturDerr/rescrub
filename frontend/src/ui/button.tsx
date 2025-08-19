import { Link } from "react-router-dom"

interface IButtonProps {
    title: string
    link?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
}

export const Button = ({ title, link }: IButtonProps) => {
    return (
        <button type="submit" className="cursor-pointer flex justify-center items-center bg-black transition-colors duration-200 hover:bg-main max-w-[427px] h-[44px] rounded-[6px]">
            <Link to="/main"><p className="text-white text-[14px] font-atyp-semibold">{title}</p></Link>
        </button>
    
    )
}