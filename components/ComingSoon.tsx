"use client";
import { X } from "lucide-react";
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

  const { onReady } = usePageTransition();

  // Animasi bars — nunggu page transition selesai dulu
  useEffect(() => {
    const ctx = gsap.context(() => {
      onReady(() => {
        const tl = gsap.timeline();

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
            duration: 0.15,
            stagger: 0.025,
            ease: "none",
          },
          "-=0.15",
        );
      });
    });

    return () => ctx.revert();
  }, [filledBars]);

  // Animasi counter — nunggu page transition selesai dulu
  useEffect(() => {
    const ctx = gsap.context(() => {
      onReady(() => {
        const counter = { value: 0 };

        gsap.to(counter, {
          value: progress,
          duration: 1.4,
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

    return () => ctx.revert();
  }, [progress]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
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
          bg-zinc-900/90
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
              <p
                className="
                text-[10px]
                sm:text-xs
                font-light
                uppercase
                tracking-[0.2em]
                text-white
              "
              >
                Progress
              </p>

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
                  ref={(el) => {
                    barsRef.current[i] = el;
                  }}
                  className="
                  h-12
                  sm:h-16
                  md:h-20
                  flex-1
                  bg-zinc-700
                "
                />
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
    text-xs
    sm:text-sm
    text-zinc-500
  "
              >
                Last updated ·{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <TransitionLink
                href="/"
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
