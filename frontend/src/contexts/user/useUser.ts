import { useContext } from "react";
import { UserContext } from "./userContextDefinition";

// Custom hook to access UserContext
export const useUser = () => {
    return useContext(UserContext);
};
