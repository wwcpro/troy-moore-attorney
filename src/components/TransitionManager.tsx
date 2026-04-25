"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { TransitionContext } from "@/context/TransitionContext";

export default function TransitionManager({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const prevPath = useRef<string | null>(null);
  const transitioning = useRef(false);

  // Initial load — sliding doors
  const coverRef     = useRef<HTMLDivElement>(null);
  const iconRef      = useRef<HTMLDivElement>(null);
  const vertClipRef  = useRef<SVGRectElement>(null);
  const horizClipRef = useRef<SVGRectElement>(null);
  const navyL  = useRef<HTMLDivElement>(null);
  const navyR  = useRef<HTMLDivElement>(null);
  const goldL  = useRef<HTMLDivElement>(null);
  const goldR  = useRef<HTMLDivElement>(null);

  // Route transitions — horizontal microfiche slide
  const pageRef    = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* ── navigate: cover phase → router.push ─────────────────── */
  const navigate = useCallback((href: string) => {
    if (transitioning.current) return;
    transitioning.current = true;

    const page    = pageRef.current;
    const overlay = overlayRef.current;
    if (!page || !overlay) { router.push(href); return; }

    document.body.style.overflow = "hidden";
    gsap.set(overlay, { x: "100%", autoAlpha: 1 });
    gsap.set(page, { x: 0 });

    gsap.timeline({
      onComplete: () => { router.push(href); },
    })
      .to(page,    { x: "-8vw", duration: 0.48, ease: "power3.inOut" })
      .to(overlay, { x: 0,      duration: 0.52, ease: "power3.inOut" }, "<");
  }, [router]);

  /* ── Initial load: sliding door reveal (home only) ──────────── */
  useEffect(() => {
    prevPath.current = pathname;
    document.body.style.overflow = "hidden";

    gsap.set([navyL.current, goldL.current], { x: 0 });
    gsap.set([navyR.current, goldR.current], { x: 0 });

    const tl = gsap.timeline();
    tl
      .fromTo(iconRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.52, ease: "power3.out" }
      )
      .fromTo(vertClipRef.current,
        { attr: { y: 130, height: 0 } },
        { attr: { y: 12, height: 118 }, duration: 0.45, ease: "power2.inOut" },
        "-=0.1"
      )
      .fromTo(horizClipRef.current,
        { attr: { x: 12, width: 0 } },
        { attr: { x: 12, width: 104 }, duration: 0.38, ease: "power2.out" }
      )
      .to(iconRef.current, { duration: 0.2 })
      .to(iconRef.current, { opacity: 0, y: -18, duration: 0.28, ease: "power2.in" })
      .to(goldL.current,  { x: "-100%", duration: 0.6, ease: "power4.inOut" }, "<0.05")
      .to(goldR.current,  { x:  "100%", duration: 0.6, ease: "power4.inOut" }, "<")
      .to(navyL.current, {
        x: "-100%", duration: 0.6, ease: "power4.inOut",
        onStart: () => {
          setLoaderDone(true);
          gsap.set(coverRef.current, { autoAlpha: 0 });
        },
      }, "+=0.08")
      .to(navyR.current, {
        x: "100%", duration: 0.6, ease: "power4.inOut",
        onComplete: () => { document.body.style.overflow = ""; },
      }, "<");

    return () => { tl.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Route-change: reveal phase only ────────────────────────── */
  useEffect(() => {
    if (!prevPath.current || prevPath.current === pathname) return;
    prevPath.current = pathname;

    window.scrollTo({ top: 0, behavior: "instant" });

    const page    = pageRef.current;
    const overlay = overlayRef.current;
    if (!page || !overlay) return;

    // New page starts offscreen right; overlay is currently covering at x: 0
    gsap.set(page, { x: "8vw" });

    gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        transitioning.current = false;
        gsap.set(page, { clearProps: "transform" });
        window.scrollTo({ top: 0, behavior: "instant" });
      },
    })
      .to(overlay, { x: "-100%", duration: 0.52, ease: "power3.inOut" })
      .to(page,    { x: 0,       duration: 0.52, ease: "power3.inOut" }, "<");
  }, [pathname]);

  /* ── Shared door panel style ─────────────────────────────────── */
  const door = (side: "left" | "right", bg: string, z: number): React.CSSProperties => ({
    position: "fixed", top: 0, [side]: 0,
    width: "50%", height: "100%",
    zIndex: z, background: bg, pointerEvents: "none",
  });

  return (
    <TransitionContext.Provider value={{ loaderDone, navigate }}>

      {/* Page wrapper */}
      <div ref={pageRef} style={{ width: "100%" }}>
        {children}
      </div>

      {/* Navy overlay for route transitions */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed", inset: 0,
          zIndex: 9990,
          background: "var(--navy)",
          pointerEvents: "none",
          visibility: "hidden",
        }}
      />

      {/* Initial-paint cover */}
      <div ref={coverRef} style={{ position: "fixed", inset: 0, zIndex: 9994, background: "#ffffff", pointerEvents: "none" }} />

      {/* Sliding door panels — initial load only */}
      <div ref={navyL}  style={door("left",  "var(--navy)", 9995)} />
      <div ref={navyR}  style={door("right", "var(--navy)", 9995)} />
      <div ref={goldL}  style={door("left",  "#ffffff",     9997)} />
      <div ref={goldR}  style={door("right", "#ffffff",     9997)} />

      {/* T icon — initial load only */}
      <div
        ref={iconRef}
        style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, pointerEvents: "none" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.758 139.553" width={90} height={98}>
          <defs>
            <clipPath id="tm-gold-fill-clip">
              <rect ref={vertClipRef}  x="56" y="130" width="18" height="0" />
              <rect ref={horizClipRef} x="12" y="12"  width="0"  height="22" />
            </clipPath>
          </defs>
          <path d="M64.3224,139.553C34.8128,131.2003,11.7701,110.1826.1372,82.0988L0,8.6404c42.1108-11.4441,85.3467-11.6006,127.6814.0119l.0766,72.9038c-11.3857,28.064-33.556,48.8461-63.4356,57.9969ZM64.373,134.9394c27.5795-8.8877,48.2091-28.3722,58.9485-54.22l-.158-68.742C83.7988,1.8556,43.6361,1.9497,4.4508,12.0193l.1065,69.1919c11.0312,26.1797,32.3254,45.6334,59.8156,53.7281Z" fill="#19365a" />
          <path d="M99.1859,104.1624c-.0089,3.9602-4.3474,6.4193-6.908,7.8748l-.4166-74.1504c-.012-2.1348-6.9064-1.9823-8.4811-1.6993l-.2265,81.2607c-.0085,3.0544-4.6115,4.4886-7.0286,4.8756l-.0733-94.3989c14.0495,1.2567,27.2029,3.1906,40.633,7.0623l-.0069,44.4338c-1.6448,4.9401-3.6683,9.4044-7.0308,13.0981l-.2864-51.4312c-3.2344-2.1411-6.668-2.463-10.0277-2.241l-.147,65.3154Z" fill="#19365a" />
          <path d="M35.1901,111.2401c-2.5796-.4427-6.7501-3.3811-6.7642-6.7138l-.2772-65.7057c-1.7026.0298-9.2541.0012-9.2925,2.4195l-.8184,51.5867c-2.304-3.9336-6.2675-8.3374-6.544-13.2967-.8292-14.8749-.2313-29.3659-.2489-44.5313,13.5745-4.0178,26.358-5.7671,40.4236-7.0485l-.0842,94.4813c-2.6067-.5686-6.9764-2.1426-6.9824-5.0582l-.1661-80.87c-1.0543-.7605-8.7399-.8012-8.755,1.4642l-.4907,73.2725Z" fill="#19365a" />
          <path d="M67.4229,124.8935c.0045,2.509-2.5711,2.6184-3.547,2.6617s-3.5992-.2344-3.5986-2.1166l.0351-106.7206c-15.799.2091-32.9977,3.0821-47.9534,6.6938-2.0636-.8482-1.6758-5.9132.1504-7.3077,34.0494-8.704,69.2303-8.7209,103.1275.0709,1.6604,2.4478,1.6378,5.1321.4671,7.7807-16.0988-4.9001-32.3513-6.5871-48.8735-7.2965l.1923,106.2343Z" fill="#eeeeee" />
          <path d="M67.4229,124.8935c.0045,2.509-2.5711,2.6184-3.547,2.6617s-3.5992-.2344-3.5986-2.1166l.0351-106.7206c-15.799.2091-32.9977,3.0821-47.9534,6.6938-2.0636-.8482-1.6758-5.9132.1504-7.3077,34.0494-8.704,69.2303-8.7209,103.1275.0709,1.6604,2.4478,1.6378,5.1321.4671,7.7807-16.0988-4.9001-32.3513-6.5871-48.8735-7.2965l.1923,106.2343Z" fill="#ccaf6e" clipPath="url(#tm-gold-fill-clip)" />
        </svg>
      </div>

    </TransitionContext.Provider>
  );
}
