export const getProductsByCategory = (categoryName) => {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.products : [];
};