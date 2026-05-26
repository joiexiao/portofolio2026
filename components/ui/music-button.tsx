"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, Minus } from "lucide-react";
import gsap from "gsap";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isManuallyPausedRef: React.MutableRefObject<boolean>;
};

export function MusicButton({ audioRef, isManuallyPausedRef }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🔥 SOFT APPEAR ANIMATION (DELAYED)
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.set(containerRef.current, {
      autoAlpha: 0,
      y: 20,
      scale: 0.96,
    });

    gsap.to(containerRef.current, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1.1,
      delay: 2.4, // ⏱️ delay muncul
      ease: "power3.out",
    });
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      isManuallyPausedRef.current = true;
    } else {
      audio.volume = 0.6;
      audio.play().catch(() => {});
      isManuallyPausedRef.current = false;
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[999] w-20 h-20 flex items-center justify-center"
    >
      {/* ROTATING CIRCULAR TEXT */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 animate-spin-slow pointer-events-none"
      >
        <defs>
          <path
            id="circlePath"
            d="
              M 50, 50
              m -40, 0
              a 40,40 0 1,1 80,0
              a 40,40 0 1,1 -80,0
            "
          />
        </defs>

        <text
          fill="white"
          fontSize="9.5"
          letterSpacing="0.32em"
          className="uppercase font-mono opacity-80"
        >
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            Play for the full experience
          </textPath>
        </text>
      </svg>

      {/* BUTTON */}
      <button
        onClick={toggleMusic}
        className={`
          relative z-10
          w-14 h-14 rounded-full
          flex items-center justify-center
          transition-all duration-300
          border border-white/30
          ${
            isPlaying
              ? "bg-white text-black"
              : "bg-black text-white hover:bg-white hover:text-black"
          }
        `}
        aria-label="Toggle music"
        data-cursor="hover"
      >
        {isPlaying ? <Minus size={18} /> : <Activity size={18} />}
      </button>

      {/* CSS */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 14s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
