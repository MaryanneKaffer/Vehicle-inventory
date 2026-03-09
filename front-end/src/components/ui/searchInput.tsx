import { Input } from "@heroui/react";
import { SearchIcon } from "./icons";

export default function App() {
    return (
        <div className="flex-1 w-full">
            <Input
                isClearable
                classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "py-5.5",
                        "shadow-sm",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focus=true]:bg-default-200/50",
                        "dark:group-data-[focus=true]:bg-default/60",
                        "cursor-text!",
                    ],
                }}
                placeholder="Type to search..."
                radius="lg"
                startContent={
                    <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0" />
                }
            />
        </div>
    );
}