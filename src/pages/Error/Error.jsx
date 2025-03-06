import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import s from "./Error.module.scss"; // Подключаем стили

export default function Error() {
    return (
        <div className={s.errorPage}>
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={s.errorContainer}
            >
                <AlertTriangle size={64} className={s.icon} />
                <h1 className={s.title}>Ошибка</h1>
                <p className={s.message}>Что-то пошло не так. Попробуйте позже.</p>
                <button 
                    onClick={() => window.location.href = "/"}
                    className={s.button}
                >
                    На главную
                </button>
            </motion.div>
        </div>
    );
}
