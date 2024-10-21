// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';



const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

    return (
        <div>
            <h1>Carrito de Compras</h1>

            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.name} className="cart-item">
                                <img src={item.images[0]} alt={item.name} width="100" />
                                <div>
                                    <h2>{item.name}</h2>
                                    <p>Precio: ${parseFloat(item.price).toLocaleString('es-CO')}</p>
                                    <p>Cantidad: {item.quantity}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.name)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>

                    <button onClick={clearCart}>Vaciar Carrito</button>
                </div>
            )}
        </div>
    );
};

export default Cart;