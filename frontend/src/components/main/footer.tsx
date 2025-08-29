import { Link } from "react-router-dom"

interface IProps {
    title: string
}

export const Footer = ({ title }: IProps) => {
    return (
        <footer className="flex text-center justify-center">
            <div className="flex-wrap flex max-w-[427px] text-center justify-center items-center mb-[20px]">
                <p className="text-[10px] text-black font-atyp-regular sm:text-[12px] leading-3 sm:leading-4">Нажатие кнопки «{title}», подтверждает ваше согласие с <br className="sm:hidden"/><Link to="/policies" className="cursor-pointer underline hover:text-main">политикой конфиденциальности</Link> и с <Link to="/agreement" className="cursor-pointer underline hover:text-main">договором оферты</Link></p>
            </div>
        </footer>
    )
}