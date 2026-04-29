import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";

export default function PageSize() {
    const [value, setValue] = useState("20");
    const items = ["10", "20", "30", "40", "50", "100"];

    return (
        <div className="flex items-center gap-2 mt-1">
            <span className="w-full ">Vehicles per page:</span>
            <Select radius="none" className="rounded-sm w-full" size="sm"
                classNames={{ listboxWrapper: "dark:bg-secondary", innerWrapper: "dark:bg-secondary", trigger: "dark:bg-secondary hover:dark:bg-secondary/80" }}
                selectedKeys={new Set([value])}
                onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    if (selected) {
                        setValue(selected);
                        localStorage.setItem("pageSize", selected);
                        window.dispatchEvent(new Event("pageSizeChange"));
                    }
                }}
            >
                {items.map((item) => (
                    <SelectItem key={item} >
                        {item}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}