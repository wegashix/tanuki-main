import ProductCard from "../../../components/ProductCard/ProductCard";
import styles from './MenuList.module.css'

export default function MenuList({ products }) {
    console.log(products);


    return <div className={styles['wrapper']}>
        {products.map(p => (
            <ProductCard
                key={p.id}
                id={p.id}
                price={p.price}
                title={p.title}
                description={p.description}
                image={p.image}
                rate={p.rate}
            />
        ))}
    </div>
}
