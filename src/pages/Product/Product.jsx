import { useParams } from 'react-router-dom'
import style from './Product.module.css'
import { Link } from 'react-router-dom'
import Heading from '../../components/Heading/Heading'
import Button from '../../components/Button/Button'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from '../../context/cartContext'

export default function Product() {
    const { id } = useParams()
    const productId = Number(id)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { setCartItems } = useCart();

    useEffect(() => {
        fetchProduct()
    }, [id])

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get('/src/JSON/products.json');

            const selectedProduct = data.find((product) => product.id === productId);
            if (selectedProduct) {
                setProduct(selectedProduct)
            } else {
                setError('Продукт не найден')
            }
        }
        catch (e) {
            setError('Произошла ошибка при загрузке данных о продукте')
        }
        finally {
            setLoading(false)
        }
    }

    const addToCart = () => {
        const cartItems = localStorage.getItem('cartItems');
        const items = cartItems ? JSON.parse(cartItems) : {};

        if (items[productId]) {
            items[productId]++
        } else {
            items[productId] = 1
        }
        localStorage.setItem('cartItems', JSON.stringify(items))
        setCartItems(items)
    }

    if (loading) {
        return <p>Загрузка...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    if (product) {
        return <>
            <div className={style['header']}>
                <Link to="/">
                    <div className={style['icon-back']}>
                        <img src='/back-icon.svg' alt='Назад на главную' width='5' height='10' />
                    </div>
                </Link>
                <Heading>{product.title}</Heading>
                <Button className={style['cart']} appearence='big' onClick={addToCart}>
                    <img src='/cart-icon.svg' alt='В корзину' width='16' height='17' />
                    В корзину
                </Button>
            </div>

            <div className={style['layout']}>
                <img src={product.image} alt={product.title} width='310' height='255' />
                <div className={style['desc']}>
                    <div className={style['price']}>Цена:<span>{product.price} <b>₽</b></span></div>
                    <div className={style['rate']}>Рейтинг:<span>{product.rate}</span></div>
                    <div className={style['ingredients']}>
                        <h3>Состав</h3>
                        <ul>
                            {product.description.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    } else {
        return <p>Продукт не найден</p>
    }
}