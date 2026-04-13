import { GetLoggedUser } from '@/api/users';
import { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
    username: string;
    email: string;
    picture?: string;
}

interface AuthContextData {
    authenticated: boolean;
    user: User | null;
    logout(): void;
    login(userData: User, token: string): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User, token: string) => {
        localStorage.setItem('token', token);
        setUser(userData);
    };

    useEffect(() => {
        async function loadStorageData() {
            const token = localStorage.getItem('token');
            if (token) {
                const data = await GetLoggedUser();
                if (data) {
                    setUser(data);
                } else {
                    localStorage.removeItem('token');
                }
            }
        }
        loadStorageData();
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};