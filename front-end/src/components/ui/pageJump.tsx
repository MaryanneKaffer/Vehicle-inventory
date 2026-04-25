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
        <div className="rounded-md md:h-auto h-14 flex flex-col">
            <Button radius="none" className="rounded-t-sm min-w-0 bg-gray-300/80 lg:dark:bg-default/60 dark:bg-default/90 backdrop-blur-lg text-warning" aria-label="go to the top" onPress={() => handleScroll("top")}>
                <FaAngleUp className="lg::text-[20px] text-[12px]" /></Button>
            <Button radius="none" className="rounded-b-sm min-w-0 bg-gray-300/80 lg:dark:bg-default/60 dark:bg-default/90 backdrop-blur-lg text-warning" aria-label="go to the end" onPress={() => handleScroll("end")}>
                <FaAngleDown className="lg::text-[20px] text-[12px]" /></Button>
        </div>
    )
}