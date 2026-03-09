import DefaultLayout from "@/layouts/default";
import SearchInput from "@/components/ui/searchInput";
import { ThemeSwitch } from "@/components/features/theme-switch";
import VehiclesList from "@/components/features/vehiclesList";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-4 py-8 md:py-10">
        <div className="flex w-full gap-2">
          <SearchInput />
          <ThemeSwitch />
        </div>
        <div className="h-full w-full">
          <VehiclesList />
        </div>
      </section>
    </DefaultLayout>
  );
}
