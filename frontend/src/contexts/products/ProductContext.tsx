import { useEffect, useState } from "react";
import { UserContext } from "./ProductContextDefinition";
import { ReactNode } from "react";
import { LoginUserData } from "../../types/types";

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        const productData: LoginUserData = JSON.parse(sessionStorage.getItem("loginUserData") || "[]" as string)
        setProduct(productData)
    }, [])
    const [product, setProduct] = useState<LoginUserData>({} as LoginUserData);

    const loginProduct = (product: LoginUserData) => {
        setProduct(product);
        sessionStorage.setItem("loginUserData", JSON.stringify(product))
    };

    const logoutProduct = () => {
        sessionStorage.clear()
        setProduct({} as LoginUserData); // Clear product data on logout
    };

    return (
        <UserContext.Provider value={{ product, loginProduct, logoutProduct }}>
            {children}
        </UserContext.Provider>
    );
};
