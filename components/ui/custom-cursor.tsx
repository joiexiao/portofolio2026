"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ECHO_COUNT = 3;
const LERP = 0.25;

const HOVER_COLORS = ["#A7CAFF", "#FF7CD8", "#7CFFD2", "#FFD37C"];

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hoverRingRef = useRef<HTMLDivElement | null>(null);
  const innerCoreRef = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const corePosition = useRef({ x: 0, y: 0 });

  const bounceTl = useRef<gsap.core.Timeline | null>(null);
  const colorTl = useRef<gsap.core.Timeline | null>(null);
  const colorDelayRef = useRef<gsap.core.Tween | null>(null);

  const [isHovering, setIsHovering] = useState(false);

  const positions = useRef(
    Array.from({ length: ECHO_COUNT }, () => ({ x: 0, y: 0 })),
  );

  // ✅ detect mobile
  useEffect(() => {
    const checkDevice = () => {
      const isTouchDevice =
        window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches;

      const isSmallScreen = window.innerWidth < 1024;

      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    const root = document.documentElement;

    if (isMobile) {
      root.classList.remove("cursor-none");
    } else {
      root.classList.add("cursor-none");
    }
  }, [isMobile]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const updateHoverState = (e: PointerEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setIsHovering(!!el?.closest("[data-cursor='hover']"));
    };

    window.addEventListener("pointermove", move, true);
    window.addEventListener("pointermove", updateHoverState);

    const tick = () => {
      positions.current.forEach((pos, i) => {
        const target = i === 0 ? mouse.current : positions.current[i - 1];
        pos.x += (target.x - pos.x) * LERP;
        pos.y += (target.y - pos.y) * LERP;

        const el = dotsRef.current[i];
        if (!el) return;

        const scale = i === 0 ? 1 : i === 1 ? 0.65 : 0.4;
        gsap.set(el, { x: pos.x, y: pos.y, scale });
      });

      if (hoverRingRef.current) {
        gsap.set(hoverRingRef.current, {
          x: mouse.current.x,
          y: mouse.current.y,
        });
      }

      if (innerCoreRef.current) {
        corePosition.current.x +=
          (mouse.current.x - corePosition.current.x) * 0.08;
        corePosition.current.y +=
          (mouse.current.y - corePosition.current.y) * 0.08;

        gsap.set(innerCoreRef.current, {
          x: corePosition.current.x,
          y: corePosition.current.y,
        });
      }
    };

    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("pointermove", move, true);
      window.removeEventListener("pointermove", updateHoverState);
      gsap.ticker.remove(tick);
    };
  }, []);

  useEffect(() => {
    if (!hoverRingRef.current || !innerCoreRef.current) return;

    bounceTl.current?.kill();
    gsap.killTweensOf([hoverRingRef.current, innerCoreRef.current]);

    if (isHovering) {
      bounceTl.current = gsap.timeline();

      bounceTl.current
        .set([hoverRingRef.current, innerCoreRef.current], {
          scale: 0,
          opacity: 0,
        })
        .to(hoverRingRef.current, {
          scale: 1,
          opacity: 0.3,
          duration: 0.08,
          ease: "power2.out",
        })
        .to(
          innerCoreRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.06,
            ease: "power2.out",
          },
          "<",
        )
        .to(hoverRingRef.current, {
          scale: 1.12,
          duration: 0.035,
          ease: "none",
        })
        .to(hoverRingRef.current, {
          scale: 0.96,
          duration: 0.04,
          ease: "none",
        })
        .to(hoverRingRef.current, {
          scale: 1.04,
          duration: 0.04,
          ease: "none",
        })
        .to(hoverRingRef.current, {
          scale: 0.99,
          duration: 0.04,
          ease: "none",
        })
        .to(hoverRingRef.current, {
          scale: 1,
          duration: 0.05,
          ease: "power2.out",
        })
        .to(
          innerCoreRef.current,
          {
            scale: 1.06,
            duration: 0.04,
            ease: "none",
          },
          "-=0.22",
        )
        .to(innerCoreRef.current, {
          scale: 1,
          duration: 0.06,
          ease: "power2.out",
        });
    } else {
      gsap.to([hoverRingRef.current, innerCoreRef.current], {
        scale: 0,
        opacity: 0,
        duration: 0.12,
        ease: "power2.inOut",
      });
    }
  }, [isHovering]);

  useEffect(() => {
    const els = [
      ...dotsRef.current,
      hoverRingRef.current,
      innerCoreRef.current,
    ].filter(Boolean) as HTMLElement[];

    colorTl.current?.kill();
    colorDelayRef.current?.kill();
    colorTl.current = null;
    colorDelayRef.current = null;

    if (isHovering && els.length) {
      gsap.set(els, { backgroundColor: HOVER_COLORS[0] });

      colorDelayRef.current = gsap.delayedCall(5, () => {
        if (!isHovering) return;

        colorTl.current = gsap.timeline({ repeat: -1 });

        HOVER_COLORS.slice(1).forEach((color) => {
          colorTl.current!.to(els, {
            backgroundColor: color,
            duration: 1.2,
            ease: "power1.inOut",
          });
          colorTl.current!.to({}, { duration: 5 });
        });
      });
    } else {
      gsap.to(els, {
        backgroundColor: "",
        duration: 0.25,
        ease: "power2.out",
      });
    }

    return () => {
      colorTl.current?.kill();
      colorDelayRef.current?.kill();
    };
  }, [isHovering]);
  // ✅ TARO DISINI
  if (isMobile === null || isMobile) return null;

  return (
    <>
      {Array.from({ length: ECHO_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el;
          }}
          className="bg-primary/80"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 16,
            height: 16,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 100000, // ✅ UBAH: 9999 → 100000
          }}
        />
      ))}

      <div
        ref={hoverRingRef}
        className="bg-primary"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 48,
          height: 48,
          borderRadius: "50%",
          transform: "translate(-50%, -50%) scale(0)",
          pointerEvents: "none",
          zIndex: 100001, // ✅ UBAH: 10000 → 100001
          opacity: 0,
        }}
      />

      <div
        ref={innerCoreRef}
        className="bg-primary"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          transform: "translate(-50%, -50%) scale(0)",
          pointerEvents: "none",
          zIndex: 100002, // ✅ UBAH: 10001 → 100002
          opacity: 0,
        }}
      />
    </>
  );
}
