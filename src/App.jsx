import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Componentes principales
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import InventoryPage from './components/InventoryPage';
import Cart from './components/Cart';
// Contextos
import { InventoryProvider } from './context/InventoryContext';
import { CartProvider } from './context/CartContext';
// CSS
import './styles/App.css';

// Configurar Amplify
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports'; // Archivo generado por Amplify
Amplify.configure(awsExports);

// App Component
function App() {
    const [categories, setCategories] = useState([]);

    // Cargar las categorías creadas dinámicamente desde el backend
    useEffect(() => {
        fetch('http://localhost:3001/api/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error al cargar categorías:', error));
    }, []);

    // Función para cargar dinámicamente la página de la categoría
    const loadCategoryPage = (category) => {
        try {
            const CategoryPage = React.lazy(() =>
                import(`./pages/${category.charAt(0).toUpperCase() + category.slice(1)}Page.jsx`)
            );
            return CategoryPage;
        } catch (error) {
            console.error(`Error cargando la página para ${category}:`, error);
            return null;
        }
    };

    return (
        <InventoryProvider>
            <CartProvider>
                <Router>
                    <div className="App">
                        <Header />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/inventory" element={<InventoryPage />} />
                            <Route path="/cart" element={<Cart />} />

                            {/* Cargar dinámicamente las páginas de categorías */}
                            {categories.map((category) => {
                                const CategoryPage = loadCategoryPage(category);

                                return (
                                    CategoryPage && (
                                        <Route
                                            key={category}
                                            path={`/${category.toLowerCase()}`}
                                            element={
                                                <Suspense fallback={<div>Cargando...</div>}>
                                                    <CategoryPage />
                                                </Suspense>
                                            }
                                        />
                                    )
                                );
                            })}
                        </Routes>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </InventoryProvider>
    );
}
 
export default App;
