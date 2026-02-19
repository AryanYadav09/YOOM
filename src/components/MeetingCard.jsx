import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import AnimatedButtonText from "./ui/animated-button-text";
import { avatarImages } from "@/constants";
import { useToast } from "./ui/use-toast";
import { useTiltCard } from "@/hooks/useTiltCard";

const MeetingCard = ({
    icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon1,
    handleClick,
    link,
    buttonText,
    showAvatars = true,
}) => {
    const { toast } = useToast();
    const { cardRef, contentRef, glowRef } = useTiltCard({
        tilt: 8,
        shift: 6,
        scale: 1.02,
    });
    const showActionButtons = !isPreviousMeeting;
    const showFooter = showAvatars || showActionButtons;
    return (<section ref={cardRef} className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px] relative overflow-hidden">
      <span ref={glowRef} className="pointer-events-none absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-1/30 opacity-0 blur-3xl"/>
      <div ref={contentRef} className="relative z-10 flex h-full flex-col justify-between">
      <article className="flex flex-col gap-5">
        <img src={icon} alt="upcoming" width={28} height={28}/>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      {showFooter && (<article className={cn("flex justify-center relative", {})}>
        {showAvatars && (<div className="relative flex w-full max-sm:hidden">
            {avatarImages.map((img, index) => (<img key={index} src={img} alt="attendees" width={40} height={40} className={cn("rounded-full", { absolute: index > 0 })} style={{ top: 0, left: index * 28 }}/>))}
            <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
              +5
            </div>
          </div>)}
        {showActionButtons && (<div className="flex gap-2">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {buttonIcon1 && (<img src={buttonIcon1} alt="feature" width={20} height={20}/>)}
              <span className="ml-2">
                <AnimatedButtonText text={buttonText || "Start"}/>
              </span>
            </Button>
            <Button onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                    title: "Link Copied",
                });
            }} className="bg-dark-4 px-6">
              <img src="/icons/copy.svg" alt="feature" width={20} height={20}/>
              <span className="ml-2">
                <AnimatedButtonText text="Copy Link"/>
              </span>
            </Button>
          </div>)}
      </article>)}
      </div>
    </section>);
};
export default MeetingCard;
