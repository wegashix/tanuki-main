import { createContext, useContext, useState } from "react";

const CartContext = createContext({
    cartItems: {},
    setCartItems: () => { }
})

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({})

    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    )
}