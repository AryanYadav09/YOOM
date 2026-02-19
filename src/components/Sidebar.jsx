import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              to={item.route}
              key={item.label}
              className={cn(
                "group relative isolate flex items-center justify-start gap-4 overflow-hidden rounded-lg p-4 transition-all duration-300 ease-out",
                isActive
                  ? "bg-blue-1 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                  : "text-sky-1 hover:text-white hover:-translate-y-0.5"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none absolute inset-0 -z-10 rounded-lg transition-all duration-300 ease-out",
                  isActive
                    ? "bg-blue-1 opacity-100 scale-100"
                    : "bg-[#3a4667] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                )}
              />
              <span
                className={cn(
                  "pointer-events-none absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-white/80 transition-all duration-300",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                )}
              />
              <img
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
                className={cn(
                  "transition-transform duration-300 ease-out",
                  !isActive && "group-hover:translate-x-0.5 group-hover:scale-105"
                )}
              />
              <p
                className={cn(
                  "text-lg font-semibold max-lg:hidden transition-transform duration-300 ease-out",
                  !isActive && "group-hover:translate-x-1"
                )}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
