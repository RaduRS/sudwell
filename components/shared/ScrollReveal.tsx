"use client";

import { useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  y?: number;
  once?: boolean;
};

export function ScrollReveal({
  children,
  className,
  delayMs = 0,
  y = 18,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<"pre" | "hidden" | "visible">("pre");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) {
      window.requestAnimationFrame(() => setPhase("visible"));
      return;
    }

    let observer: IntersectionObserver | null = null;

    const setup = () => {
      const rect = el.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.9 &&
        rect.bottom > window.innerHeight * 0.1;

      if (inView) {
        setPhase("visible");
        return;
      }

      setPhase("hidden");
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          if (!entry.isIntersecting) return;
          setPhase("visible");
          if (once) observer?.disconnect();
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
      );
      observer.observe(el);
    };

    window.requestAnimationFrame(setup);
    return () => observer?.disconnect();
  }, [once]);

  const shouldAnimate = phase !== "pre";
  const isVisible = phase === "visible";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(shouldAnimate
          ? {
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translate3d(0, 0, 0)"
                : `translate3d(0, ${y}px, 0)`,
              transitionProperty: "opacity, transform",
              transitionDuration: "520ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${delayMs}ms`,
              willChange: "opacity, transform",
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
}
