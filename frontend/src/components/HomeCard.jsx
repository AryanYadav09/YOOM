import { cn } from '@/lib/utils';
import { useTiltCard } from "@/hooks/useTiltCard";

const HomeCard = ({ className, img, title, description, handleClick }) => {
    const { cardRef, contentRef, glowRef } = useTiltCard({
        tilt: 10,
        shift: 8,
        scale: 1.03,
    });
    return (<section ref={cardRef} data-home-card className={cn('bg-[#8b5d45] px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer relative overflow-hidden', className)} onClick={handleClick}>
      <span ref={glowRef} className="pointer-events-none absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35 opacity-0 blur-3xl"/>
      <div ref={contentRef} className="relative z-10 flex size-full flex-col justify-between">
      <div className="flex items-center justify-center glassmorphism size-12 rounded-[10px] ">
        <img src={img} alt="meeting" width={27} height={27}/>
      </div>
      
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
      </div>
    </section>);
};
export default HomeCard;
