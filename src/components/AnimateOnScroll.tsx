"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type AnimateVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-in"
  | "scale-up";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  variant?: AnimateVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export function AnimateOnScroll({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration,
  once = true,
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const style: CSSProperties = {
    ...(delay > 0 ? { animationDelay: `${delay}ms` } : {}),
    ...(duration ? { animationDuration: `${duration}ms` } : {}),
  };

  return (
    <div
      ref={ref}
      className={`motion-reveal motion-${variant} ${visible ? "motion-visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
