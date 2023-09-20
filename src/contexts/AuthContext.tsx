import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// types
import { User } from "../types/User";

// models
import UserAutenticated from "../models/responses/UserAutenticated";

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    SignIn: (data: UserAutenticated) => Promise<void>,
    LogOut: () => Promise<void>,
    token: string | null
}

export const AuthContext = createContext({} as AuthContextType);
export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const isAuthenticated = !!user;
    const Router = useRouter();

    async function LogOut() {
        Cookies.remove("micro-erp.user");
        Cookies.remove("micro-erp.roles");
        Cookies.remove("micro-erp.token");
        setUser(null);
        Router.push("/auth/login");
    }
    
    async function SignIn({ user, roles, token, tokenExpires }: UserAutenticated) {
        console.log('Autenticando');
        var date = new Date(tokenExpires).setMinutes(10);
        console.log(date);
        Cookies.set("micro-erp.user", JSON.stringify(user), { expires: date });
        Cookies.set("micro-erp.roles", JSON.stringify(roles), { expires: date });
        Cookies.set("micro-erp.token", token, { expires: date });
        setUser({
            email: user.email,
            name: user.name,
            roles: roles,
            token: token,
            userType: user.userType,
            id: user.id,
            tokenExpires: tokenExpires
        });
        setToken(token);
        console.log(user);
        console.log(token);
        Router.push("/dashboard");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, SignIn, LogOut, token }}>
            {children}
        </AuthContext.Provider>
    );
}
