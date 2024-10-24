//crea las paginas nuevas segun la categoria
import fs from 'fs';
import path from 'path';

const categoryName = process.argv[2];

const createCategoryPage = (categoryName) => {
    const categoryPageContent = `
import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/categorias.css'; // Importa los estilos

const ${categoryName}Page = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
        const category = storedCategories.find(cat => cat.name === '${categoryName}');
        setProducts(category ? category.products : []);
    }, []);

    return (
        <div>
            <h1>${categoryName}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>${parseFloat(product.price).toLocaleString()}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ${categoryName}Page;
    `;

    fs.writeFileSync(
        path.join(__dirname, `./pages/${categoryName}Page.jsx`),
        categoryPageContent
    );
};

if (categoryName) {
    createCategoryPage(categoryName);
} else {
    console.error("Por favor, proporciona un nombre de categoría.");
}
