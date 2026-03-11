import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import PageNavigation from "../ui/pagination";
import { GetVehicles, Vehicle } from "@/api/vehicles";
import DeleteComponent from "./deleteComponent";
import { IoCarSport } from "react-icons/io5";

export default function VehiclesList({ filter, setApiLength, setPage, page }: { filter: string, setApiLength: (length: number) => void, setPage: (page: number) => void, page: number }) {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [apiPages, setApiPages] = useState(0);

    useEffect(() => {
        GetVehicles({ filter, page, setMessage, setLoading, setVehicles, setApiLength, setApiPages, setPage });
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
                    <div className={`grid grid-cols-5 gap-4 justify-between ${apiPages < 2 ? "h-full" : "min-h-[1100px]"}`}>
                        {vehicles.map(vehicle => (
                            <div key={vehicle.id} className="group flex flex-col dark:bg-default/70 bg-default rounded-sm p-3 h-[300px] transition-all hover:scale-[1.01]">
                                {vehicle.image ? (
                                    <img src={`http://localhost:8080/uploads/${vehicle.image}`} alt={`${vehicle.brand} ${vehicle.model}`} className="h-40 w-full object-cover rounded-sm mb-2" />
                                ) : (
                                    <IoCarSport className="h-40 w-full object-cover rounded-sm mb-2 bg-warning" />
                                )}
                                <h3>{vehicle.brand} {vehicle.model} {vehicle.name} {vehicle.description} {vehicle.manufactureYear}</h3>
                                <DeleteComponent name={vehicle.name} id={vehicle.id} setPage={setPage} />
                            </div>
                        ))}
                    </div>
                )}
            {!message && <PageNavigation apiPages={apiPages} setPage={setPage} />}
        </div>
    );
}