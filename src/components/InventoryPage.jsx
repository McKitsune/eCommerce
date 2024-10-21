import React, { useEffect, useState } from "react";
import "../styles/InventoryPage.css";
import { FiEdit3 } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";

const InventoryPage = () => {
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

    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        setCategories(storedCategories);
    }, []);

    const handleAddCategory = () => {
        if (newCategory) {
            const updatedCategories = [
                ...categories,
                { name: newCategory, products: [] },
            ];
            setCategories(updatedCategories);
            localStorage.setItem("categories", JSON.stringify(updatedCategories));
            setNewCategory("");
        }
    };

    const handleEditCategory = (categoryName) => {
        setEditingCategory(categoryName);
        setNewCategory(categoryName);
    };

    const handleUpdateCategory = () => {
        const updatedCategories = categories.map((category) =>
            category.name === editingCategory
                ? { ...category, name: newCategory }
                : category
        );
        setCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
        setEditingCategory(null);
        setNewCategory("");
    };

    const handleDeleteCategory = (categoryName) => {
        const updatedCategories = categories.filter(
            (category) => category.name !== categoryName
        );
        setCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
    };

    const handleAddOrUpdateProduct = () => {
        const price = parseFloat(newProductPrice);
        if (newProduct && selectedCategory && !isNaN(price) && newProductQuantity) {
            const updatedCategories = categories.map((category) => {
                if (category.name === selectedCategory) {
                    const updatedProducts = editingProduct
                        ? category.products.map((product) =>
                            product.name === editingProduct.name
                                ? {
                                    name: newProduct,
                                    description: newProductDescription,
                                    price,
                                    quantity: newProductQuantity,
                                    images: productImages[newProduct] || [],
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
                                images: productImages[newProduct] || [],
                            },
                        ];

                    return { ...category, products: updatedProducts };
                }
                return category;
            });

            setCategories(updatedCategories);
            localStorage.setItem("categories", JSON.stringify(updatedCategories));
            resetForm();
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        const promises = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        });

        Promise.all(promises)
            .then(images => {
                setProductImages((prev) => ({
                    ...prev,
                    [newProduct]: images,
                }));
            })
            .catch(error => {
                console.error("Error al convertir la imagen a Base64", error);
            });
    };

    const resetForm = () => {
        setNewProduct("");
        setNewProductDescription("");
        setNewProductPrice("");
        setNewProductQuantity("");
        setEditingProduct(null);
        setProductImages({});
    };

    const handleEditProduct = (product) => {
        setNewProduct(product.name);
        setNewProductDescription(product.description);
        setNewProductPrice(product.price.toString());
        setNewProductQuantity(product.quantity);
        setEditingProduct(product);
        setSelectedCategory(product.category);
        setProductImages({ [product.name]: product.images });
    };

    const handleDeleteProduct = (categoryName, productName) => {
        const updatedCategories = categories.map((category) => {
            if (category.name === categoryName) {
                return {
                    ...category,
                    products: category.products.filter(
                        (product) => product.name !== productName
                    ),
                };
            }
            return category;
        });

        setCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
    };

    const renderProducts = (products, categoryName) => {
        return products.map((product, index) => (
            <tr key={index}>
                <td className="select-column">
                    <input
                        type="radio"
                        name="selectedProduct"
                        value={product.name}
                        checked={selectedProduct === product.name}
                        onChange={() => setSelectedProduct(product.name)}
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
                            <button
                                onClick={() =>
                                    handleEditProduct({ ...product, category: categoryName })
                                }
                            >
                                <FiEdit3 />
                            </button>
                            <button
                                onClick={() => handleDeleteProduct(categoryName, product.name)}
                            >
                                <LuTrash2 />
                            </button>
                        </>
                    )}
                </td>
            </tr>
        ));
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setNewProductPrice(value);
        }
    };

    return (
        <div>
            <h1>Gestión de Productos y Categorías</h1>

            <div>
                <h2>Agregar Categoría</h2>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
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

            <h2>Agregar Producto</h2>
            <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
            >
                <option value="">Selecciona una categoría</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
            {selectedCategory && (
                <>
                    <input
                        type="text"
                        value={newProduct}
                        onChange={(e) => setNewProduct(e.target.value)}
                        placeholder="Nombre del producto"
                    />
                    <input
                        type="text"
                        value={newProductDescription}
                        onChange={(e) => setNewProductDescription(e.target.value)}
                        placeholder="Descripción del producto"
                    />
                    <input
                        type="text"
                        value={newProductPrice}
                        onChange={handlePriceChange}
                        placeholder="Precio"
                    />
                    <input
                        type="number"
                        value={newProductQuantity}
                        onChange={(e) => setNewProductQuantity(e.target.value)}
                        placeholder="Cantidad"
                    />
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <button onClick={handleAddOrUpdateProduct}>
                        {editingProduct ? "Actualizar Producto" : "Agregar Producto"}
                    </button>
                </>
            )}

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

export const getProductsByCategory = (categoryName) => {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.products : [];
};

export default InventoryPage;
