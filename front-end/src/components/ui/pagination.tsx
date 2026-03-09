import { Pagination } from "@heroui/react";

export default function PageNavigation({ apiPages, setPage }: { apiPages: number, setPage: (page: number) => void }) {
    return (
        <Pagination isCompact radius="sm" showControls className="mx-auto" initialPage={1} total={apiPages} onChange={(page: number) => setPage(page)} />
    );
}