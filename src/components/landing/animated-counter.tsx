"use client";

import * as React from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  decimals = 0,
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const nodeRef = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (!isInView || !nodeRef.current) return;

    const node = nodeRef.current;
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate(value) {
        if (decimals > 0) {
          node.textContent = value.toFixed(decimals) + suffix;
        } else {
          node.textContent = Math.round(value).toLocaleString() + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [from, to, duration, decimals, suffix, isInView]);

  return (
    <span ref={nodeRef} className={className}>
      {from.toLocaleString()}
      {suffix}
    </span>
  );
}

