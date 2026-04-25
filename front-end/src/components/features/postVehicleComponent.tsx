import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import ControllerInput from "../ui/controllerInput";
import { useForm } from "react-hook-form";
import { EditVehicle, PostVehicle } from "@/api/vehicles";
import { Input } from "@heroui/input";
import { useEffect, useRef, useState } from "react";
import { convertToVehicleFormData } from "../utils/convertToVehicle";
import { User } from "@/api/users";

export default function PostComponent({ setPage, logged, editId, isOpen, change }: { setPage: (pages: number) => void, screen?: string, logged?: User | null, editId?: number, isOpen?: boolean, change: () => void }) {
    const { control, handleSubmit, reset, register } = useForm();
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const { ref, onChange, ...rest } = register("image");
    const [loading, setLoading] = useState(Boolean);
    const [message, setMessage] = useState("");

    const fields = [{ name: "name", type: "text" }, { name: "brand", type: "text" }, { name: "model", type: "text" }, { name: "price", type: "number" },
    { name: "manufactureYear", type: "number" }, { name: "description", type: "textarea" }, { name: "image", type: "file" }];

    async function onSubmit(data: any) {
        setLoading(true);
        try {
            const formData = convertToVehicleFormData(data);
            if (editId) {
                await EditVehicle(editId, formData);
            } else {
                await PostVehicle(formData, logged?.id || 0);
            }
            reset(); setPreview(null);
            setPage(1); change();
        } catch (err: any) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!isOpen) { reset(); setMessage(""); setPreview(null); }
    }, [isOpen, reset]);

    useEffect(() => {
        if (!editId || !isOpen) return;
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/vehicles/${editId}`);
                const data = await response.json();
                reset(data);
                if (data?.image) setPreview(data.image);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [editId, isOpen]);

    return (
        <Modal isOpen={isOpen} onOpenChange={change} radius="none" className={`rounded-sm dark:bg-secondary ${message ? "h-46" : "h-auto"}`} backdrop="blur" size="2xl">
            <ModalContent className="items-center flex-1">
                <ModalHeader className="flex flex-col gap-1 text-center cursor-default text-warning">{editId ? "Edit Vehicle" : "Register a Vehicle"}</ModalHeader>
                <ModalBody>
                    {message ? <h1 className="text-danger">{message}</h1> : (
                        <form onSubmit={handleSubmit(onSubmit)} className="flex md:flex-row flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                <ControllerInput fieldName={fields[0].name} fieldType={fields[0].type} control={control} register={register} rules={{ required: "Username is required", }} />
                                <Input type={fields[6].type} className="hidden absolute" {...rest} radius="none"
                                    ref={(e: any) => { ref(e); fileRef.current = e; }}
                                    onChange={(e) => {
                                        onChange(e);
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }} />
                                <div className="h-[192px] relative md:mb-2 md:w-[250px] group border-2 border-warning flex items-center justify-center cursor-pointer overflow-hidden rounded-sm"
                                    onClick={() => fileRef.current?.click()} >
                                    {preview ? (<>
                                        <img src={preview} className="transition-all object-cover w-full max-h-[100%]" />
                                        <span className="text-warning absolute opacity-0 group-hover:opacity-100 transition-all h-full w-full bg-black/70 backdrop-blur-sm">
                                            <p className="flex justify-center h-full items-center"> Change Image</p>
                                        </span>
                                    </>) : (
                                        <span className="flex text-warning transition-all group-hover:text-black group-hover:bg-warning h-full w-full justify-center items-center">
                                            Upload Image
                                        </span>
                                    )}
                                </div>
                            </div >

                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {fields.slice(1, 5).map((field) => (
                                        <ControllerInput key={field.name} fieldName={field.name} fieldType={field.type} control={control} register={register} rules={{ required: "Required" }} />
                                    ))}
                                </div>
                                <ControllerInput fieldName={fields[5].name} fieldType={fields[5].type} control={control} register={register} />
                                <Button color="warning" isLoading={loading} radius="none" variant="ghost" type="submit" className="mb-2 rounded-sm">
                                    Register
                                </Button>
                            </div >
                        </form>
                    )}
                    {message && <Button variant="ghost" color="warning" onPress={() => change()} radius="none" className="rounded-sm mt-4 w-30 mx-auto">Close</Button>}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}