import DefaultLayout from "@/layouts/default";
import SearchComponent from "@/components/features/searchComponent";
import { ThemeSwitch } from "@/components/features/theme-switch";
import VehiclesList from "@/components/features/vehiclesList";
import { useState } from "react";
import PostComponent from "@/components/features/postComponent";

export default function IndexPage() {
  const [filter, setFilter] = useState<string[]>([]);
  const [apiLength, setApiLength] = useState(0);
  const [page, setPage] = useState(1);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-4 py-8 md:py-1 0">
        <div className="flex w-full gap-2 bg-default/70 dark:bg-default/70 rounded-sm p-3 items-center justify-between">
          <ThemeSwitch />
          <p className="text-warning">{apiLength} vehicles registered</p>
        </div>
        <div className="h-full w-full flex gap-4">
          <div className="w-[300px] flex flex-col gap-4 bg-default/70 dark:bg-default/70 rounded-sm p-3 sticky top-32 h-fit">
            <SearchComponent setFilter={setFilter} />
            <PostComponent setPage={setPage} />
          </div>
          <VehiclesList filter={filter.filter(Boolean).join("&")} setApiLength={setApiLength} setPage={setPage} page={page} />
        </div>
      </section>
    </DefaultLayout>
  );
}
