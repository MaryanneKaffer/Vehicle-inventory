import { DeleteVehicle } from "@/api/vehicles";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function DeleteComponent({ name, id, setPage, mbDelete, logged }: { name: string, id: number, setPage: (page: number) => void, mbDelete: boolean, logged: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [error, setError] = useState("")

    async function onDelete() {
        setError("");
        try {
            await DeleteVehicle(Number(id));
            onOpenChange();
            setPage(1);
        } catch (err: any) {
            setError(err.message);
        }
    }

    function handleOpen() {
        if (logged) {
            onOpen();
        }
    }

    return (
        <>
            <Tooltip delay={200} content={!logged && "Login first"} className={`${logged && "hidden"}`} placement="bottom">
                <Button variant={logged ? "ghost" : "flat"} size="sm" color={logged ? "danger" : undefined} radius="none" onPress={handleOpen} aria-label="delete vehicle"
                    className={`w-[40px] min-w-0 p-0 h-[35px] rounded-sm group-hover:opacity-100 ${!mbDelete && "opacity-0 -z-100 lg:z-10"} ${!logged && "bg-gray-700 cursor-default"} transition-opacity`}>
                    <MdDelete size={20} />
                </Button>
            </Tooltip>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="none" className="rounded-sm bg-secondary" backdrop="blur">
                <ModalContent className="items-center flex-1">
                    <ModalHeader className="flex flex-col gap-1 text-center cursor-default text-warning">{error ? "Access denied" : "Are you sure you want to delete this vehicle?"}</ModalHeader>
                    <ModalBody className="flex-1 -gap-4 justify-center text-center">
                        {error ? <h1 className="text-danger">{error}</h1>
                            : <>
                                <h1 className="text-xl">{name}</h1>
                                <h2 className="text-warning">id: {id}</h2>
                            </>}
                    </ModalBody>
                    <ModalFooter className="flex gap-2">
                        {error ? <Button color="warning" onPress={() => { setError(""); onOpenChange(); }}>Close</Button>
                            : <>
                                <Button variant="shadow" color="danger" radius="none" className="rounded-sm"
                                    onPress={() => { onDelete() }} > Yes, delete it </Button>
                                <Button variant="shadow" color="warning" radius="none" className="rounded-sm" onPress={onOpenChange} > No, keep it </Button>
                            </>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}