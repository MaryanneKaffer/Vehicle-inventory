import { Button } from "@heroui/button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function PageJump() {
    return (
        <div className="sticky top-5 rounded-md flex flex-col">
            <Button as="a" radius="none" className="rounded-t-sm min-w-0 bg-gray-300 dark:bg-default/60 text-warning" href="#top"><FaAngleUp size={20} /></Button>
            <Button as="a" radius="none" className="rounded-b-sm min-w-0 bg-gray-300 dark:bg-default/60 text-warning" href="#end"><FaAngleDown size={20} /></Button>
        </div>
    )
}