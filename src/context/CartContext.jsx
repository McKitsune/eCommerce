// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { InventoryContext } from './InventoryContext'; // Importamos el InventoryContext

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { updateProductQuantity } = useContext(InventoryContext); // Usamos el contexto del inventario

    // Al cargar el componente, intentamos obtener el carrito desde localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCart) {
            setCartItems(storedCart);
        }
    }, []);

    // Cada vez que el carrito cambie, lo guardamos en localStorage
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } else {
            localStorage.removeItem('cartItems'); // Limpiamos localStorage si el carrito está vacío
        }
    }, [cartItems]);

    const addToCart = (item, quantity) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.name === item.name);
            if (existingItem) {
                // Si el producto ya está en el carrito, actualizamos la cantidad
                return prevItems.map((i) =>
                    i.name === item.name ? { ...i, quantity: i.quantity + quantity } : i
                );
            }
            // Si el producto no está en el carrito, lo agregamos
            return [...prevItems, { ...item, quantity }];
        });

        // Reducir la cantidad del producto en el inventario
        updateProductQuantity(item.name, quantity);
    };

    const removeFromCart = (itemName) => {
        setCartItems((prevItems) => prevItems.filter(item => item.name !== itemName));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
