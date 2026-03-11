import { Input, Textarea } from "@heroui/input";
import { Controller } from "react-hook-form";

export default function ControllerInput({ fieldName, fieldType, control, register }: { fieldName: string; fieldType: string; control: any; register: any }) {
    return (
        fieldType === "file" ?
            <input type="file"  {...register("image")} accept="image/*" />
            :
            <Controller name={fieldName} control={control} render={({ field }) => (
                fieldType === "textarea" ? (
                    <Textarea placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} {...field} radius="none" className="rounded-sm w-full h-[80px]" />
                ) : (
                    <Input type={fieldType} placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} {...field} radius="none" className="rounded-sm w-full" />
                )
            )} />
    );
}

