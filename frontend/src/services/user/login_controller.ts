import { api } from "../base_controller"
import { User_Login } from "../../types/types";

// FUNCTION TO REGISTER A NEW USER
export const login_user = async (userData: User_Login) => {
    try {
        const response = await api.post("/users/login/", userData);
        return response;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export default api;
