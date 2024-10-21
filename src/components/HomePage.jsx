// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { getProductsByCategory } from '../components/InventoryPage';
import { FaFire, FaClock, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importamos Link para redirigir
import '../styles/homepage.css'; // Importamos el archivo CSS

const HomePage = () => {
    const [randomDeportes, setRandomDeportes] = useState(null);
    const [randomHerramientas, setRandomHerramientas] = useState(null);
    const [randomHogar, setRandomHogar] = useState(null);
    const [randomTecnologia, setRandomTecnologia] = useState(null);

    useEffect(() => {
        const deportesItems = getProductsByCategory('Deportes');
        const herramientasItems = getProductsByCategory('Herramientas');
        const hogarItems = getProductsByCategory('Hogar');
        const tecnologiaItems = getProductsByCategory('Tecnología');

        

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
            const randomProduct = tecnologiaItems[Math.floor(Math.random() * tecnologiaItems.length)];
            setRandomTecnologia(randomProduct);
            console.log('Producto aleatorio de Tecnología:', randomProduct);
        }
    }, []);

    return (
        <div className="homepage-container">
            {/* Box con los tres círculos */}
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

            {/* Productos destacados en 3 columnas */}
            <div className="product-grid">
                {randomDeportes && (
                    <Link to="/deportes" className="product-highlight">
                        <h2>Deportes</h2>
                        <img src={randomDeportes.images[0]} alt={randomDeportes.name} />
                        <p>{randomDeportes.name}</p>
                    </Link>
                )}

                {randomHerramientas && (
                    <Link to="/herramientas" className="product-highlight">
                        <h2>Herramientas</h2>
                        <img src={randomHerramientas.images[0]} alt={randomHerramientas.name} />
                        <p>{randomHerramientas.name}</p>
                    </Link>
                )}

                {randomHogar && (
                    <Link to="/hogar" className="product-highlight">
                        <h2>Hogar</h2>
                        <img src={randomHogar.images[0]} alt={randomHogar.name} />
                        <p>{randomHogar.name}</p>
                    </Link>
                )}

                {randomTecnologia && (
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
