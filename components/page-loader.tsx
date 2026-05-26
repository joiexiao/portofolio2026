"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  onFinish: () => void;
};

export default function PageLoader({ onFinish }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // LEFT
  const leftWrapRef = useRef<HTMLDivElement>(null);
  const leftInnerRef = useRef<HTMLDivElement>(null);

  // CENTER
  const centerRef = useRef<HTMLSpanElement>(null);

  // RIGHT
  const rightRef = useRef<HTMLSpanElement>(null);

  const isExiting = useRef(false);
  const [ready, setReady] = useState(false);

  /* ================= LEFT — SCROLLING BOOT LOG ================= */
  useEffect(() => {
    if (!leftInnerRef.current || !leftWrapRef.current) return;

    const originalLines = Array.from(
      leftInnerRef.current.children,
    ) as HTMLElement[];

    const lineHeight = originalLines[0].offsetHeight + 8;

    // duplicate biar infinite
    leftInnerRef.current.innerHTML += leftInnerRef.current.innerHTML;

    const lines = Array.from(leftInnerRef.current.children) as HTMLElement[];

    lines.forEach((line) => {
      line.style.transition = "background-color 0.25s ease, color 0.25s ease";
    });

    const wrapperRect = leftWrapRef.current.getBoundingClientRect();

    // ini posisi Y baris ke-3 di dalam wrapper
    const triggerY = lineHeight * 2;

    const scrollTween = gsap.to(leftInnerRef.current, {
      y: `-=${lineHeight * originalLines.length}`,
      duration: 8,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        lines.forEach((line) => {
          const rect = line.getBoundingClientRect();

          // posisi line relatif ke wrapper
          const relativeTop = rect.top - wrapperRect.top;

          const isOnThirdLine =
            relativeTop >= triggerY - lineHeight / 2 &&
            relativeTop <= triggerY + lineHeight / 2;
          line.style.transition =
            "background-color 0.25s ease, color 0.25s ease, border 0.25s ease";

          if (isOnThirdLine) {
            line.style.backgroundColor = "oklch(0.82 0.05 255)";
            line.style.color = "#000000"; // text hitam
            line.style.border = "1px solid hsl(var(--primary))"; // border primary
          } else {
            line.style.backgroundColor = "transparent";
            line.style.color = "";
            line.style.border = "none";
          }
        });
      },
    });

    return () => {
      scrollTween.kill();
    };
  }, []);
  /* ================= RIGHT — SCRAMBLE ================= */
  useEffect(() => {
    const text =
      "// Hang tight, Explorer. The data transfer is in progress. It might take a moment, but the journey ahead is worth the wait...";
    const GLYPHS = "!@#$%^&*()_+-=<>?/\\[]{}Xx";
    const chars = text.split("");
    const obj = { p: 0 };

    gsap.to(obj, {
      p: chars.length,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        const r = Math.floor(obj.p);
        let out = "";

        chars.forEach((c, i) => {
          if (i < r) out += c;
          else
            out +=
              c === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        });

        if (rightRef.current) rightRef.current.textContent = out;
      },
      onComplete: () => {
        if (rightRef.current) rightRef.current.textContent = text;
      },
    });
  }, []);

  /* ================= CENTER — COUNTER ================= */
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const counter = { v: 0 };

    gsap.to(counter, {
      v: 100,
      duration: 2,
      ease: "power3.out",
      onUpdate: () => {
        if (centerRef.current) {
          centerRef.current.textContent = `( ${Math.floor(counter.v)}% )`;
        }
      },
      onComplete: () => glitchEnter(),
    });

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const glitchEnter = () => {
    const ENTER = "ENTER";
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let frame = 0;

    gsap.to(
      {},
      {
        repeat: 12,
        duration: 0.03,
        onRepeat: () => {
          frame++;
          let out = "";

          for (let i = 0; i < ENTER.length; i++) {
            out +=
              i < frame / 2
                ? ENTER[i]
                : CHARS[(Math.random() * CHARS.length) | 0];
          }

          if (centerRef.current) centerRef.current.textContent = `( ${out} )`;
        },
        onComplete: () => {
          if (centerRef.current) centerRef.current.textContent = `( ENTER )`;
          setReady(true);
        },
      },
    );
  };

  const handleEnter = () => {
    if (!ready || isExiting.current) return;
    isExiting.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        onFinish();
      },
    });

    // subtle zoom dulu
    tl.to(containerRef.current, {
      opacity: 0.7,
      scale: 1.02,
      duration: 0.05,
    });

    // RGB glitch shadow
    tl.to(containerRef.current, {
      textShadow: `
      4px 0 0 #ff0000,
      -4px 0 0 #00ffff,
      0 4px 0 #00ff00
    `,
      duration: 0.1,
      repeat: 2,
      yoyo: true,
    });

    // horizontal shake
    tl.to(
      containerRef.current,
      {
        x: () => gsap.utils.random(-15, 15),
        duration: 0.04,
        repeat: 5,
        yoyo: true,
      },
      "-=0.15",
    );

    // scanline slice
    tl.to(containerRef.current, {
      clipPath: "polygon(0 40%, 100% 45%, 100% 55%, 0 50%)",
      duration: 0.1,
    });

    // restore clip
    tl.to(containerRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      x: 0,
      duration: 0.1,
    });

    // final collapse
    tl.to(containerRef.current, {
      opacity: 0,
      filter: "blur(15px) brightness(0)",
      y: -50,
      scale: 0.9,
      textShadow: "none",
      duration: 0.5,
      ease: "power3.in",
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] overflow-hidden bg-black font-mono text-primary"
    >
      {/* LEFT TEXT */}
      <div
        ref={leftWrapRef}
        className="
    absolute
    left-1/2 top-12
    w-[90%] max-w-[340px]
    -translate-x-1/2
    text-center

    sm:left-8 sm:top-1/2 sm:w-[300px]
    sm:-translate-x-0 sm:-translate-y-1/2
    sm:text-left

    md:left-10 md:w-[320px]
    lg:left-12 lg:w-[340px]
  "
      >
        <div
          className="
      relative overflow-hidden
      h-[110px]
      text-[10px] leading-relaxed

      sm:h-[120px] sm:text-xs
      md:h-[130px]
      lg:h-[140px] lg:text-sm
    "
        >
          <div ref={leftInnerRef} className="relative space-y-2">
            <p>// SYNCHRONIZING PARALLEL REALITIES...</p>
            <p>// TRANSMITTING QUANTUM SIGNALS...</p>
            <p>// UNLOCKING DIGITAL DIMENSIONS...</p>
            <p>// YOU'RE ABOUT TO ENTER THE FUTURE...</p>
            <p>// INITIALIZING NEURAL INTERFACE...</p>
            <p>// DECRYPTING DATA STREAMS...</p>
          </div>
        </div>
      </div>

      {/* CENTER LOADER */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <span
          ref={centerRef}
          onClick={ready ? handleEnter : undefined}
          className={`
          select-none
          text-xs tracking-wide

          sm:text-sm
          md:text-base

          ${
            ready ? "cursor-pointer hover:bg-primary hover:text-background" : ""
          }
        `}
          data-cursor="hover"
        >
          ( 0% )
        </span>
      </div>

      {/* RIGHT TEXT */}
      <div
        className="
        absolute
        bottom-12 left-1/2
        w-[90%] max-w-[300px]
        -translate-x-1/2
        text-center

        sm:bottom-auto sm:left-auto sm:right-8 sm:top-1/2
        sm:w-[260px] sm:max-w-none
        sm:translate-x-0 sm:-translate-y-1/2
        sm:text-right

        md:right-10 md:w-[300px]
        lg:right-12 lg:w-[340px]
      "
      >
        <span
          ref={rightRef}
          className="
          uppercase text-accent
          text-[10px]

          sm:text-xs
        "
        />
      </div>
    </div>
  );
}
