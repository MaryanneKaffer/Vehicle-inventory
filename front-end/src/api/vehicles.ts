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
}

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

        const content = data?.content || [];
        const totalElements = data?.totalElements || 0;
        const totalPages = data?.totalPages || 0;

        setVehicles(content);
        setApiLength(totalElements);
        setApiPages(totalPages);

        if (content.length === 0) {
            setMessage("No vehicles found.");
        }

    } catch (error) {
        console.error("Error fetching vehicles:", error);
        setMessage("Error fetching vehicles.");
        setVehicles([]);
        setApiLength(0);
        setApiPages(0);
    } finally {
        setLoading(false);
    }
};

export async function GetVehicleById(id: number, setVehicle: (vehicle: Vehicle) => void) {
    try {
        const response = await fetch(`${API_URL}/vehicles/${id}`);
        const data = await response.json();
        setVehicle(data)
    } catch (error) {
        console.error("Error fetching vehicles:", error);
    }
}

export const PostVehicle = async (data: FormData) => {
    try {
        const response = await fetch(`${API_URL}/vehicles/create`,
            {
                method: "POST",
                body: data
            });
        return response.json();
    } catch (error) {
        console.error("Error posting vehicle:", error);
    }
};

export const DeleteVehicle = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/vehicles/delete/${id}`,
            {
                method: "DELETE"
            });
        return response.json();
    } catch (error) {
        console.error("Error deleting vehicle:", error);
    }
};