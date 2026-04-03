import { Button } from "@heroui/button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function PageJump() {
    const handleScroll = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };
    return (
        <div className="rounded-md flex flex-col">
            <Button radius="none" className="rounded-t-sm min-w-0 bg-gray-300 dark:bg-default/60 text-warning" aria-label="go to the top" onPress={() => handleScroll("top")}>
                <FaAngleUp size={20} /></Button>
            <Button radius="none" className="rounded-b-sm min-w-0 bg-gray-300 dark:bg-default/60 text-warning" aria-label="go to the end" onPress={() => handleScroll("end")}>
                <FaAngleDown size={20} /></Button>
        </div>
    )
}