import DefaultLayout from "@/layouts/default";
import SearchComponent from "@/components/features/searchComponent";
import { ThemeSwitch } from "@/components/features/theme-switch";
import VehiclesList from "@/components/features/vehiclesList";
import { useEffect, useState } from "react";
import PostComponent from "@/components/features/postComponent";
import { GetVehicles, Vehicle } from "@/api/vehicles";
import PageNavigation from "@/components/ui/pagination";
import { Button } from "@heroui/button";
import { MdDelete } from "react-icons/md";
import Resize from "@/components/features/resize";

export default function IndexPage() {
  const [filter, setFilter] = useState<string[]>([]);
  const [apiLength, setApiLength] = useState(0);
  const [page, setPage] = useState(1);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [apiPages, setApiPages] = useState(0);
  const [mbDelete, setMbDelete] = useState(false);
  const [screen, setScreen] = useState("");

  useEffect(() => {
    GetVehicles({ filter: filter.filter(Boolean).join("&"), page, setMessage, setLoading, setVehicles, setApiLength, setApiPages });
  }, [page, filter]);

  return (
    <DefaultLayout>
      <Resize setScreen={setScreen} />
      <section className="flex flex-col items-center gap-2 sm:gap-4 pb-12">
        <div className="flex w-full gap-2 bg-default/70 rounded-[3px] p-3 items-center justify-between">
          <ThemeSwitch />
          <p className="text-warning">{apiLength} vehicles registered</p>
        </div>
        <div className="h-full w-full flex sm:flex-row flex-col gap-2 sm:gap-4">
          {screen === "xsmall" && < div className="flex gap-1 items-center">
            <Button color="warning" radius="none" className="rounded-sm w-full">Set filters</Button>
            <Button variant={mbDelete ? "shadow" : "ghost"} color="danger" radius="none" onPress={() => setMbDelete(!mbDelete)} className="w-[50px] min-w-0 p-0 rounded-sm">
              <MdDelete size={20} />
            </Button>
          </div>}
          <div className="xl:w-[300px] flex flex-col gap-4 bg-default/70 rounded-sm p-3 sticky top-12 h-fit sm:block hidden">
            <SearchComponent setFilter={setFilter} />
            <PostComponent setPage={setPage} />
          </div>
          <div className="flex-1 justify-items-center">
            <VehiclesList setApiLength={setApiLength} setPage={setPage} vehicles={vehicles} loading={loading} message={message} apiPages={apiPages} mbDelete={mbDelete} screen={screen} />
            {!message && <PageNavigation apiPages={apiPages} setPage={setPage} page={page} />}
          </div>
        </div>
      </section>
    </DefaultLayout >
  );
}
