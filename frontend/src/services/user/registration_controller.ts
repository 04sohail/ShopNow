import { api } from "../base_controller"
import { User_Registration, UserRegistrationOtp } from "../../types/types";

// FUNCTION TO REGISTER A NEW USER
export const register_user = async (userData: User_Registration) => {
    try {
        const response = await api.post("/users/register/", userData);
        if (response.status == 200) {
            return true
        }
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};


export default api;

// FUNCTION TO VERITY OTP
export const verify_otp = async (userDetail: UserRegistrationOtp) => {
    try {
        const response = await api.post("/users/verify-otp/", userDetail );
        if (response.status == 200) {
            return true
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error;
    }
};