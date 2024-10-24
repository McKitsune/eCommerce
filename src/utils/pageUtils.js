const path = require('path');

// Ruta al directorio donde se crearán las páginas
const pagesDir = path.join(__dirname, '../src/pages');

const createCategoryPage = (category) => {
    const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    const pagePath = path.join(pagesDir, `${categoryCapitalized}Page.jsx`);

    const pageContent = `
        import React from 'react';

        const ${categoryCapitalized}Page = () => (
            <div>
                <h1>${categoryCapitalized}</h1>
                <p>Bienvenido a la categoría ${categoryCapitalized}</p>
            </div>
        );

        export default ${categoryCapitalized}Page;
    `;

    return { pagePath, pageContent: pageContent.trim() };
};

module.exports = { createCategoryPage };
