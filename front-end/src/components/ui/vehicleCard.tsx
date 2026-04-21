import { motion } from "framer-motion";
import { IoCarSport, IoPersonSharp } from "react-icons/io5";
import DeleteComponent from "../features/deleteVehicle";
import ViewComponent from "../features/viewComponent";
import { Vehicle } from "@/api/vehicles";
import { FaCog } from "react-icons/fa";
import { Button } from "@heroui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { SlOptions } from "react-icons/sl";
import PostComponent from "../features/postVehicleComponent";

export default function VehicleCard({ vehicle, mbView, mbDelete, setPage, i, logged }:
    { vehicle: Vehicle, mbDelete: boolean, mbView: boolean, setPage: (page: number) => void, i: number, logged: any }) {

    return (
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            key={vehicle.id} className="group flex flex-col bg-default/70 rounded-[3px] sm:p-3 p-2 transition-all hover:scale-[1.01] relative">

            {vehicle.image ? (
                <img src={vehicle.image} fetchPriority={i === 0 ? "high" : "auto"} alt={`${vehicle.brand} ${vehicle.model}`} loading={i === 0 ? "eager" : "lazy"}
                    className="md:h-35 h-30 w-full object-cover rounded-[3px] mb-2 aspect-video bg-default-200" />
            ) : (
                <IoCarSport className="md:h-35 h-30 w-full object-cover rounded-[3px] mb-2 bg-warning text-white" />
            )}

            <h3 className="md:text-lg line-clamp-1">{vehicle.name}</h3>
            <p className="leading-[18px] text-gray-400 md:text-base text-sm">{vehicle.brand} <br /> Model: {vehicle.model}</p>
            <p className="text-warning md:text-base text-sm">{vehicle.manufactureYear}</p>
            <p className="md:text-base text-sm">${vehicle.price?.toFixed(2)}</p>

            <div className="mt-2 flex gap-1 items-center">
                {vehicle.owner.picture ?
                    <img src={vehicle.owner.picture} className="rounded-full dark:bg-black/20 bg-white size-[28px]" />
                    :
                    < span className="rounded-full dark:bg-black/20 bg-white p-1 size-[28px] flex items-center justify-center" role="img" aria-label="No picture uploaded">
                        {vehicle.owner.username === "Auto" ? <FaCog size={18} /> : <IoPersonSharp size={18} />}
                    </span>}
                <p className="text-gray-300">{vehicle.owner.username}</p>
            </div>

            <footer className="absolute md:bottom-3 md:right-3 bottom-2 right-2 flex gap-1 items-center lg:opacity-0 group-hover:opacity-100 transition-opacity">
                <Popover placement="bottom">
                    <PopoverTrigger>
                        <Button className="min-w-0 bg-transparent py-0"><SlOptions size={20} color="warning" /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-64 flex flex-row gap-1 items-center rounded-sm bg-default/60 backdrop-blur-lg p-2">
                        <ViewComponent id={vehicle.id} mbView={mbView} />
                        <DeleteComponent name={vehicle.name} id={vehicle.id} setPage={setPage} mbDelete={mbDelete} logged={logged || ""} />
                        <PostComponent setPage={setPage} editId={vehicle.id} logged={logged || ""} />
                    </PopoverContent>
                </Popover>
            </footer>
        </motion.article >
    )
}