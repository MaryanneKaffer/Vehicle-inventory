import { Button } from "@heroui/button";
import { Vehicle } from "@/api/vehicles";
import DeleteComponent from "./deleteComponent";
import { IoCarSport } from "react-icons/io5";

export default function VehiclesList({ vehicles, loading, message, apiPages, setPage, screen, mbDelete }: {
    setApiLength: (length: number) => void, setPage: (page: number) => void, vehicles: Vehicle[],
    loading: boolean, message: string, apiPages: number, screen: string, mbDelete: boolean
}) {

    return (
        <div className="w-full h-full flex flex-col gap-2 sm:gap-4">
            {message ? (
                <p className="text-center text-red-500">{message}</p>
            ) :
                loading ? (
                    <div className="min-h-[1100px] flex">
                        <Button isLoading className="bg-transparent mt-32 mx-auto" size="lg" />
                    </div>
                ) : (
                    <div className={`grid ${screen === "large" ? "grid-cols-5" : screen === "medium" ? "grid-cols-4" : screen === "small" ? "grid-cols-3" : "grid-cols-2"} 
                    gap-2 sm:gap-4 justify-between ${apiPages < 2 ? "h-full" : "min-h-[1100px]"}`}>
                        {vehicles.map(vehicle => (
                            <div key={vehicle.id} className="group flex flex-col bg-default/70 rounded-[3px] sm:p-3 p-2 h-[300px] transition-all hover:scale-[1.01]">
                                {vehicle.image ? (
                                    <img src={`http://localhost:8080/uploads/${vehicle.image}`} alt={`${vehicle.brand} ${vehicle.model}`} className="h-35 w-full object-cover rounded-[3px] mb-2" />
                                ) : (
                                    <IoCarSport className="h-40 w-full object-cover rounded-[3px] mb-2 bg-warning text-white" />
                                )}
                                <h1 className="sm:text-lg">{vehicle.name}</h1>
                                <h2 className="leading-[18px] text-gray-400">{vehicle.brand} <br /> Model: {vehicle.model}</h2>
                                <h2 className="text-warning">{vehicle.manufactureYear}</h2>
                                <h3>${vehicle.price?.toFixed(2)}</h3>
                                <DeleteComponent name={vehicle.name} id={vehicle.id} setPage={setPage} mbDelete={mbDelete} />
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}