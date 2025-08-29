import { useNavigate } from "react-router-dom";
import { Header } from "../../components/main/header";

export const Agreement = () => {
    const navigate = useNavigate()
    return (
        <div className="flex w-full h-screen">
            <div className="flex flex-col w-full h-full">
                <Header />
                <div className="flex justify-center items-center h-full p-4">
                    <div className="max-w-[827px] text-left mt-150">
                        <div className="flex-row flex">
                            <button onClick={() => navigate(-1)} className="cursor-pointer mr-2">
                                <svg height="16" width="18" fill="none" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" className="text-black hover:text-main">
                                    <path d="M17.6317 7.99977C17.6317 8.51229 17.2162 8.92778 16.7037 8.92777H3.53763L8.51542 13.9056C8.87783 14.268 8.87783 14.8556 8.51542 15.218C8.15301 15.5804 7.56543 15.5804 7.20302 15.218L0.641027 8.65597C0.278618 8.29356 0.278619 7.70598 0.641027 7.34357L7.20302 0.781572C7.56543 0.419163 8.15301 0.419163 8.51542 0.781572C8.87783 1.14398 8.87783 1.73156 8.51542 2.09397L3.53763 7.07176H16.7037C17.2162 7.07176 17.6317 7.48724 17.6317 7.99977Z" fill="currentColor"/>
                                </svg>
                            </button>
                            <h2 className="text-xl font-semibold mb-2 mt-1.5">ОФЕРТА</h2>
                        </div>
                        <p className="mb-2">
                        Настоящее Соглашение («Соглашение») заключено [дата] между:
                        </p>

                        <p className="mb-2">
                        Сторона А: [ФИО / Название компании], расположенной по адресу: [адрес], именуемой в дальнейшем «Сторона А»;
                        </p>

                        <p className="mb-2">и</p>

                        <p className="mb-4">
                        Сторона Б: [ФИО / Название компании], расположенной по адресу: [адрес], именуемой в дальнейшем «Сторона Б».
                        </p>

                        <p className="mb-4">Совместно именуемые «Стороны».</p>

                        <h2 className="text-xl font-semibold mb-2">1. Предмет Соглашения</h2>
                        <p className="mb-4">
                        Настоящее Соглашение регулирует условия сотрудничества Сторон по вопросу: [описание предмета: оказание услуг, поставка товаров, партнёрство и т.д.].
                        </p>

                        <h2 className="text-xl font-semibold mb-2">2. Обязательства Стороны А</h2>
                            <ul className="list-disc list-inside mb-4 text-left">
                                <li>[Обязательство 1]</li>
                                <li>[Обязательство 2]</li>
                                <li>[Обязательство 3]</li>
                        </ul>

                        <h2 className="text-xl font-semibold mb-2">3. Обязательства Стороны Б</h2>
                            <ul className="list-disc list-inside mb-4 text-left">
                                <li>[Обязательство 1]</li>
                                <li>[Обязательство 2]</li>
                                <li>[Обязательство 3]</li>
                        </ul>

                        <h2 className="text-xl font-semibold mb-2">4. Срок действия</h2>
                        <p className="mb-4">
                        Соглашение вступает в силу с [дата начала] и действует до [дата окончания / до расторжения любой из Сторон с уведомлением за X дней].
                        </p>

                        <h2 className="text-xl font-semibold mb-2">5. Условия оплаты</h2>
                        <p className="mb-2">Сторона Б обязуется выплатить Стороне А [сумма, валюта, способ оплаты].</p>
                        <p className="mb-4">Оплата производится в течение [X] дней с момента получения счета.</p>

                        <h2 className="text-xl font-semibold mb-2">6. Конфиденциальность</h2>
                        <p className="mb-4">
                        Стороны обязуются сохранять конфиденциальность всей непубличной информации и не раскрывать её третьим лицам без письменного согласия другой Стороны.
                        </p>

                        <h2 className="text-xl font-semibold mb-2">7. Применимое право</h2>
                        <p className="mb-4">
                        Настоящее Соглашение регулируется и толкуется в соответствии с законодательством [указать юрисдикцию].
                        </p>

                        <h2 className="text-xl font-semibold mb-2">8. Урегулирование споров</h2>
                        <p className="mb-4">
                        Все споры, возникающие в рамках настоящего Соглашения, разрешаются [посредничеством / арбитражем / судом по юрисдикции].
                        </p>

                        <h2 className="text-xl font-semibold mb-2">9. Расторжение</h2>
                        <p className="mb-4">
                        Настоящее Соглашение может быть расторгнуто любой из Сторон с предварительным письменным уведомлением за [X дней].
                        </p>

                        <h2 className="text-xl font-semibold mb-2">10. Полнота соглашения</h2>
                        <p className="mb-4">
                        Настоящее Соглашение отражает полное понимание Сторон и заменяет все предыдущие устные или письменные договоренности.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
