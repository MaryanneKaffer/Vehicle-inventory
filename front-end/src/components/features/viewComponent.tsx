import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/modal";
import { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import { GetVehicleById, Vehicle } from "@/api/vehicles";

export default function ViewComponent({ id, mbView }: { id: number, mbView: boolean }) {
    const [vehicle, setVehicle] = useState<Vehicle>()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        GetVehicleById(id, setVehicle);
    }, [id]);

    return (
        <div >
            <Button variant="ghost" size="sm" color="warning" radius="none" onPress={onOpen}
                className={`w-[40px] min-w-0 min-h-0 h-[35px] p-0 rounded-sm ${!mbView && "opacity-0 -z-100"} transition-opacity lg:flex absolute bottom-0 right-0`}>
                <GrView size={18} />
            </Button>

            {vehicle &&
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="none" className="rounded-sm" backdrop="blur" size="2xl">
                    <ModalContent className="items-center flex-1">
                        <ModalBody className="flex-1 gap-4 h-full">
                            <form className="flex md:flex-row flex-col gap-4 h-full mt-4">
                                <div className="h-[200px] relative md:w-[250px] group border-2 border-warning flex items-center justify-center cursor-pointer overflow-hidden rounded-sm" >
                                    {vehicle.image && <img src={`http://localhost:8080/uploads/${vehicle.image}`} className="transition-all object-cover w-full h-[100%]" />}
                                    <span className={`text-warning absolute ${vehicle.image && "opacity-0 group-hover:opacity-100 transition-all"} h-full w-full bg-black/70 backdrop-blur-sm`}>
                                        <p className="flex justify-center h-full items-center"> {vehicle.image || "No image"} </p>
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2 w-[300px]">
                                    <p className="text-lg">{vehicle.name} <span className="text-warning text-sm">id: {vehicle.id}</span></p>
                                    <div className="grid grid-cols-2 gap-1 capitalize">
                                        <p> <span className="text-warning"> Brand: </span>{vehicle.brand}</p>
                                        <p> <span className="text-warning"> Model: </span>{vehicle.model}</p>
                                        <p className="text-warning">{vehicle.manufactureYear}</p>
                                        <p className="text-warning">${vehicle.price.toFixed(2)}</p>
                                    </div>
                                    <p>{vehicle.description}</p>
                                </div >

                            </form>
                            <Button color="warning" radius="none" variant="ghost" onPress={onOpenChange} className="mb-2 rounded-sm">
                                Close
                            </Button>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }
        </div >
    );
}