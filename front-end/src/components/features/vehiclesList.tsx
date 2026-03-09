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

export default function VehiclesList() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [apiPages, setApiPages] = useState(0);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/vehicles/get?page=${page - 1}&size=12`)
            .then(response => response.json())
            .then(data => {
                setVehicles(data.content);
                setLoading(false);
                setApiPages(prev => prev === 0 ? data.totalPages : prev);
                console.log(data.totalElements);
            });
    }, [page]);

    return (
        <div className="w-full h-full flex flex-col gap-4 ">
            {loading ? (
                <Button isLoading className="bg-transparent my-auto" size="lg" />
            ) : (
                <div className="grid grid-cols-4 gap-4 justify-between ">
                    {vehicles.map(vehicle => (
                        <div key={vehicle.id} className="dark:bg-default/70 bg-default rounded-sm p-3 h-[300px] w-[360px]">
                            <h3>{vehicle.brand} {vehicle.model} {vehicle.name} {vehicle.description} {vehicle.manufactureYear}</h3>
                        </div>
                    ))}
                </div>
            )}
            <PageNavigation apiPages={apiPages} setPage={setPage} />
        </div>
    );
}