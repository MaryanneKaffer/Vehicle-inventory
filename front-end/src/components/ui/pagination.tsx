import { Pagination } from "@heroui/react";

export default function PageNavigation({ apiPages, setPage, page }: { apiPages: number, setPage: (page: number) => void, page: number }) {
    return ( 
        <Pagination isCompact color="warning" radius="sm" variant="flat" showControls page={page} className="md:mt-0 mt-4"
            classNames={{ cursor: "!rounded-[3px]", next: "!rounded-[3px]", prev: "!rounded-[3px]" }}
            initialPage={1} total={apiPages} onChange={(page: number) => setPage(page)} />
    );
}