import { Button } from "@heroui/button";
import { Vehicle } from "@/api/vehicles";
import VehicleCard from "../ui/vehicleCard";
import { User } from "@/api/users";

export default function VehiclesList({ vehicles, loading, message, apiPages, setPage, screen, logged }: {
    setPage: (page: number) => void, vehicles: Vehicle[], loading: boolean, message: string, apiPages: number, screen: string, logged: User | null
}) {
    return (
        <div className={`w-full flex flex-col gap-2 sm:gap-4  ${apiPages < 2 ? "h-full" : "min-h-[1000px]"}`}>
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