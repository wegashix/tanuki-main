import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Heading from '../../components/Heading/Heading'
import Input from '../../components/Input/Input'
import style from '../Login/Login.module.css'
import { useState } from 'react'

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        setError(null)
        e.preventDefault();

        const accessToken = generateToken();

        const newUser = {
            id: Math.floor(Math.random() * 100),
            email: formData.email,
            name: formData.name,
            password: formData.password,
            accessToken: accessToken
        }

        try {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userData', JSON.stringify(newUser));
            navigate('/');
        } catch (e) {
            setError('Ошибка регистрации пользователяб попробуйте снова')
            console.errror('Ошибка регистрации пользователя', e)
        }
    }

    const generateToken = () => {
        return Math.random().toString(36).substr(2);
    }

    return (
        <div className={style['login']}>
            <Heading>Регистрация</Heading>
            {error && <div className={style['error']}>{error}</div>}
            <form className={style['form']} onSubmit={handleSubmit}>
                <div className={style['field']}>
                    <label htmlFor='email'>Ваш email</label>
                    <Input id="email" name="email" placeholder="Email" onChange={handleChange} />
                </div>
                <div className={style['field']}>
                    <label htmlFor='password'>Ваш пароль</label>
                    <Input id="password" name="password" type="password" placeholder="Пароль" onChange={handleChange} />
                </div>
                <div className={style['field']}>
                    <label htmlFor='name'>Ваше Имя</label>
                    <Input id="name" name="name" type="text" placeholder="Имя" onChange={handleChange} />
                </div>
                <Button appearence='big'>Зарегистрироваться</Button>
            </form>
            <div className={style['links']}>
                <div>Есть аккаунт?</div>
                <Link to="/auth/login">Войти</Link>
            </div>
        </div>
    )
}