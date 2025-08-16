interface IButtonProps {
    title: string
    link?: string
}

export const Button = ({ title, link }: IButtonProps) => {
    return (
        <button type="submit" onClick={() => link ? window.location.href = link : null} className="cursor-pointer flex justify-center items-center bg-black transition-colors duration-200 hover:bg-main max-w-[427px] h-[44px] rounded-[6px]">
            <p className="text-white text-[14px] font-atyp-semibold">{title}</p>
        </button>
    
    )
}