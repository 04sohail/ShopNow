import { api } from "../base_controller"

// FUNCTION TO GET ALL USERS COUNT
export const get_all_products_count = async () => {
    try {
        const response = await api.get("/admin/products/count");
        return response.data.data.product_count;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
// FUNCTION TO GET ALL ACTIVE PRODUCTS
export const get_all_active_products = async () => {
    try {
        const response = await api.get("/admin/active-products/");
        return response.data.data.active_product_count;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
// FUNCTION TO GET ALL ACTIVE PRODUCTS
export const get_all_in_active_products = async () => {
    try {
        const response = await api.get("/admin/inactive-products/");
        return response.data.data.inactive_product_count;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};