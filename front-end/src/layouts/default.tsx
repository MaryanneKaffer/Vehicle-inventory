import { Link } from "@heroui/link";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col px-4 xl:px-0" id="top">
      <main className="flex-1 px-1 md:px-8 xl:px-22 pt-12 w-full">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3" id="end">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/MaryanneKaffer"
          title="github"
        >
          Made by <span className="text-warning">Maryanne Käffer</span>
        </Link>
      </footer>
    </div>
  );
}
