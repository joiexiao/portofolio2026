"use client";
import { X } from "lucide-react";
import { Dot } from "lucide-react";
import TransitionLink from "@/components/transition-link";
import { BitmapChevron } from "@/components/bitmap-chevron";
import { ScrambleTextOnHover } from "@/components/scramble-text";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { usePageTransition } from "@/components/page-transition";

interface ComingSoonProps {
  title: string;
  roles: string[];
  progress: number;
}

export default function ComingSoon({
  title,
  roles,
  progress,
}: ComingSoonProps) {
  const totalBars = 48;
  const filledBars = Math.round((progress / 100) * totalBars);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLParagraphElement>(null);
  const progressDotsRef = useRef<HTMLSpanElement>(null);
  const idleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { onReady } = usePageTransition();

  const startIdleAnimation = () => {
    const remainingBars = barsRef.current.slice(filledBars).filter(Boolean);

    if (!remainingBars.length) return;

    let current = 0;
    let isResetting = false;

    gsap.set(remainingBars, {
      backgroundColor: "#3f3f46",
    });

    const tick = () => {
      if (isResetting) return; // skip tick selama reset masih jalan

      if (current >= remainingBars.length) {
        isResetting = true;

        gsap.to(remainingBars, {
          backgroundColor: "#3f3f46",
          duration: 0.2,
          overwrite: true,
          onComplete: () => {
            current = 0;
            isResetting = false;
          },
        });

        return;
      }

      gsap.to(remainingBars[current], {
        backgroundColor: "rgb(92, 116, 148)",
        duration: 0.18,
        ease: "none",
        overwrite: true,
      });

      current++;
    };

    idleIntervalRef.current = setInterval(tick, 140);
  };
  // Animasi bars — nunggu page transition selesai dulu
  useEffect(() => {
    const ctx = gsap.context(() => {
      onReady(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            startIdleAnimation();
          },
        });

        tl.fromTo(
          barsRef.current.filter(Boolean),
          {
            scaleY: 0,
            opacity: 0,
            transformOrigin: "bottom",
          },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.25,
            stagger: 0.015,
            ease: "power2.out",
          },
        );

        tl.fromTo(
          barsRef.current.slice(0, filledBars),
          {
            backgroundColor: "#3f3f46",
          },
          {
            backgroundColor: "var(--color-primary)",
            duration: 0.001,
            stagger: 0.025,
            ease: "none",
            immediateRender: false,
          },
          "-=0.15",
        );
      });
    });

    return () => {
      ctx.revert();

      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
      }
    };
  }, [filledBars]);

  // Animasi counter — nunggu page transition selesai dulu
  useEffect(() => {
    const ctx = gsap.context(() => {
      onReady(() => {
        const counter = { value: 0 };

        gsap.to(counter, {
          value: progress,
          duration: 2,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => {
            if (progressRef.current) {
              progressRef.current.textContent = `${counter.value}%`;
            }
          },
        });
      });
    });

    return () => {
      ctx.revert();

      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
      }
    };
  }, [progress]);

  useEffect(() => {
    let dotsInterval: NodeJS.Timeout;

    const ctx = gsap.context(() => {
      onReady(() => {
        const dots = ["", ".", "..", "..."];
        let current = 0;

        dotsInterval = setInterval(() => {
          if (progressDotsRef.current) {
            progressDotsRef.current.textContent = dots[current];
          }

          current = (current + 1) % dots.length;
        }, 450);
      });
    });

    return () => {
      clearInterval(dotsInterval);
      ctx.revert();
    };
  }, [onReady]);

  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-black">
      {/* Background */}
      <div
        className="grid-bg fixed inset-0 opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="
        relative z-10
        flex min-h-screen items-center justify-center
        px-4 py-10
        sm:px-6
        md:px-10
      "
      >
        <div
          className="
          w-full
          max-w-4xl
          border border-zinc-800
          bg-zinc-900/10
          backdrop-blur-sm
        "
        >
          <div
            className="
            w-full
            p-5
            sm:p-6
            md:p-8
            lg:p-10
          "
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <span
                    key={role}
                    className="
                    border border-zinc-700
                    px-2.5 py-1
                    text-[10px]
                    sm:text-xs
                    font-light
                    uppercase
                    tracking-[0.18em]
                    text-zinc-400
                  "
                  >
                    {role}
                  </span>
                ))}
              </div>

              <button className="shrink-0 text-zinc-500 transition hover:text-primary">
                <X
                  onClick={() => window.history.back()}
                  data-cursor="hover"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                />
              </button>
            </div>

            <div className="mt-4 border-t border-zinc-800" />

            {/* Title */}
            <h1
              className="
              mt-6
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-light
              tracking-tight
              leading-none
              text-white
            "
            >
              {title}
            </h1>

            {/* Description */}
            <p
              className="
              mt-4
              max-w-2xl
              text-sm
              sm:text-base
              md:text-lg
              leading-6
              sm:leading-7
              text-zinc-400
            "
            >
              This project is currently under development and isn't available
              publicly yet. You can preview it once development has been
              completed.
            </p>

            {/* Progress Header */}
            <div className="mt-8 flex items-center justify-between">
              <div
                className="
    flex items-center
    text-[10px]
    sm:text-xs
    font-light
    uppercase
    tracking-[0.2em]
    text-white
  "
              >
                <span>Progress</span>

                <span
                  ref={progressDotsRef}
                  className="min-w-[20px]text-[10px]
    sm:text-xs
    font-light
    uppercase
    tracking-[0.2em]
    text-white"
                >
                  .
                </span>
              </div>

              <p
                ref={progressRef}
                className="
                text-sm
                sm:text-base
                font-light
                text-white
              "
              >
                0%
              </p>
            </div>

            {/* Progress Grid */}
            <div className="mt-3 flex gap-[2px] sm:gap-[4px]">
              {Array.from({ length: totalBars }).map((_, i) => (
                <div
                  key={i}
                  className="
        relative
        overflow-hidden
        h-12
        sm:h-16
        md:h-20
        flex-1
      "
                  // outer tetep transparent, cuma jadi wadah ukuran + overflow-hidden
                >
                  <div
                    ref={(el) => {
                      barsRef.current[i] = el;
                    }}
                    className="absolute inset-0 bg-zinc-700"
                    // inner pegang background permanen dari class, ga pernah di-opacity-0-in lagi
                  />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="
    mt-8
    border-t border-zinc-800
    pt-6
    flex items-center justify-between
    gap-4
  "
            >
              <p
                className="
      flex items-center gap-1
      text-xs
      sm:text-sm
      text-zinc-500
    "
              >
                <Dot
                  strokeWidth={12}
                  className="
        h-3 w-3
        text-green-500
        animate-[pulse_1.4s_ease-in-out_infinite]
      "
                />{" "}
                Last Update
                <span>
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </p>

              <TransitionLink
                href="/#work"
                data-cursor="hover"
                className="
      shrink-0
      group
      inline-flex
      items-center
      gap-2
      border border-foreground/40
      px-3 sm:px-4
      py-2
      font-mono
      text-[8px]
      sm:text-[10px]
      uppercase
      tracking-[0.25em]
      text-foreground
      transition-all duration-200
      hover:border-accent
      hover:text-accent
    "
              >
                <ScrambleTextOnHover
                  text="View More Projects"
                  as="span"
                  duration={0.6}
                />

                <BitmapChevron
                  className="
        hidden sm:block
        transition-transform
        duration-[400ms]
        ease-in-out
        group-hover:rotate-45
      "
                />
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
