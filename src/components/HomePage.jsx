// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { FaFire, FaClock, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';

// Simulación de productos para cada categoría
const getProductsByCategory = (category) => {
    const allProducts = [
        { category: 'Deportes', name: 'Balón de fútbol', images: ['path_to_image1'] },
        { category: 'Herramientas', name: 'Martillo', images: ['path_to_image2'] },
        { category: 'Hogar', name: 'Sofá', images: ['path_to_image3'] },
        { category: 'Tecnología', name: 'Smartphone', images: ['path_to_image4'] }
    ];
    return allProducts.filter(product => product.category === category);
};

const HomePage = () => {
    const [randomDeportes, setRandomDeportes] = useState(null);
    const [randomHerramientas, setRandomHerramientas] = useState(null);
    const [randomHogar, setRandomHogar] = useState(null);
    const [randomTecnologia, setRandomTecnologia] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const deportesItems = await getProductsByCategory('Deportes');
            const herramientasItems = await getProductsByCategory('Herramientas');
            const hogarItems = await getProductsByCategory('Hogar');
            const tecnologiaItems = await getProductsByCategory('Tecnología');

            if (deportesItems.length > 0) {
                setRandomDeportes(deportesItems[Math.floor(Math.random() * deportesItems.length)]);
            }
            if (herramientasItems.length > 0) {
                setRandomHerramientas(herramientasItems[Math.floor(Math.random() * herramientasItems.length)]);
            }
            if (hogarItems.length > 0) {
                setRandomHogar(hogarItems[Math.floor(Math.random() * hogarItems.length)]);
            }
            if (tecnologiaItems.length > 0) {
                setRandomTecnologia(tecnologiaItems[Math.floor(Math.random() * tecnologiaItems.length)]);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="homepage-container">
            <div className="box">
                <div className="circle-container">
                    <div className="circle">
                        <FaFire className="icon" />
                    </div>
                    <p className="circle-text">Hot Sales</p>
                </div>

                <div className="circle-container">
                    <div className="circle">
                        <FaClock className="icon" />
                    </div>
                    <p className="circle-text">Solo por Hoy</p>
                </div>

                <div className="circle-container">
                    <div className="circle">
                        <FaStar className="icon" />
                    </div>
                    <p className="circle-text">Lo Más Vendido</p>
                </div>
            </div>

            <div className="product-grid">
                {randomDeportes && randomDeportes.images && (
                    <Link to="/deportes" className="product-highlight">
                        <h2>Deportes</h2>
                        <img src={randomDeportes.images[0]} alt={randomDeportes.name} />
                        <p>{randomDeportes.name}</p>
                    </Link>
                )}

                {randomHerramientas && randomHerramientas.images && (
                    <Link to="/herramientas" className="product-highlight">
                        <h2>Herramientas</h2>
                        <img src={randomHerramientas.images[0]} alt={randomHerramientas.name} />
                        <p>{randomHerramientas.name}</p>
                    </Link>
                )}

                {randomHogar && randomHogar.images && (
                    <Link to="/hogar" className="product-highlight">
                        <h2>Hogar</h2>
                        <img src={randomHogar.images[0]} alt={randomHogar.name} />
                        <p>{randomHogar.name}</p>
                    </Link>
                )}

                {randomTecnologia && randomTecnologia.images && (
                    <Link to="/tecnologia" className="product-highlight">
                        <h2>Tecnología</h2>
                        <img src={randomTecnologia.images[0]} alt={randomTecnologia.name} />
                        <p>{randomTecnologia.name}</p>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HomePage;
