import { Link } from "@heroui/link";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen px-4 sm:px-0">
      <main className="container mx-auto flex-grow pt-12">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/MaryanneKaffer"
          title="github"
        >
          Made by <span className="text-warning">Maryanne Kâffer</span>
        </Link>
      </footer>
    </div>
  );
}
