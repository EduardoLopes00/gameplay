import React, 
    {
        createContext,
        useContext,
        useState
    } from "react";
import { ReactNode } from "react";

import  * as AuthSession from 'expo-auth-session'

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User;
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User)

    return (
        <AuthContext.Provider value = {{user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){ //No fim é criado um hook para acessar os dados do context
    const context = useContext(AuthContext)

    return context;
}