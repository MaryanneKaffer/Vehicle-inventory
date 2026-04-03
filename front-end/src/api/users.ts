const API_URL = import.meta.env.VITE_API_URL;

export interface Vehicle {
    id: number;
    username: string;
    email: string;
    password: string;
    picture: string;
}

export const PostUser = async (data: FormData) => {
    try {
        const response = await fetch(`${API_URL}/users/create`,
            {
                method: "POST",
                body: data
            });
        return response.json();
    } catch (error) {
        console.error("Error registering user:", error);
    }
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

export const getLoggedUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json(); 
        console.log("Dados do usuário vindos do servidor:", data);
        return data; 
    }
    return null;
};