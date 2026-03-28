import DefaultLayout from "@/layouts/default";
import SearchComponent from "@/components/ui/searchComponent";
import { ThemeSwitch } from "@/components/features/theme-switch";
import VehiclesList from "@/components/features/vehiclesList";
import { useEffect, useState } from "react";
import PostComponent from "@/components/features/postComponent";
import { GetVehicles, Vehicle } from "@/api/vehicles";
import PageNavigation from "@/components/ui/pagination";
import { Button } from "@heroui/button";
import { MdDelete } from "react-icons/md";
import Resize from "@/components/utils/resize";
import { GrView } from "react-icons/gr";
import PageJump from "@/components/ui/pageJump";

export default function IndexPage() {
  const [filter, setFilter] = useState<string[]>([]);
  const [apiLength, setApiLength] = useState(0);
  const [page, setPage] = useState(1);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [apiPages, setApiPages] = useState(0);
  const [mbDelete, setMbDelete] = useState(false);
  const [mbView, setMbView] = useState(false);
  const [screen, setScreen] = useState("");
  const [isOpenFiltering, setFiltering] = useState(false)

  useEffect(() => {
    GetVehicles({ filter: filter.filter(Boolean).join("&"), page, setMessage, setLoading, setVehicles, setApiLength, setApiPages });
  }, [page, filter]);

  return (
    <DefaultLayout>
      <Resize setScreen={setScreen} />
      <section className="flex flex-col items-center gap-2 sm:gap-4">
        <div className="flex w-full gap-2 dark:bg-default/60 bg-gray-300/90 rounded-[3px] p-3 items-center justify-between">
          <ThemeSwitch />
          <p className="text-warning">{apiLength} vehicles registered</p>
        </div>
        <div className="h-full w-full flex lg:flex-row flex-col gap-2 sm:gap-4">
          <div className="relative sticky top-5 -mx-4 lg:m-0 px-4 z-50 dark:bg-default/0 bg-gray-300/90 lg:p-0 py-2 backdrop-blur-md lg:w-fit w-[100dvw] items-center h-fit ">
            {screen.includes("small") && < div className="flex gap-1 items-center">
              <Button color="warning" radius="none" className="rounded-sm flex-1" onPress={() => setFiltering(!isOpenFiltering)} >Set filters</Button>
              <PostComponent setPage={setPage} />
              <Button variant={mbView ? "shadow" : "ghost"} color="warning" radius="none" onPress={() => { setMbView(!mbView); setMbDelete(false) }} className="w-[50px] min-w-0 p-0 rounded-sm">
                <GrView size={18} />
              </Button>
              <Button variant={mbDelete ? "shadow" : "ghost"} color="danger" radius="none" onPress={() => { setMbDelete(!mbDelete); setMbView(false) }} className="w-[50px] min-w-0 p-0 rounded-sm">
                <MdDelete size={20} />
              </Button>
            </div>}
            <div className={`xl:w-[300px] lg:w-[200px w-[100%] lg:flex absolute flex-col gap-4 lg:dark:bg-default/60 lg:bg-gray-300/90 bg-transparent rounded-sm lg:p-3 lg:sticky h-fit top-10 
              ${isOpenFiltering ? "block" : "lg:block hidden"} -mx-4 lg:m-0 px-4 py-3 `}>
              <SearchComponent setFilter={setFilter} />
              {!screen.includes("small") && <PostComponent setPage={setPage} />}
            </div>
          </div>
          <div className="flex-1 w-full justify-items-center">
            <VehiclesList setApiLength={setApiLength} setPage={setPage} vehicles={vehicles} loading={loading} message={message} apiPages={apiPages} mbDelete={mbDelete} screen={screen} mbView={mbView} />
            {!message && <PageNavigation apiPages={apiPages} setPage={setPage} page={page} />}
          </div>
          {!screen.includes("small") && <div className="w-10">
            <PageJump />
          </div>}
        </div>
      </section>
    </DefaultLayout >
  );
}
