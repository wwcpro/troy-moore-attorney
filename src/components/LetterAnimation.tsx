"use client";

import { useEffect, useRef } from "react";
import { animateLetters } from "@/lib/gsap";

interface LetterAnimationProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  className?: string;
  scrollTrigger?: boolean;
  delay?: number;
}

export default function LetterAnimation({
  text,
  as: Tag = "h2",
  className = "",
  scrollTrigger = true,
  delay,
}: LetterAnimationProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tl = animateLetters(ref.current, {
      scrollTrigger,
      delay,
    });
    return () => {
      tl?.kill();
    };
  }, [scrollTrigger, delay]);

  const letters = text.split("").map((char, i) => (
    <span
      key={i}
      className={`letter-span${char === " " ? " space" : ""}`}
      style={{ opacity: 0 }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {letters}
    </Tag>
  );
}
