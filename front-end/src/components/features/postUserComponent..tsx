import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ControllerInput from "../ui/controllerInput";
import { IoPersonSharp } from "react-icons/io5";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { convertToUserFormData } from "../utils/convertToUser";
import { PostUser } from "@/api/users";

export default function PostUserComponent({ setRegister }: { setRegister: (value: boolean) => void }) {
    const { control, handleSubmit, register, getValues, formState: { isValid } } = useForm({ mode: "onBlur" });
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const { ref, onChange, ...rest } = register("image");
    const [loading, setLoading] = useState(Boolean);

    async function onSubmit(data: any) {
        const formData = convertToUserFormData(data);
        setLoading(true);
        try {
            await PostUser(formData);
        } catch (error) {
            alert("Error trying to post data");
        } finally {
            setLoading(false);
            setRegister(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="relative mx-auto md:size-[130px] group border-2 border-warning flex items-center justify-center cursor-pointer overflow-hidden rounded-full"
                onClick={() => fileRef.current?.click()} >
                <Input type="file" className="hidden absolute" {...rest} radius="none"
                    ref={(e: any) => { ref(e); fileRef.current = e; }}
                    onChange={(e) => {
                        onChange(e);
                        const file = e.target.files?.[0];
                        if (file) {
                            setPreview(URL.createObjectURL(file));
                        }
                    }} />
                {preview ? (<>
                    <img src={preview} className="transition-all object-cover w-full max-h-[100%] rounded-full " />
                    <span className="text-warning absolute opacity-0 group-hover:opacity-100 transition-all h-full w-full bg-black/70 backdrop-blur-sm rounded-full">
                        <p className="flex justify-center h-full items-center"> Change Image</p>
                    </span>
                </>) : (
                    <span className="flex text-warning transition-all group-hover:text-black group-hover:bg-warning h-full w-full justify-center items-center">
                        <IoPersonSharp className="group-hover:hidden block absolute" size={80} />
                        <span className="hidden group-hover:block "> Upload Image </span>
                    </span>
                )}
            </div>
            <ControllerInput fieldName="username" fieldType="text" control={control} register={register} rules={{ required: "Username is required", }} />
            <ControllerInput fieldName="email" fieldType="email" control={control} register={register}
                rules={{
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email format"
                    }
                }} />
            <ControllerInput fieldName="password" password={true} control={control} register={register} rules={{ required: "Password is required", }} />
            <ControllerInput fieldName="confirm password" password={true} control={control} register={register}
                rules={{
                    validate: (value: string) =>
                        value === getValues("password") || "Passwords do not match"
                }}
            />
            <Button isIconOnly={loading} color={!isValid ? "danger" : "warning"} isDisabled={!isValid || loading} isLoading={loading} radius="none" variant="ghost" type="submit" className="mb-2 rounded-sm w-full">
                Register
            </Button>
        </form>
    )
}