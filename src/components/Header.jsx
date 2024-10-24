// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logos/Kitsune.svg';
import { FaHome, FaBoxOpen, FaShoppingCart, FaThList, FaCaretDown } from 'react-icons/fa';
import '../styles/header.css'; // Importamos el archivo CSS que creamos

const Header = () => {
    const [isSubmenuOpen, setSubmenuOpen] = useState(false);
    const submenuRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false); // Estado para manejar el scroll
    const [categories, setCategories] = useState([]); // Estado para las categorías

    // Cargar las categorías desde el backend
    useEffect(() => {
        fetch('http://localhost:3001/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error al cargar categorías:', error));
    }, []);

    const toggleSubmenu = () => {
        setSubmenuOpen(!isSubmenuOpen);
    };

    const handleClickOutside = (event) => {
        if (submenuRef.current && !submenuRef.current.contains(event.target)) {
            setSubmenuOpen(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 18) {
                setIsScrolled(true); // Si el desplazamiento es mayor a 18px, reducir el header
            } else {
                setIsScrolled(false); // Si no, volver al tamaño normal
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll); // Escuchar el evento de scroll

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll); // Limpiar el listener de scroll
        };
    }, []);

    return (
        <header className={isScrolled ? 'small-header' : ''}>
            <Link to="/" className="logo-link">
                <img src={logo} alt="Logo Mi eCommerce" className="logo" />
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="icon"><FaHome size={24} /></Link> {/* Icono Home */}
                    </li>
                    <li>
                        <Link to="/inventory" className="icon"><FaBoxOpen size={24} /></Link> {/* Icono Inventory */}
                    </li>
                    <li>
                        <Link to="/cart" className="icon"><FaShoppingCart size={24} /></Link> {/* Icono Cart */}
                    </li>
                    <li ref={submenuRef}>
                        <span className="icon" onClick={toggleSubmenu}>
                            <FaThList size={24} />
                            <FaCaretDown className="caret-icon" />
                        </span>
                        {isSubmenuOpen && (
                            <ul className="submenu">
                                {categories.map((category, index) => (
                                    <li key={index}>
                                        <Link to={`/${category.toLowerCase()}`} onClick={toggleSubmenu}>
                                            {category}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
