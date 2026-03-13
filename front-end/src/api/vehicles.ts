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
    setMessage("")
    setLoading(true);
    try {
        const response = await fetch(`http://localhost:8080/vehicles/get?${filter}&page=${page - 1}&size=20`);
        const data = await response.json();
        setVehicles(data.content);
        setApiLength(data.totalElements);
        setApiPages(data.totalPages);

        if (data.content.length === 0) {
            setMessage("No vehicles found.");
        }
        setLoading(false);
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        setMessage("Error fetching vehicles. Please try again.");
    }
    setLoading(false);
};

export const PostVehicle = async (data: FormData) => {
    try {
        const response = await fetch(`http://localhost:8080/vehicles/create`,
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
        const response = await fetch(`http://localhost:8080/vehicles/delete/${id}`,
            {
                method: "DELETE"
            });
        return response.json();
    } catch (error) {
        console.error("Error deleting vehicle:", error);
    }
};