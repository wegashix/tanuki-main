import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Heading from '../../components/Heading/Heading'
import Input from '../../components/Input/Input'
import style from './Login.module.css'
import axios from 'axios'
import { useState } from 'react'

export default function Login() {

    const [error, setError] = useState(null);
    const [loading, isLoading] = useState(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError(null)
        try {
            isLoading(true)
            const { data } = await axios.get('/src/JSON/users.json');
            const target = e.target;
            const { email, password } = target;

            const user = data.find((user) => user.email === email.value && user.password === password.value);

            if (user) {
                isLoading(false)
                localStorage.setItem('accessToken', user.accessToken);
                localStorage.setItem('userData', JSON.stringify(user));
                navigate('/')
            } else {
                setError('Неправильный логин или пароль');
                isLoading(false)
            }

        } catch (e) {
            setError('Ошибка при загрузке данных, проверьте соединение сети');
            console.error(e);
        }
    }

    return (
        <div className={style['login']}>
            <Heading>Вход</Heading>
            {error && <div className={style['error']}>{error}</div>}
            <form className={style['form']} onSubmit={submit}>
                <div className={style['field']}>
                    <label htmlFor='email'>Ваш email</label>
                    <Input id="email" name="email" placeholder="Email" />
                </div>
                <div className={style['field']}>
                    <label htmlFor='password'>Ваш пароль</label>
                    <Input id="password" name="password" type="password" placeholder="Пароль" />
                </div>
                <Button appearence='big'>Вход</Button>
                {loading && <span>{loading}</span>}
            </form>
            <div className={style['links']}>
                <div>Нет аккаунта?</div>
                <Link to="/auth/register">Зарегистрироваться</Link>
            </div>
        </div>
    )
}