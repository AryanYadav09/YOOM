import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { cn } from "@/lib/utils";

const AnimatedButtonText = ({ text, className }) => {
  const rootRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    const hostButton = root?.closest("button, a");

    if (!root || !top || !bottom || !hostButton) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    gsap.set(bottom, { yPercent: 120 });

    const timeline = gsap.timeline({
      paused: true,
      defaults: { duration: 0.35, ease: "power3.out" },
    });

    timeline
      .to(top, { yPercent: -120 }, 0)
      .to(bottom, { yPercent: 0 }, 0)
      .to(
        hostButton,
        {
          scale: 1.02,
          y: -1,
          duration: 0.28,
          ease: "power2.out",
        },
        0
      );

    const onEnter = () => timeline.play();
    const onLeave = () => timeline.reverse();

    hostButton.addEventListener("pointerenter", onEnter);
    hostButton.addEventListener("pointerleave", onLeave);

    return () => {
      hostButton.removeEventListener("pointerenter", onEnter);
      hostButton.removeEventListener("pointerleave", onLeave);
      timeline.kill();
      gsap.set(hostButton, { clearProps: "transform" });
    };
  }, []);

  return (
    <>
      <span
        ref={rootRef}
        aria-hidden="true"
        className={cn(
          "relative inline-flex h-[1.1em] overflow-hidden align-middle leading-none",
          className
        )}
      >
        <span ref={topRef} className="inline-block">
          {text}
        </span>
        <span ref={bottomRef} className="absolute left-0 top-0 inline-block">
          {text}
        </span>
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
};

export default AnimatedButtonText;
