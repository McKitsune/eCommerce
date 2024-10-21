// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);

    // Cargar el inventario desde localStorage cuando se monta el componente
    useEffect(() => {
        const storedInventory = JSON.parse(localStorage.getItem('inventoryItems'));
        if (storedInventory) {
            setInventory(storedInventory); // Carga desde localStorage
        } else {
            // Si no hay inventario en localStorage, inicializa con datos vacíos o predefinidos
            setInventory([]); // Puedes agregar inventario inicial aquí si es necesario
        }
    }, []);

    // Guardar el inventario en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('inventoryItems', JSON.stringify(inventory));
    }, [inventory]);

    const updateProductQuantity = (productName, quantityToReduce) => {
        setInventory((prevInventory) =>
            prevInventory.map((product) =>
                product.name === productName
                    ? { ...product, quantity: product.quantity - quantityToReduce }
                    : product
            )
        );
    };

    const addProduct = (product) => {
        setInventory([...inventory, product]);
    };

    return (
        <InventoryContext.Provider value={{ inventory, updateProductQuantity, addProduct }}>
            {children}
        </InventoryContext.Provider>
    );
};

InventoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};