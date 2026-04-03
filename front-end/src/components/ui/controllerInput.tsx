import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function ControllerInput({ fieldName, fieldType, control, register, password, rules }:
    { fieldName: string; fieldType?: string; control: any; register: any, password?: boolean, rules?: any }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        fieldType === "file" ?
            <input type="file"  {...register("image")} accept="image/*" />
            :
            <Controller name={fieldName} control={control} rules={rules} render={({ field, fieldState: { error } }) => (
                fieldType === "textarea" ? (
                    <Textarea placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} {...field} radius="none" className="rounded-sm w-full h-[80px]"
                        classNames={{ inputWrapper: "bg-default" }} />
                ) : (
                    <Input isInvalid={!!error} errorMessage={error?.message} type={password ? isVisible ? "text" : "password" : fieldType}
                        placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                        {...field} radius="none" className="rounded-sm w-full" classNames={{ inputWrapper: "bg-default" }}
                        endContent={password && (
                            <Button isIconOnly aria-label={isVisible ? "Hide password" : "Show password"} size="sm" variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <IoEyeOutline className="size-4 text-warning" /> : <IoEyeOffOutline className="size-4 text-warning" />}
                            </Button>
                        )} />
                )
            )} />
    );
}

