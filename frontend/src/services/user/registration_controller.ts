import { api } from "../base_controller"
import { Get_User_From_Email_Address, User_Registration, UserRegistrationOtp, UserResetPassword } from "../../types/types";

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

// FUNCTION TO GET USER FROM EMAIL 
export const get_user_from_email = async (email_address: Get_User_From_Email_Address) => {
    try {
        const response = await api.post(`/users/get-user-by-email/`, email_address)
        if (response.status == 200) {
            return true
        }
    }
    catch (error) {
        console.log("Error While Getting Email", error)
        throw error
    }
}

// FUNCTION TO VERITY OTP
export const verify_otp = async (userDetail: UserRegistrationOtp) => {
    try {
        const response = await api.post("/users/verify-otp/", userDetail);
        if (response.status == 200) {
            return true
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error;
    }
};

// FUNCTION TO RESET PASSWORD
export const reset_password = async (userDetail: UserResetPassword) => {
    try {
        const response = await api.post("/users/reset-password/", userDetail);
        if (response.status == 200) {
            return true
        }
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
}
