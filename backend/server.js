const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // En caso de que lo necesites para la comunicación con el frontend

const app = express();
app.use(express.json()); // Asegúrate de que el servidor pueda procesar JSON
app.use(cors()); // Habilita CORS si tu frontend está en un dominio diferente

// Función para crear una página de categoría
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

    // Escribir el archivo JSX en el directorio de páginas
    const filePath = path.join(__dirname, `../src/pages/${categoryName}Page.jsx`);
    fs.writeFileSync(filePath, categoryPageContent);
    console.log(`Página ${categoryName}Page.jsx creada exitosamente en ${filePath}`);
};

// Ruta para manejar la solicitud de creación de una nueva página de categoría
app.post('/create-category-page', (req, res) => {
    const { categoryName } = req.body;

    if (!categoryName) {
        return res.status(400).send("El nombre de la categoría es requerido.");
    }

    // Llama a la función para crear la página
    try {
        createCategoryPage(categoryName);
        res.status(200).send(`Página de categoría ${categoryName} creada exitosamente.`);
    } catch (error) {
        console.error('Error al crear la página:', error);
        res.status(500).send('Error al crear la página.');
    }
});

// Iniciar el servidor en el puerto 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
