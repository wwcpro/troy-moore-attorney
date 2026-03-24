"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Animate each letter-span child inside `container`. */
export function animateLetters(
  container: HTMLElement,
  opts?: { delay?: number; scrollTrigger?: boolean }
) {
  const letters = container.querySelectorAll<HTMLElement>(".letter-span");
  if (!letters.length) return;

  const tl = gsap.timeline(
    opts?.scrollTrigger
      ? {
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
          },
        }
      : opts?.delay
      ? { delay: opts.delay }
      : {}
  );

  tl.fromTo(
    letters,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: "power3.out",
    }
  );

  return tl;
}

/** Generic scroll-reveal: fade + slide up */
export function scrollReveal(
  elements: HTMLElement | HTMLElement[] | NodeListOf<Element>,
  opts?: { stagger?: number; delay?: number; y?: number }
) {
  gsap.fromTo(
    elements,
    { opacity: 0, y: opts?.y ?? 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: opts?.stagger ?? 0.15,
      delay: opts?.delay ?? 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: elements instanceof NodeList ? (elements[0] as HTMLElement) : (Array.isArray(elements) ? elements[0] : elements),
        start: "top 85%",
        once: true,
      },
    }
  );
}
