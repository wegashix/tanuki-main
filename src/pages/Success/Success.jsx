import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import style from './Success.module.css'

export function Success() {
    return (
        <div className={style.wrapper}>
            <img src='/logo-tanukiii.png' alt='success' className={style.image} />
            <h3>Ваш заказ успешно оформлен!</h3>

            <Link to="/">
                <Button appearance="big">Сделать новый</Button>
            </Link>
        </div>
    );
}
