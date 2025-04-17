import { useEffect, useState } from "react";
import { UserContext } from "./userContextDefinition";
import { ReactNode } from "react";
import { User_Login_Context } from "../../types/types";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User_Login_Context>({} as User_Login_Context);

    useEffect(() => {
        try {
            const storedData = sessionStorage.getItem("loginUserData");
            const userData: User_Login_Context = storedData ? JSON.parse(storedData) : {} as User_Login_Context;
            setUser(userData);
        } catch (error) {
            console.error("Failed to parse sessionStorage data:", error);
            setUser({} as User_Login_Context);
        }
    }, []);

    const loginUser = (user: User_Login_Context) => {
        setUser(user);
        sessionStorage.setItem("loginUserData", JSON.stringify(user));
    };

    const logoutUser = () => {
        sessionStorage.clear();
        setUser({} as User_Login_Context);
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
