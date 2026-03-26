import { DeleteVehicle } from "@/api/vehicles";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { MdDelete } from "react-icons/md";

export default function DeleteComponent({ name, id, setPage, mbDelete }: { name: string, id: number, setPage: (page: number) => void, mbDelete: boolean }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    function onDelete() {
        DeleteVehicle(Number(id));
        onOpenChange();
        setPage(1);
    }

    return (
        <>
            <Button variant="ghost" size="sm" color="danger" radius="none" onPress={onOpen} aria-label="delete vehicle"
                className={`w-[40px] min-w-0 p-0 h-[35px] rounded-sm group-hover:opacity-100 ${!mbDelete && "opacity-0 -z-100 lg:z-10"} transition-opacity`}>
                <MdDelete size={20} />
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="none" className="rounded-sm" backdrop="blur">
                <ModalContent className="items-center flex-1">
                    <ModalHeader className="flex flex-col gap-1 text-center cursor-default text-warning">Are you sure you want to delete this vehicle?</ModalHeader>
                    <ModalBody className="flex-1 -gap-4 justify-center text-center">
                        <h1 className="text-xl">{name}</h1>
                        <h2 className="text-warning">id: {id}</h2>
                    </ModalBody>
                    <ModalFooter className="flex gap-2">
                        <Button variant="shadow" color="danger" radius="none" className="rounded-sm"
                            onPress={() => { onDelete() }} > Yes, delete it </Button>
                        <Button variant="shadow" color="warning" radius="none" className="rounded-sm" onPress={onOpenChange} > No, keep it </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}