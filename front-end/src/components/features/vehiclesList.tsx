import { Button } from "@heroui/button";
import { GetVehicles, Vehicle } from "@/api/vehicles";
import VehicleCard from "../ui/vehicleCard";
import { User } from "@/api/users";
import { useEffect, useState } from "react";

export default function VehiclesList({ setPage, screen, logged, filter, message, setMessage, setApiLength, setApiPages, page }: {
    setPage: (page: number) => void, message: string, screen: string, logged: User | null, filter: string[], page: number,
    setMessage: (message: string) => void, setApiLength: (length: number) => void, setApiPages: (pages: number) => void
}) {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = (targetPage: number, pageSize: number) => {
        GetVehicles({ filter: filter.filter(Boolean).join("&"), page: targetPage, setMessage, setLoading, setVehicles, setApiLength, setApiPages, pageSize });
    };

    useEffect(() => {
        const handlePageSizeChange = () => {
            fetchData(1, Number(localStorage.getItem("pageSize") || 20));
            setPage(1);
        };
        window.addEventListener("pageSizeChange", handlePageSizeChange);
        return () => window.removeEventListener("pageSizeChange", handlePageSizeChange);
    }, [filter]);

    useEffect(() => {
        fetchData(page, Number(localStorage.getItem("pageSize") || 20));
    }, [page]);

    return (
        <div className={`w-full flex flex-col gap-2 sm:gap-4 min-h-[700px]`}>
            {message ? (<p className="text-center text-red-500">{message}</p>)
                : loading && (
                    <div className="min-h-[100px] flex">
                        <Button isLoading className="bg-transparent mt-32 mx-auto" size="lg" />
                    </div>
                )}
            {!message && !loading &&
                <div className={`${screen === "large" ? "grid-cols-5" : screen === "medium" ? "grid-cols-4" : screen === "small" ? "grid-cols-3" : "grid-cols-2"} 
                grid  gap-2 sm:gap-4 justify-between`}>
                    {vehicles.map((vehicle, i) => (
                        <VehicleCard key={vehicle.name} setPage={setPage} i={i} vehicle={vehicle} logged={logged} />
                    ))}
                </div>
            }
        </div>
    );
}