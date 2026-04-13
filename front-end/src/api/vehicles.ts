import { User } from "./users";
const API_URL = import.meta.env.VITE_API_URL;

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

const getAuthHeaders = () => ({ "Authorization": `Bearer ${localStorage.getItem('token')}` });

export const GetVehicles = async ({ filter, page, setMessage, setLoading, setVehicles, setApiLength, setApiPages }: {
    filter: string, page: number, setMessage: (message: string) => void, setLoading: (loading: boolean) => void, setVehicles: (vehicles: Vehicle[]) => void,
    setApiLength: (length: number) => void, setApiPages: (pages: number) => void
}) => {
    setMessage("");
    setLoading(true);

    try {
        const response = await fetch(`${API_URL}/vehicles/get?${filter}&page=${page - 1}&size=20`, { priority: 'high' });
        const data = await response.json();

        if (!response.ok) {
            setMessage(data?.message || "Error fetching vehicles.");
            setVehicles([]);
            return;
        }

        setVehicles(data?.content || []);
        setApiLength(data?.totalElements || 0);
        setApiPages(data?.totalPages || 0);

        if (data?.content?.length === 0) {
            setMessage("No vehicles found.");
        }
    } catch (error) {
        setMessage("Network error. Please try again later.");
    } finally {
        setLoading(false);
    }
};

export async function GetVehicleById(id: number, setVehicle: (vehicle: Vehicle) => void) {
    const response = await fetch(`${API_URL}/vehicles/${id}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Unknown error");
    }
    return setVehicle(data);
}

export const PostVehicle = async (data: FormData) => {
    const response = await fetch(`${API_URL}/vehicles/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: data,
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Unknown error");
    }
    return response.json();
};

export const DeleteVehicle = async (id: number) => {
    const response = await fetch(`${API_URL}/vehicles/delete/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Unknown error");
    }
};