import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'
import { useCart } from '../../context/cartContext'

export default function ProductCard(props) {
    const { setCartItems } = useCart();

    const productId = props.id;

    const addToCart = (e) => {
        e.preventDefault();
        const cartItems = localStorage.getItem('cartItems');
        const items = cartItems ? JSON.parse(cartItems) : {};

        if (items[productId]) {
            items[productId]++
        } else {
            items[productId] = 1
        }
        localStorage.setItem('cartItems', JSON.stringify(items));
        setCartItems(items)
    }

    return (
        <Link to={`/product/${props.id}`} className={styles['link']}>
            <div className={styles['card']}>
                <div className={styles['head']} style={{ backgroundImage: `url('${props.image}')` }}>

                    <div className={styles['price']}>
                        {props.price}&nbsp;
                        <span className={styles['currency']}>₽</span>
                    </div>

                    <button className={styles['add-to-card']} onClick={addToCart}>
                        <img src='/add-to-card.svg' alt='add-to-card' width="17" height="17" />
                    </button>

                    <div className={styles['rating']}>
                        {props.rate}&nbsp;
                        <img src='/star.svg' width="10" height="10" alt='rating' />
                    </div>

                </div>

                <div className={styles['footer']}>
                    <h3 className={styles['title']}>{props.title}</h3>
                    <p className={styles['description']}>{props.description.join(', ')}</p>
                </div>
            </div>
        </Link>
    )

}