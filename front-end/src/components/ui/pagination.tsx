import { Pagination } from "@heroui/react";

export default function PageNavigation({ apiPages, setPage }: { apiPages: number, setPage: (page: number) => void }) {
    return (
        <Pagination isCompact color="warning" radius="sm" variant="flat" showControls className="mx-auto rounded-sm" initialPage={1} total={apiPages} onChange={(page: number) => setPage(page)} />
    );
}