import logo from "/images/logo.svg"

export const Header = () => {
    return (
        <header className="z-1000 w-full">
            <div className="flex-wrap flex p-[30px]">
                <img src={logo} alt="Rescrub" className="cursor-pointer" onClick={() => window.location.href = 'https://rescrub.ru/'}/>
                <div className="cursor-pointer ml-auto">
                    <svg height="20" width="21" fill="none" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg" className="text-black cursor-pointer transition-colors duration-200 hover:text-main" onClick={() => window.location.href = 'https://rescrub.ru/'}>
                        <path d="M15.5918 3.80669C15.9446 3.45388 16.5163 3.45388 16.8691 3.80669C17.2219 4.1595 17.2219 4.73124 16.8691 5.08403L11.9531 10L16.8691 14.9161C17.2219 15.2689 17.2219 15.8406 16.8691 16.1934C16.5163 16.5462 15.9446 16.5462 15.5918 16.1934L10.6758 11.2774L5.75977 16.1934C5.40697 16.5462 4.83523 16.5462 4.48242 16.1934C4.12961 15.8406 4.12961 15.2689 4.48242 14.9161L9.39844 10L4.48242 5.08403C4.12961 4.73122 4.12961 4.15949 4.48242 3.80669C4.83523 3.45388 5.40696 3.45388 5.75977 3.80669L10.6758 8.7227L15.5918 3.80669Z" fill="currentColor"/>
                    </svg>
                </div>
            </div>
        </header>
    )
}