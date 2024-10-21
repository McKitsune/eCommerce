import React from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const CategoryList = ({ categories }) => {
    return (
        <div>
            {categories.map((category, index) => (
                <div key={index}>
                    <h2>{category.name}</h2>
                    <ProductForm category={category} />
                    <ProductList products={category.products} />
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
