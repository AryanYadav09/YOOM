import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useTiltCard = ({ tilt = 12, shift = 10, scale = 1.02 } = {}) => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current || card;
    const glow = glowRef.current;

    if (!card || !content) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    gsap.set(card, {
      transformPerspective: 1200,
      transformStyle: "preserve-3d",
      willChange: "transform",
    });
    gsap.set(content, {
      transformStyle: "preserve-3d",
      willChange: "transform",
    });

    const rotateYTo = gsap.quickTo(card, "rotateY", {
      duration: 0.35,
      ease: "power3.out",
    });
    const rotateXTo = gsap.quickTo(card, "rotateX", {
      duration: 0.35,
      ease: "power3.out",
    });
    const scaleTo = gsap.quickTo(card, "scale", {
      duration: 0.35,
      ease: "power2.out",
    });
    const xTo = gsap.quickTo(content, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(content, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const glowXTo =
      glow &&
      gsap.quickTo(glow, "x", {
        duration: 0.3,
        ease: "power3.out",
      });
    const glowYTo =
      glow &&
      gsap.quickTo(glow, "y", {
        duration: 0.3,
        ease: "power3.out",
      });
    const glowOpacityTo =
      glow &&
      gsap.quickTo(glow, "opacity", {
        duration: 0.3,
        ease: "power2.out",
      });

    const onPointerEnter = () => {
      scaleTo(scale);
      if (glowOpacityTo) glowOpacityTo(0.8);
    };

    const onPointerMove = (event) => {
      const rect = card.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const px = localX / rect.width - 0.5;
      const py = localY / rect.height - 0.5;

      rotateYTo(px * tilt);
      rotateXTo(-py * tilt);
      xTo(px * shift);
      yTo(py * shift);

      if (glowXTo && glowYTo) {
        glowXTo(localX - rect.width * 0.5);
        glowYTo(localY - rect.height * 0.5);
      }
    };

    const onPointerLeave = () => {
      rotateYTo(0);
      rotateXTo(0);
      scaleTo(1);
      xTo(0);
      yTo(0);

      if (glowOpacityTo) glowOpacityTo(0);
      if (glowXTo) glowXTo(0);
      if (glowYTo) glowYTo(0);
    };

    card.addEventListener("pointerenter", onPointerEnter);
    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerleave", onPointerLeave);

    return () => {
      card.removeEventListener("pointerenter", onPointerEnter);
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [scale, shift, tilt]);

  return { cardRef, contentRef, glowRef };
};
