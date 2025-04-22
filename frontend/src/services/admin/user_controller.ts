import { AdminUserRegistration, AdminUserUpdate } from "../../types/types";
import { api } from "../base_controller"


// FUNCTION TO GET ALL USERS
export const get_all_users = async () => {
    try {
        const response = await api.get("/admin/users/all");
        return response.data.data.users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

// FUNCTION TO GET ALL USERS COUNT
export const get_all_users_count = async () => {
    try {
        const response = await api.get("/admin/users/count");
        return response.data.data.user_count;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
// FUNCTION TO GET ALL ACTIVE USERS
export const get_all_active_users = async () => {
    try {
        const response = await api.get("/admin/active-users");
        return response.data.data.active_user_count;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
// FUNCTION TO GET ALL INACTIVE USERS
export const get_all_in_active_users = async () => {
    try {
        const response = await api.get("/admin/inactive-users");
        return response.data.data.in_active_user_count;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
// FUNCTION TO DELETE USER BY ID
export const delete_user_by_id = async (userId: number) => {
    try {
        const response = await api.delete(`/admin/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}
// FUNCTION TO ADD A NEW USER
export const add_new_user = async (userData: AdminUserRegistration) => {
    try {
        const response = await api.post("/admin/user/register/", userData);
        return response;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
}

// FUNCTION TO GET USER BY ID
export const get_user_by_id = async (userId: number) => {
    try {
        const response = await api.get(`/admin/user/${userId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

// FUNCTION TO UPDATE USER BY ID
export const update_user_by_id = async (userId: number, userData: AdminUserUpdate) => {
    try {
        const response = await api.put(`/admin/user/${userId}`, userData);
        return response;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}
