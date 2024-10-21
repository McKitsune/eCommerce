import React from 'react';

const ProductList = ({ products }) => {
    return (
        <ul>
            {products.map((product, i) => (
                <li key={i}>{product.name}</li>
            ))}
        </ul>
    );
};

export default ProductList;
