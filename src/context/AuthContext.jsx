import { createContext, useEffect, useState } from "react";
import AuthService, { AuthService as AuthServiceClass} from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = AuthServiceClass.getCurrentUser();
        setCurrentUser(user);
    }, []);

    const login = async (email, password) => {
        const user = await AuthService.login(email, password);
        setCurrentUser(user);
    };

    const logout = () => {
        AuthService.logout();
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}