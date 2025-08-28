import { motion } from 'motion/react';
import background from "/images/bg-image.svg"
import { TextLoop } from '../../ui/text-loop';

export const Aside = ({ side = 'left' }) => {
    // анимация 
    const initialX = side === 'right' ? 200 : -200
    const exitX = side === 'right' ? -200 : 200;

    return (
        <motion.aside
            className="w-1/2 h-screen hidden lg:flex bg-main justify-center items-center relative"
            initial={{ x: initialX, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: exitX, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}>
                <img src={background} className="max-w-[700px] h-[475px] absolute"/>
                <TextLoop className="text-white bottom-0 mt-auto mb-10 font-atyp-medium text-center relative inline-block whitespace-nowrap">
                    <span>Ваши данные — ваша собственность.</span>
                    <span>Войдите, чтобы контролировать их.</span>
                </TextLoop>
        </motion.aside>
    )
}