import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const MobileNav = () => {
    const { pathname } = useLocation();
    return (<section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <img src="/icons/hamburger.svg" width={36} height={36} alt="hamburger icon" className="cursor-pointer sm:hidden"/>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link to="/" className="flex items-center gap-1">
            <img src="/icons/logo.svg" width={32} height={32} alt="yoom logo"/>
            <p className="text-[26px] font-extrabold text-white">YOOM</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className=" flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
            return (<SheetClose asChild key={item.route}>
                      <Link to={item.route} key={item.label} className={cn('group relative isolate flex w-full max-w-60 items-center gap-4 overflow-hidden rounded-lg p-4 transition-all duration-300 ease-out', isActive
                    ? 'bg-blue-1 text-white'
                    : 'text-sky-1 hover:text-white hover:translate-x-1')}>
                        <span className={cn("pointer-events-none absolute inset-0 -z-10 rounded-lg transition-all duration-300 ease-out", isActive
                    ? "bg-blue-1 opacity-100 scale-100"
                    : "bg-[#3a4667] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100")}/>
                        <img src={item.imgURL} alt={item.label} width={20} height={20} className={cn("transition-transform duration-300 ease-out", !isActive && "group-hover:scale-105")}/>
                        <p className={cn("font-semibold transition-transform duration-300 ease-out", !isActive && "group-hover:translate-x-0.5")}>{item.label}</p>
                      </Link>
                    </SheetClose>);
        })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>);
};
export default MobileNav;
