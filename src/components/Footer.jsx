// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../styles/footer.css'; // Asegúrate de que este archivo exista
import logo from '../assets/logos/Kitsune.svg'; // Importa el logo

const Footer = () => {
    return (
        <footer>
            <img src={logo} alt="Kitsune eCommerce" className="footer-logo" />
            <p>© {new Date().getFullYear()} Kitsune eCommerce. Todos los derechos reservados.</p>
            <p>
                <a href="/terms">Términos de Servicio</a> | 
                <a href="/privacy">Política de Privacidad</a>
            </p>
        </footer>
    );
};

export default Footer;
