import React, { useEffect, useState } from "react";
import "../styles/inventoryPage.css";
import { FiEdit3 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";

const InventoryPage = () => {
    // Estado para almacenar categorías y productos
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [editingCategory, setEditingCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newProduct, setNewProduct] = useState("");
    const [newProductDescription, setNewProductDescription] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductQuantity, setNewProductQuantity] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [productImages, setProductImages] = useState({});

    // Efecto para cargar las categorías desde el almacenamiento local
    useEffect(() => {
        const storedCategories = localStorage.getItem("categories");

        // Verifica si el valor está presente y si es un JSON válido
        if (storedCategories) {
            try {
                const parsedCategories = JSON.parse(storedCategories);
                console.log('Categorías desde localStorage:', parsedCategories);
                setCategories(parsedCategories);
            } catch (error) {
                console.error('Error al parsear las categorías de localStorage:', error);
                setCategories([]);
            }
        } else {
            console.log('No se encontraron categorías en localStorage, inicializando con un array vacío.');
            setCategories([]);
        }

        // Puedes eliminar la llamada al backend si solo trabajas con localStorage o asegurarte de que el backend no interfiera con los datos del frontend
    }, []);

    // Función para obtener productos por categoría desde localStorage
    const getProductsByCategory = (categoryName) => {
        const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        const category = storedCategories.find(cat => cat.name === categoryName);
        return category ? category.products : [];
    };

    // Función para agregar una nueva categoría
    const handleAddCategory = () => {
        if (newCategory) {
            const updatedCategories = [
                ...categories,
                { name: newCategory, products: [] },  // Agrega una nueva categoría vacía
            ];

            setCategories(updatedCategories);
            localStorage.setItem("categories", JSON.stringify(updatedCategories));  // Guarda en localStorage
            setNewCategory("");
            console.log('Categorías actualizadas y guardadas en localStorage:', updatedCategories);
        }
    };

    // Función para actualizar una categoría
    const handleUpdateCategory = () => {
        const updatedCategories = categories.map((category) =>
            category.name === editingCategory
                ? { ...category, name: newCategory }  // Actualiza el nombre de la categoría
                : category
        );
        setCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));  // Actualiza el almacenamiento local
        setEditingCategory(null);  // Finaliza el modo de edición
        setNewCategory("");
        console.log('Categorías actualizadas después de la edición:', updatedCategories);
    };

    // Función para eliminar una categoría
    const handleDeleteCategory = (categoryName) => {
        const updatedCategories = categories.filter(
            (category) => category.name !== categoryName  // Elimina la categoría seleccionada
        );
        setCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));  // Actualiza el almacenamiento local
        console.log(`Categoría ${categoryName} eliminada. Categorías restantes:`, updatedCategories);
    };

    // Función para agregar o actualizar un producto
    const handleAddOrUpdateProduct = () => {
        const price = parseFloat(newProductPrice);
        if (newProduct && selectedCategory && !isNaN(price) && newProductQuantity) {
            const updatedCategories = categories.map((category) => {
                if (category.name === selectedCategory) {
                    const updatedProducts = editingProduct
                        ? category.products.map((product) =>
                            product.name === editingProduct.name
                                ? {
                                    ...product,
                                    name: newProduct,
                                    description: newProductDescription,
                                    price,
                                    quantity: newProductQuantity,
                                    images: productImages[newProduct] || [],  // Actualiza las imágenes del producto
                                }
                                : product
                        )
                        : [
                            ...(category.products || []),
                            {
                                name: newProduct,
                                description: newProductDescription,
                                price,
                                quantity: newProductQuantity,
                                images: productImages[newProduct] || [],  // Agrega un nuevo producto con imágenes
                            },
                        ];

                    return { ...category, products: updatedProducts };
                }
                return category;
            });

            setCategories(updatedCategories);
            localStorage.setItem("categories", JSON.stringify(updatedCategories));  // Guarda las actualizaciones en localStorage
            console.log('Productos actualizados en la categoría:', updatedCategories);
            resetForm();  // Reinicia el formulario
        }
    };

    // Función para reiniciar el formulario después de agregar o actualizar un producto
    const resetForm = () => {
        setNewProduct("");
        setNewProductDescription("");
        setNewProductPrice("");
        setNewProductQuantity("");
        setEditingProduct(null);
        setProductImages({});
    };

    // Renderiza los productos de una categoría
    const renderProducts = (products, categoryName) => {
        return products.map((product, index) => (
            <tr key={index}>
                <td className="select-column">
                    <input
                        type="radio"
                        name="selectedProduct"
                        value={product.name}
                        checked={selectedProduct === product.name}
                        onChange={() => setSelectedProduct(product.name)}  // Selecciona el producto
                    />
                </td>
                <td className="category-column">{categoryName}</td>
                <td className="name-column">{product.name}</td>
                <td className="description-column">{product.description}</td>
                <td className="price-column">${parseFloat(product.price).toLocaleString("es-CO")}</td>
                <td className="quantity-column">{product.quantity}</td>
                <td className="image-column">
                    {product.images && product.images.length > 0 && (
                        <div style={{ display: "flex", gap: "2px" }}>
                            {product.images.map((image, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    src={image}
                                    alt={product.name}
                                    style={{ width: "25px", height: "25px" }}
                                />
                            ))}
                        </div>
                    )}
                </td>
                <td className="action-column">
                    {selectedProduct === product.name && (
                        <>
                            <button onClick={() => handleEditProduct({ ...product, category: categoryName })}>
                                <FiEdit3 />
                            </button>
                            <button onClick={() => handleDeleteProduct(categoryName, product.name)}>
                                <LuTrash2 />
                            </button>
                        </>
                    )}
                </td>
            </tr>
        ));
    };

    return (
        <div>
            <h1>Gestión de Productos y Categorías</h1>

            <div>
                <h2>Agregar Categoría</h2>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}  // Maneja el cambio del nombre de la categoría
                    placeholder="Nombre de la categoría"
                />
                {editingCategory ? (
                    <button onClick={handleUpdateCategory}>Actualizar Categoría</button>
                ) : (
                    <button onClick={handleAddCategory}>Agregar Categoría</button>
                )}
            </div>

            <h2>Categorías</h2>
            <table>
                <thead>
                    <tr>
                        <th className="select-column">Seleccionar</th>
                        <th className="category-column">Categoría</th>
                        <th className="action-column">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={index}>
                            <td className="select-column">
                                <input
                                    type="radio"
                                    name="selectedCategory"
                                    value={category.name}
                                    checked={editingCategory === category.name}
                                    onChange={() => handleEditCategory(category.name)}
                                />
                            </td>
                            <td className="category-column">{category.name}</td>
                            <td className="action-column">
                                {editingCategory === category.name && (
                                    <>
                                        <button onClick={() => handleEditCategory(category.name)}>
                                            <FiEdit3 />
                                        </button>
                                        <button onClick={() => handleDeleteCategory(category.name)}>
                                            <LuTrash2 />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Productos</h2>
            <table>
                <thead>
                    <tr>
                        <th className="select-column">Seleccionar</th>
                        <th className="category-column">Categoría</th>
                        <th className="name-column">Item</th>
                        <th className="description-column">Descripción</th>
                        <th className="price-column">Precio</th>
                        <th className="quantity-column">Cantidad</th>
                        <th className="image-column">Imagen</th>
                        <th className="action-column">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <React.Fragment key={index}>
                            {renderProducts(category.products || [], category.name)}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryPage;
