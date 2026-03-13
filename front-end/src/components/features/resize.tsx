import { useEffect } from "react";

export default function Resize({ setScreen }: { setScreen: (screen: string) => void }) {

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;

            const screen = width > 1500 ? "large" : width > 1200
                ? "medium" : width > 900 ? "small" : "xsmall";

            setScreen(screen);
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setScreen]);

    return null;
}