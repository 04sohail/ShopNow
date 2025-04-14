import { useContext } from "react";
import { UserContext } from "./ProductContextDefinition";

// Custom hook to access UserContext
export const useProduct = () => {
    return useContext(UserContext);
};
