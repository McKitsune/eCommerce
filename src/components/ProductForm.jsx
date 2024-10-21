import React, { useState } from 'react';

const ProductForm = ({ category }) => {
    const [productName, setProductName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productName) {
            category.products.push({ name: productName });
            setProductName('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={productName} 
                onChange={(e) => setProductName(e.target.value)} 
                placeholder="Nombre del producto" 
            />
            <button type="submit">Agregar Producto</button>
        </form>
    );
};

export default ProductForm;
