import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import PageNavigation from "../ui/pagination";

interface Vehicle {
    id: number;
    brand: string;
    model: string;
    name: string;
    description: string;
    manufactureYear: number;
}

export default function VehiclesList({ filter, setApiLength }: { filter: string, setApiLength: (length: number) => void }) {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [apiPages, setApiPages] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage("")
        setLoading(true);
        const fetchVehicles = async () => {
            try {
                const response = await fetch(`http://localhost:8080/vehicles/get?${filter}&page=${page - 1}&size=16`);
                const data = await response.json();
                setVehicles(data.content);
                setPage(1);
                setApiLength(data.totalElements);
                setApiPages(data.totalPages);

                if (data.content.length === 0) {
                    setMessage("No vehicles found.");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
                setLoading(false);
                setMessage("Error fetching vehicles. Please try again.");
            }
        };
        fetchVehicles();
    }, [page, filter]);

    return (
        <div className="w-full h-full flex flex-col gap-4 ">
            {message ? (
                <p className="text-center text-red-500">{message}</p>
            ) :
                loading ? (
                    <div className="min-h-[1100px] flex">
                        <Button isLoading className="bg-transparent mt-32 mx-auto" size="lg" />
                    </div>
                ) : (
                    <div className={`grid grid-cols-4 gap-4 justify-between ${apiPages < 2 ? "h-full" : "min-h-[1100px]"}`}>
                        {vehicles.map(vehicle => (
                            <div key={vehicle.id} className="dark:bg-default/70 bg-default rounded-sm p-3 h-[300px] w-[305px]">
                                <h3>{vehicle.brand} {vehicle.model} {vehicle.name} {vehicle.description} {vehicle.manufactureYear}</h3>
                            </div>
                        ))}
                    </div>
                )}
            {!message && <PageNavigation apiPages={apiPages} setPage={setPage} />}
        </div>
    );
}