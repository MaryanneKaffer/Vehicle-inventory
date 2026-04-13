import { Button } from "@heroui/button";
import ControllerInput from "../ui/controllerInput";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GetLoggedUser, LoginUser } from "@/api/users";
import { AuthContext } from "@/context/authContext";

export default function UserLogin({ setLogin }: { setLogin: (value: boolean) => void }) {
    const { control, handleSubmit, register, formState: { isValid } } = useForm({ mode: "onBlur" });
    const [loading, setLoading] = useState(Boolean);
    const [error, setError] = useState(false);
    const { login } = useContext(AuthContext);

    async function onSubmit(data: any) {
        setLoading(true);
        try {
            const response = await LoginUser(data);
            localStorage.setItem("token", response.token);
            const userData = await GetLoggedUser();

            if (userData) {
                login(userData, response.token);
                setLogin(false);
            }
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <ControllerInput fieldName="email" fieldType="email" control={control} register={register} rules={{ required: "Email is required", }} />
            <ControllerInput fieldName="password" password={true} control={control} register={register} rules={{ required: "Password is required", }} />
            {error && <p className="text-danger text-center"> Email or password wrong</p>}
            <Button isIconOnly={loading} color={!isValid ? "danger" : "warning"} isDisabled={!isValid || loading} isLoading={loading} radius="none" variant="ghost" type="submit" className="mb-2 rounded-sm w-full">
                Login
            </Button>
        </form>)
}