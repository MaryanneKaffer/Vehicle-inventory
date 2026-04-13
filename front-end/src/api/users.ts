const API_URL = import.meta.env.VITE_API_URL;

export interface User {
    id?: number;
    username: string;
    email: string;
    picture?: string;
}

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const PostUser = async (data: FormData) => {
    const response = await fetch(`${API_URL}/users/create`,
        {
            method: "POST",
            body: data
        });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Register failed");
    }

    return await response.json();
};

export const LoginUser = async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
    }

    return await response.json();
};

export const GetLoggedUser = async (): Promise<User | null> => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const response = await fetch(`${API_URL}/users/me`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return response.json();
};