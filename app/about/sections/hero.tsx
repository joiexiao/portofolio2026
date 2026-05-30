"use client";

import TransitionLink from "@/components/transition-link";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import { ScrambleText } from "@/components/scramble-text";

/* ===============================
   WORD POSITIONS (PX BASED)
================================ */
const words = [
  // top arc
  { text: "bonjour", x: -120, y: -80, size: "text-sm" },
  { text: "greetings", x: -10, y: -90, size: "text-sm" },
  { text: "ahoj", x: 70, y: -75, size: "text-sm" },

  // upper mid
  { text: "marheba", x: -140, y: -50, size: "text-sm" },
  { text: "assalamualaikum", x: -10, y: -50, size: "text-sm" },
  { text: "guten tag", x: 140, y: -45, size: "text-sm" },

  // mid
  { text: "geia", x: -140, y: -20, size: "text-sm" },
  { text: "kamusta", x: -160, y: 5, size: "text-sm" },
  { text: "bok", x: -155, y: 29, size: "text-sm" },
  { text: "konnichiwa", x: 160, y: -5, size: "text-sm" },

  // bottom mid
  { text: "hola", x: -120, y: 55, size: "text-sm" },
  { text: "nihao", x: -60, y: 60, size: "text-sm" },
  { text: "privet", x: 30, y: 60, size: "text-sm" },
  { text: "opa", x: 100, y: 45, size: "text-sm" },
  { text: "salve", x: 150, y: 30, size: "text-sm" },

  // bottom arc
  { text: "ciao", x: -110, y: 85, size: "text-sm" },
  { text: "salut", x: -48, y: 90, size: "text-sm" },
  { text: "bangawoyo", x: 30, y: 90, size: "text-sm" },
  { text: "allo", x: 110, y: 72, size: "text-sm" },
];

export default function Hero() {
  const itemsRef = useRef<HTMLSpanElement[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [startScramble, setStartScramble] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // ✅ Tunggu element ready dulu
    if (!titleRef.current) return;

    const timer = setTimeout(() => {
      gsap.from(titleRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
          setStartScramble(true);
        },
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  /* ===============================
     INITIAL STATE
  ================================ */
  useEffect(() => {
    if (itemsRef.current.length === 0) return;

    gsap.set(itemsRef.current, {
      opacity: 0,
      scale: 0.85,
      filter: "blur(4px)",
    });
  }, []);

  /* ===============================
     ANIMATIONS
  ================================ */
  const show = () => {
    setIsHovered(true);
    gsap.to(itemsRef.current, {
      opacity: 0.9,
      scale: 1,
      filter: "blur(0px)",
      stagger: {
        amount: 0.6,
        from: "random",
      },
      duration: 0.5,
      ease: "back.out(1.6)",
    });
  };

  const hide = () => {
    setIsHovered(false);
    gsap.to(itemsRef.current, {
      opacity: 0,
      scale: 0.85,
      filter: "blur(4px)",
      stagger: {
        amount: 0.3,
        from: "random",
      },
      duration: 0.35,
      ease: "power2.in",
    });
  };

  /* ===============================
     RENDER
  ================================ */
  return (
    <section className="min-h-screen flex items-center justify-center">
      {/* CENTER WRAPPER */}
      <div className="relative">
        {/* HELLO */}
        <h1
          ref={titleRef}
          onMouseEnter={show}
          onMouseLeave={hide}
          className="
            relative z-10
            font-mono font-bold
            text-5xl
sm:text-6xl
            leading-none
            cursor-pointer
            select-none
            hero-title
            text-primary
              underline underline-offset-8 decoration-4
    hover:bg-primary
    hover:text-background
          "
          style={{
            textShadow: isHovered ? "0 0 40px rgba(96,165,250,0.5)" : "none",
          }}
          data-cursor="hover"
        >
          <ScrambleText text="hello!" start={startScramble} duration={0.9} />
        </h1>

        {/* WORD CLOUD */}
        <div className="absolute inset-0 pointer-events-none">
          {words.map((item, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className={`
                absolute
                font-mono
                ${item.size}
                text-white
                whitespace-nowrap
              `}
              style={{
                left: `calc(50% + ${item.x}px)`,
                top: `calc(50% + ${item.y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
