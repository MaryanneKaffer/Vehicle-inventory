import { useContext, useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import SearchComponent from "@/components/ui/searchComponent";
import { ThemeSwitch } from "@/components/features/theme-switch";
import VehiclesList from "@/components/features/vehiclesList";
import PostComponent from "@/components/features/postVehicleComponent";
import PageNavigation from "@/components/ui/pagination";
import { Button } from "@heroui/button";
import Resize from "@/components/utils/resize";
import PageJump from "@/components/ui/pageJump";
import { FaCar } from "react-icons/fa";
import LoginInfo from "@/components/ui/loginInfo";
import { AuthContext } from "@/context/authContext";
import { Tooltip } from "@heroui/react";

export default function IndexPage() {
  const [filter, setFilter] = useState<string[]>([]);
  const [apiLength, setApiLength] = useState(0);
  const [page, setPage] = useState(1);
  const [apiPages, setApiPages] = useState(0);
  const [screen, setScreen] = useState("");
  const [isOpenFiltering, setFiltering] = useState(false)
  const [isOpenPost, setOpenPost] = useState(false);
  const { user } = useContext(AuthContext);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [message, setMessage] = useState("");

  function PostBtn() {
    const handleOpen = () => {
      if (user) { setOpenPost(true); }
      setOpenTooltip(true)
    };
    return (
      <Tooltip delay={200} content={!user && "Login first"} className={`${user && "hidden"}`} placement="bottom" isOpen={screen.includes("small") ? openTooltip : undefined} onOpenChange={screen.includes("small") ? setOpenTooltip : undefined}  >
        <Button variant={user ? "ghost" : "flat"} size="md" color={user ? "warning" : undefined} radius="none" aria-label="Post vehicle" onPress={handleOpen}
          className={`rounded-sm w-full ${!user && "dark:bg-gray-700 bg-gray-400 cursor-default"} transition-opacity`}>
          Register a Vehicle
        </Button>
      </Tooltip>
    );
  }

  useEffect(() => {
    if (screen !== "" && !screen.includes("small")) setShowSidebar(true);
    if (screen && screen.includes("small")) {
      const handleScroll = () => setShowSidebar(window.scrollY > 150);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [screen]);

  return (
    <DefaultLayout>
      <Resize setScreen={setScreen} />
      <section className="flex flex-col items-center gap-2 sm:gap-4">
        <div className="flex w-full gap-2 dark:bg-default/60 bg-gray-300/90 rounded-[3px] p-3 items-center justify-between h-12">
          <LoginInfo />
          <ThemeSwitch />
        </div>
        <div className="h-full w-full flex lg:flex-row flex-col gap-2 sm:gap-4">
          <div className="relative left-0 sticky top-2 -mx-6 xl:m-0 px-5 md:-mx-12 md:px-12 z-50 dark:bg-default/0 bg-gray-300/90 xl:p-0 py-2 lg:backdrop-blur-none backdrop-blur-md lg:w-fit w-[100dvw] items-center h-fit ">
            {screen.includes("small") && < div className="flex gap-1 items-center">
              <Button color="warning" radius="none" className="rounded-sm flex-1 min-w-16" onPress={() => setFiltering(!isOpenFiltering)} >Filters</Button>
              <PostBtn />
            </div>}
            <div className={`xl:w-[300px] lg:w-[200px] w-[100%] lg:flex absolute flex-col gap-4 lg:dark:bg-default/60 lg:bg-gray-300/90 bg-transparent rounded-sm lg:p-3 lg:sticky h-fit top-10 
              ${isOpenFiltering ? "block" : "lg:block hidden"} -mx-5 lg:m-0 px-5 py-3 `}>
              <SearchComponent setFilter={setFilter} />
              {!screen.includes("small") && <PostBtn />}
            </div>
          </div>
          <div className="flex-1 w-full justify-items-center">
            <VehiclesList setPage={setPage} screen={screen} logged={user} filter={filter} message={message} setMessage={setMessage} setApiLength={setApiLength} setApiPages={setApiPages} page={page} />
            {!message && <PageNavigation apiPages={apiPages} setPage={setPage} page={page} />}
          </div>
          <div className={`lg:w-10 w-[100dvw] transition-all ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="flex lg:flex-col -mx-5 xl:m-0 px-5  md:-mx-12 md:px-12  lg:-mx-0 lg:px-0 w-full lg:gap-2 gap-1 lg:sticky fixed lg:top-5 top-17 justify-between">
              <PageJump />
              <span className="w-10 p-2 lg:bg-gray-300/80 lg:dark:bg-default/60 dark:bg-default/90 backdrop-blur-lg rounded-sm text-warning items-center justify-center flex flex-col">
                <FaCar className="md:text-[16px] text-[12px]" />
                <p className="md:text-base text-sm">{apiLength}</p>
              </span>
            </div>
          </div>
        </div>
      </section>
      {isOpenPost && user && <PostComponent setPage={setPage} logged={user || undefined} isOpen={isOpenPost} change={() => setOpenPost(!isOpenPost)} />}
    </DefaultLayout >
  );
}
