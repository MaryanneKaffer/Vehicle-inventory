import SearchInput from "../utils/searchInput";

export default function SearchComponent({ setFilter }: { setFilter: React.Dispatch<React.SetStateAction<string[]>> }) {
    const fields = ["name", "brand", "model", "price", "manufactureYear"];

    const setFilterAtIndex = (index: number, filter: string) => {
        setFilter((prev) => {
            const next = [...prev];
            next[index] = filter;
            return next;
        });
    };

    return (
        <div className="flex flex-col gap-2 lg:bg-transparent bg-default lg:p-0 px-2 py-3 rounded-sm">
            {fields.map((field, index) => (
                <SearchInput
                    key={index}
                    index={index}
                    name={field}
                    setFilter={setFilterAtIndex}
                />
            ))}
        </div>
    );
}