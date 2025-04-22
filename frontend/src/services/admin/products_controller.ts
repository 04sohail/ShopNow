import { ProductDetailsBody } from "../../types/types";
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
// FUNCTION TO GET ALL PRODUCTS
export const get_all_products = async () => {
    try {
        const response = await api.get(`admin/products/all`);
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
// FUNCTION TO DELETE PRODUCT BY ID
export const delete_product_by_id = async (id: number) => {
    try {
        const response = await api.delete(`admin/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};
// FUNCTION TO ADD NEW PRODUCT
export const add_new_product = async (data: ProductDetailsBody) => {
    try {
        const response = await api.post(`admin/products/create`, data);
        return response.status;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};
