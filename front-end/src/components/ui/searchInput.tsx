import { useEffect, useRef, useState } from "react";
import { Input } from "@heroui/react";

export default function SearchInput({ setFilter, index, name }: { setFilter: (index: number, filter: string) => void; index: number; name: string }) {
    const [value, setValue] = useState("");
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
        }

        if (value !== "") {
            timeoutRef.current = window.setTimeout(() => {
                setFilter(index, `${name}=${value}`);
            }, 300);
        } else {
            setFilter(index, "");
        }

        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, [value]);

    return (
        <div className="h-fit w-full">
            <p className="capitalize text-sm text-gray-400">{name}</p>
            <Input classNames={{ inputWrapper: "dark:bg-black/90 bg-white rounded-sm" }}
                type={name === "price" || name === "manufactureYear" ? "number" : "text"}
                isClearable
                onClear={() => setValue("")}
                placeholder="..."
                radius="none"
                onChange={(e) => setValue(e.currentTarget.value)}
            />
        </div>
    );
}