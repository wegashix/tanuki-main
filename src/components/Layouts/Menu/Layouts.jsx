import styles from "./Layouts.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import cn from "classnames";
import { useState, useEffect } from "react";
import { useCart } from "../../../context/cartContext";

export function Layout() {

  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Состояние для открытия/закрытия панели

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
    setCartItems(storedCartItems);
  }, [setCartItems]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData') || 'null');
    setUserData(user);
  }, []);

  useEffect(() => {
    const totalCount = Object.values(cartItems).reduce((acc, cur) => acc + cur, 0);
    setCartItemsCount(totalCount);
  }, [cartItems]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    navigate('/auth/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState); // Переключаем состояние панели
  };

  return (
    <div className={styles["layout"]}>
      <div className={cn(styles["sidebar"], { [styles.open]: isSidebarOpen })}>
        <div className={styles["user"]}>
          <img
            className={styles["avatar"]}
            src={userData?.img ? userData.img : "/avatar-img.png"}
            alt="Аватар пользователя"
          />
          <b className={styles["name"]}>{userData?.name ? userData.name : 'userName'}</b>
          <p className={styles["email"]}>{userData?.email ? userData.email : 'email'}</p>
        </div>

        <div className={styles["menu"]}>
          <NavLink
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles.active]: isActive,
              })
            }
            to="/"
          >
            <img src="/menu2.png" alt="Иконка меню" width={23} height={23} />
            Меню
          </NavLink>

          <NavLink className={({ isActive }) => cn(styles["link"], {
            [styles.active]: isActive,
          })} to="/cart">
            <img src="/cart-icon.svg" alt="Иконка корзины" />
            Корзина <span className={styles['add-to-cart']}>{cartItemsCount}</span>
          </NavLink>
          <NavLink className={({ isActive }) => cn(styles["link"], {
            [styles.active]: isActive,
          })} to="/about-us">
            <img className={styles["aboutUs"]} src="/aboutUs2.png" alt="Иконка о нас" />
            О нас
          </NavLink>
        </div>

        <Button className={styles["exit"]} onClick={handleLogout}>
          <img src="/exit-icon.svg" alt="icon exit" width="26" height="26" />
          Exit
        </Button>
      </div>

      <div className={styles['content']}>
        <Outlet />
      </div>

      {/* Кнопка для открытия/закрытия боковой панели на мобильных устройствах */}
      <div className={styles["menu-toggle"]} onClick={toggleSidebar}>
        <img src="/menu-icon.svg" alt="Меню" width={30} height={30} />
      </div>
    </div>
  );
}
