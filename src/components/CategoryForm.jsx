import React, { useState } from 'react';

const CategoryForm = ({ addCategory }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryName) {
            addCategory({ name: categoryName, products: [] });
            setCategoryName('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={categoryName} 
                onChange={(e) => setCategoryName(e.target.value)} 
                placeholder="Nombre de la categoría" 
            />
            <button type="submit">Agregar Categoría</button>
        </form>
    );
};

export default CategoryForm;
