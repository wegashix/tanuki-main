import Heading from "../../components/Heading/Heading"
import style from './Cart.module.css'
import Input from '../../components/Input/Input'
import { Link } from 'react-router-dom'
import Button from "../../components/Button/Button"
import { useCart } from '../../context/cartContext'
import { useState, useEffect } from "react"
import axios from 'axios'
import { useRef } from "react"

const deliveryCost = 169;

export default function Cart() {

    const inputRef = useRef();

    const { cartItems, setCartItems } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);
    const [product, setProduct] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [isPromoVisible, setIsPromoVisible] = useState(false);
    const [isPromoAppliedVisible, setIsPromoAppliesVisible] = useState(false);
    const [promoCodeApplied, setPromoCodeApplied] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({})

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData') || '{}');
        setUser(user);
    }, [])

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
        setCartItems(storedCartItems)
    }, [setCartItems])

    const updateCartItems = (productId, amount) => {
        const updatedCartItems = { ...cartItems }
        updatedCartItems[productId] = Math.max(0, amount);

        if (updatedCartItems[productId] === 0) {
            delete updatedCartItems[productId]
        }

        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get('/src/JSON/products.json');
            if (data) {
                setProduct(data)
            } else {
                setError('Продукт не найден')
            }
        }
        catch (e) {
            setError('Произошла ошибка при загрузке данных о продукте')
        }

    }

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (const productId in cartItems) {
            const currentProduct = product.find(item => item.id === parseInt(productId, 10))
            if (currentProduct) {
                totalPrice += currentProduct.price * cartItems[productId]
            }
        }

        totalPrice += deliveryCost;
        setTotalPrice(totalPrice)
    }

    useEffect(() => {

        if (product.length > 0) {
            calculateTotalPrice();
        }

    }, [cartItems, product])

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    }

    const applyPromoCode = () => {

        if(!promoCode) return

        if (promoCodeApplied) {
            setIsPromoAppliesVisible(true);
            setTimeout(hidePromoMessages, 3000);
            setPromoCode('')
            return;
        }

        if (promoCode === user.promoCode) {
            setTotalPrice(Math.floor(totalPrice * 0.8));
            setPromoCodeApplied(true);
            setPromoCode('')
            setTimeout(hidePromoMessages, 3000);
        } else {
            setIsPromoVisible(true)
            setPromoCode('')
            setTimeout(hidePromoMessages, 3000);
        }

        inputRef.current.value = ''
    }

    const hidePromoMessages = () => {
        setIsPromoAppliesVisible(false);
        setIsPromoVisible(false);
    }

    return (
        <>
            <Heading>Корзина</Heading>

            {Object.keys(cartItems).length === 0 ? (
                <div>
                    <p>Товаров нет в корзине</p>
                    <Link to='/'>Выбрать товар</Link>
                </div>
            ) : (<>

                <div className={style['products']}>

                    {Object.keys(cartItems).map(productId => {
                        const currentProduct = product.find(item => item.id === parseInt(productId, 10))
                        if (!currentProduct) return null;

                        return (
                            <div className={style['product']} key={productId}>
                                <img src={currentProduct.image} width='85' height='85' alt={currentProduct.title} />
                                <div className={style['product__desc']}>
                                    <h3>{currentProduct.title}</h3>
                                    <span className={style['product__price']}>{currentProduct.price} ₽</span>
                                </div>
                                <div className={style['product__buttons']}>
                                    <button className={style['decrement']} onClick={() => updateCartItems(productId, cartItems[productId] - 1)}>
                                        -
                                    </button>
                                    <span className={style['amount']}>{cartItems[productId]}</span>
                                    <button className={style['increment']} onClick={() => updateCartItems(productId, cartItems[productId] + 1)}>
                                        +
                                    </button>
                                    <button className={style['delete-btn']} onClick={() => updateCartItems(productId, 0)}>
                                        x
                                    </button>
                                </div>
                            </div>
                        )
                    })}

                </div>


                <div className={style['promo']}>
                    <label htmlFor="promo">
                        {isPromoVisible && <span>Такого промокода нет</span>}
                        {isPromoAppliedVisible && <span>Промокод уже использован</span>}
                        <Input className={style['promo__input']} ref={inputRef} id='promo' type='text' placeholder='промокод' value={promoCode} onChange={handlePromoCodeChange} />
                        <Button className={style['promo__btn']} onClick={applyPromoCode}>Применить</Button>
                    </label>
                </div>

                <div className={style['end']}>
                    <div className={style['row']}><h5>Итог</h5><span>{totalPrice} ₽</span></div>
                    <div className={style['row']}><h5>Доставка</h5><span>{deliveryCost} ₽</span></div>
                    <div className={style['row']}><h5>Общий итог</h5><span>{deliveryCost + totalPrice} ₽</span></div>
                </div>

                <Link to='/success'>
                    <Button appearence='big'>Офоромить</Button>
                </Link>
            </>)}


        </>
    )
}