// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//principales header y footer
import Header from './components/Header';
import Footer from './components/Footer';
// paginas de categorias
import HomePage from './components/HomePage'; 
import Deportes from './pages/Deportes';
import Hogar from './pages/Hogar';
import Herramientas from './pages/Herramientas';
import Tecnologia from './pages/Tecnologia';
//pagina de inventario
import InventoryPage from './components/InventoryPage';
import { InventoryProvider } from './context/InventoryContext'; 
//carrito de compras
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
//css
import './styles/App.css';


const App = () => {
    return (
        <InventoryProvider> {/* InventoryContext necesario para que CartContext pueda actualizar el inventario */}
            <CartProvider>
                <Router>
                    <div className="App">
                        <Header />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/inventory" element={<InventoryPage />} />
                            <Route path="/deportes" element={<Deportes />} />
                            <Route path="/hogar" element={<Hogar />} />
                            <Route path="/herramientas" element={<Herramientas />} />
                            <Route path="/tecnologia" element={<Tecnologia />} />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </InventoryProvider>
    );
};

export default App;
