// components/CategoryPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { getProductsByCategory } from './InventoryPage';
import { useNavigate } from 'react-router-dom';

const CategoryPage = ({ categoryName }) => {
    const { addToCart } = useContext(CartContext);
    const [items, setItems] = useState([]);
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const navigate = useNavigate();

    // Cargar productos de la categoría al montar el componente
    useEffect(() => {
        const products = getProductsByCategory(categoryName);
        setItems(products);
    }, [categoryName]);

    const handleQuantityChange = (event, productName) => {
        setSelectedQuantities({
            ...selectedQuantities,
            [productName]: event.target.value
        });
    };

    const handleAddToCart = (item) => {
        const quantity = parseInt(selectedQuantities[item.name]) || 1;

        if (quantity > item.quantity) {
            alert("No hay suficiente inventario disponible");
            return;
        }

        // Reducir la cantidad en el inventario local
        const updatedItems = items.map((product) => {
            if (product.name === item.name) {
                return { ...product, quantity: product.quantity - quantity };
            }
            return product;
        });

        setItems(updatedItems); // Actualizamos el inventario local
        addToCart(item, quantity);

        alert(`Producto "${item.name}" agregado al carrito con cantidad: ${quantity}`);
    };

    return (
        <div>
            <h1>Productos de {categoryName}</h1>
            <div className="product-list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.name} className="product-item">
                            {item.images.length > 0 ? (
                                <img src={item.images[0]} alt={item.name} />
                            ) : (
                                <img src="ruta/por/defecto.jpg" alt="Imagen no disponible" />
                            )}
                            <h2>{item.name}</h2>
                            <p>Descripción: <br />{item.description}</p>
                            <p>Precio: ${parseFloat(item.price).toLocaleString("es-CO")}</p>
                            <p>Cantidad disponible: {item.quantity}</p>

                            <input
                                type="number"
                                min="1"
                                max={item.quantity}
                                value={selectedQuantities[item.name] || 1}
                                onChange={(event) => handleQuantityChange(event, item.name)}
                            />

                            <button onClick={() => handleAddToCart(item)} className="add-to-cart-btn">
                                🛒
                            </button>
                        </div>
                    ))
                ) : (
                    <h3>Pronto tendremos más productos para ti</h3>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
