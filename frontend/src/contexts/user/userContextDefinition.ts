import { createContext } from "react";
import { User_Login_Context } from "../../types/types";

// Create UserContext
interface UserContextType {
    user: User_Login_Context;
    loginUser: (user: User_Login_Context) => void;
    logoutUser: () => void;
}

export const UserContext = createContext<UserContextType>({
    user: {} as User_Login_Context,
    loginUser: () => { },
    logoutUser: () => { }
});
