import { createContext } from "react";
import { Product } from "../../types/types";

// Create UserContext
interface UserContextType {
    user: Product;
    loginUser: (user: Product) => void;
    logoutUser: () => void;
}

export const UserContext = createContext<UserContextType>({
    user: {} as Product,
    loginUser: () => { },
    logoutUser: () => { }
});
