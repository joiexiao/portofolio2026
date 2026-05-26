"use client";

import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import { ScrambleText } from "@/components/scramble-text";

export default function Intro() {
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

  return (
    <section className="w-screen h-screen flex-shrink-0">
      <div className="h-full max-w-6xl mx-auto px-16 flex items-center justify-center">
        <h1
          ref={titleRef}
          className="
            intro-title
            font-sans
            font-medium 
            text-6xl
            leading-none
            select-none
            text-primary
          "
        >
          <ScrambleText
            text="A short preface"
            start={startScramble}
            duration={0.9}
          />
        </h1>
      </div>
    </section>
  );
}
