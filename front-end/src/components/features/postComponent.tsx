import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import ControllerInput from "../ui/controllerInput";
import { useForm } from "react-hook-form";
import { PostVehicle } from "@/api/vehicles";

export default function PostComponent() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { control, handleSubmit, reset, register } = useForm();
    const fields = [{ name: "name", type: "text" }, { name: "brand", type: "text" }, { name: "model", type: "text" }, { name: "price", type: "number" },
    { name: "manufactureYear", type: "number" }, { name: "description", type: "textarea" }, { name: "image", type: "file" }];

    function onSubmit(data: any) {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("brand", data.brand);
        formData.append("model", data.model);
        formData.append("price", data.price);
        formData.append("manufactureYear", data.manufactureYear);

        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        PostVehicle(formData);

        reset();
        onOpenChange();
    }
    return (
        <div className="==">
            <Button variant="ghost" color="warning" className="w-full rounded-sm" radius="none" onPress={onOpen} > Register a Vehicle </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="none" className="rounded-sm" backdrop="blur" >
                <ModalContent className="items-center">
                    <ModalHeader className="flex flex-col gap-1 text-center">Register a Vehicle</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
                            <span className="flex flex-col gap-4">

                            </span>

                            <span className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {fields.slice(1, 5).map((field) => (
                                        <ControllerInput key={field.name} fieldName={field.name} fieldType={field.type} control={control} register={register} />
                                    ))}
                                </div>
                                <ControllerInput fieldName={fields[5].name} fieldType={fields[5].type} control={control} register={register} />
                                <Button color="warning" radius="none" variant="ghost" type="submit" className="mb-2 rounded-sm">
                                    Register
                                </Button>
                            </span>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div >
    );
}