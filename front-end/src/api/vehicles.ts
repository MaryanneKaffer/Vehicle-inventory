const API_URL = import.meta.env.VITE_API_URL;

export interface User {
    id?: number;
    username: string;
    email: string;
    picture?: string;
}

export interface Vehicle {
    id: number;
    brand: string;
    model: string;
    name: string;
    description: string;
    manufactureYear: number;
    price: number;
    image: string;
    owner: User;
}

const getAuthHeaders = () => (
    {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    });

export const GetVehicles = async ({ filter, page, setMessage, setLoading, setVehicles, setApiLength, setApiPages }: {
    filter: string, page: number, setMessage: (message: string) => void, setLoading: (loading: boolean) => void, setVehicles: (vehicles: Vehicle[]) => void,
    setApiLength: (length: number) => void, setApiPages: (pages: number) => void
}) => {
    setMessage("");
    setLoading(true);

    try {
        const response = await fetch(`${API_URL}/vehicles/get?${filter}&page=${page - 1}&size=20`, { priority: 'high' });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();

        setVehicles(data?.content || [])
        setApiLength(data?.totalElements || 0);
        setApiPages(data?.totalPages || 0);

        if (data?.content.length === 0) {
            setMessage("No vehicles found.");
        }
    } catch (error) {
        setMessage("Error fetching vehicles.");
    } finally {
        setLoading(false);
    }
};

export async function GetVehicleById(id: number, setVehicle: (vehicle: Vehicle) => void) {
    try {
        const response = await fetch(`${API_URL}/vehicles/${id}`);
        const data = await response.json();
        setVehicle(data)
    } catch (error: any) {
        throw new Error(error.message || "Unknown error");
    }
}

export const PostVehicle = async (data: FormData) => {
    try {
        const response = await fetch(`${API_URL}/vehicles/create`,
            {
                method: "POST",
                headers: getAuthHeaders(),
                body: data,
            });
        return response.json();
    } catch (error: any) {
        throw new Error(error.message || "Unknown error");
    }
};

export const DeleteVehicle = async (id: number) => {
    const response = await fetch(`${API_URL}/vehicles/delete/${id}`,
        {
            method: "DELETE",
            headers: getAuthHeaders()
        });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData.message || "Unknown error");
    }

    return response.json();
};