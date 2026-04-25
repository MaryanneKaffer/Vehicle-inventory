import { Pagination } from "@heroui/react";

export default function PageNavigation({ apiPages, setPage, page }: { apiPages: number, setPage: (page: number) => void, page: number }) {
    return (
        <Pagination isCompact color="warning" radius="sm" variant="flat" showControls page={page} className="md:m-4 mt-4" aria-label={`page ${page}`}
            classNames={{
                cursor: "!rounded-[3px]", next: "!rounded-[3px] bg-gray-300/80 dark:bg-default/60 text-warning ", prev: "!rounded-[3px] bg-gray-300/80 dark:bg-default/60 text-warning",
                item: "bg-gray-300/80 dark:bg-default/60 text-warning"
            }}
            initialPage={1} total={apiPages} onChange={(page: number) => setPage(page)} />
    );
}