import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import styles from './Menu.module.css';
import axios from 'axios';
import MenuList from './MenuList/MenuList';
import { useEffect, useState } from "react";

export default function Menu() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');

    const getMenu = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('/src/JSON/products.json');
            setTimeout(() => {
                if (data && Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setError('Нет Данных');
                }
                setIsLoading(false);
            }, 1000);
        } catch (e) {
            setIsLoading(false);
            setError('Ошибка при загрузке данных, проверьте соединение сети');
            console.error(e);
        }
    };

    useEffect(() => {
        getMenu();
    }, []);

    const filterProductsByName = (product, name) => {
        return product.title.toLowerCase().includes(name.toLowerCase());
    };

    const filterProductsByIngredients = (product, ingredients) => {
        return product.description.some(ingredient =>
            ingredient.toLowerCase().includes(ingredients.toLowerCase())
        );
    };

    const filteredProducts = products.filter(product =>
        filterProductsByName(product, filter) ||
        filterProductsByIngredients(product, filter)
    );

    const updateFilter = (e => {
        setFilter(e.target.value);
    });

    return (
        <>
            <div className={styles['head']}>
                <Heading>Меню</Heading>
                <div className={styles['input-wrapp']}>
                    <img src="/icon-search.svg" />
                    <Input placeholder="Введите блюдо или состав" onChange={updateFilter} />
                </div>
            </div>
    
            <div className={styles['container']}>
                {isLoading && <p>Загружаем...</p>}
                {!isLoading && error && <p>{error}</p>}
                {!isLoading && !error && (
                    <>
                      <h2 className={styles['popular-title']} style={{ marginTop: '20px' }}>Популярные блюда</h2>
                        <div className={styles['popular-container']}>
                            <MenuList products={filteredProducts.filter(product => product.category === 'popularni rolls')} />
                        </div>

                        <h2>Классические роллы</h2>
                       <div className={styles['cards-container']}>
  <MenuList products={filteredProducts.filter(product => product.category === 'classic rolls')} />
</div>

                        <h2 style={{ marginTop: '20px' }}>Маки роллы</h2>
                        <div className={styles['cards-container']}>
                            <MenuList products={filteredProducts.filter(product => product.category === 'maki rolls')} />
                        </div>

                        <h2 style={{ marginTop: '20px' }}>Фирменные роллы</h2>
                        <div className={styles['cards-container']}>
                            <MenuList products={filteredProducts.filter(product => product.category === 'firmeni rolls')} />
                        </div>
                    </>
                )}
                {!isLoading && filteredProducts.length === 0 && <p>Не найдено блюд по запросу</p>}
            </div>
        </>
    );
}