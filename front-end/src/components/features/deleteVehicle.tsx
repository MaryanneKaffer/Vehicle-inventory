import { DeleteVehicle } from "@/api/vehicles";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useState } from "react";

export default function DeleteComponent({ name, id, setPage, isOpen, change }: { name: string, id: number, setPage: (page: number) => void, logged: any, isOpen: boolean, change: () => void }) {
    const [error, setError] = useState("")

    async function onDelete() {
        setError("");
        try {
            await DeleteVehicle(Number(id));
            change();
            setPage(1);
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={change} radius="none" className="rounded-sm bg-secondary" backdrop="blur">
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
                    {error ? <Button color="warning" onPress={() => { setError(""); change(); }}>Close</Button>
                        : <>
                            <Button variant="shadow" color="danger" radius="none" className="rounded-sm"
                                onPress={() => { onDelete() }} > Yes, delete it </Button>
                            <Button variant="shadow" color="warning" radius="none" className="rounded-sm" onPress={change} > No, keep it </Button>
                        </>}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}