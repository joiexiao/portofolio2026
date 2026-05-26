"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedNoise } from "@/components/animated-noise";

gsap.registerPlugin(ScrollTrigger);

const signals = [
  {
    title: "Research & Discovery",
    note: "Understanding the brief, context, and audience before creating anything.",
  },
  {
    title: "Define the Direction",
    note: "Defining the core problem, goals, and creative direction.",
  },
  {
    title: "Explore & Experiment",
    note: "Exploring ideas and visual possibilities through iteration.",
  },
  {
    title: "Design & Build",
    note: "Crafting clear, intentional designs based on chosen directions.",
  },
  {
    title: "Refine & Deliver",
    note: "Refining details and delivering polished design outcomes.",
  },
];

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !wrapperRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const wrapper = wrapperRef.current;

    const getScrollDistance = () => {
      // Gunakan wrapper width bukan window.innerWidth biar lebih akurat
      return track.scrollWidth - wrapper.offsetWidth;
    };

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance() + 200}`, // Tambahin 200px extra space
          scrub: 1.5, // Lebih smooth
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="signals"
      className="relative py-32 pl-6 md:pl-28"
    >
      {/* HEADER */}
      <div className="mb-16 pr-6 md:pr-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          01 / Process
        </span>
        <h2 className="mt-4 text-5xl md:text-7xl tracking-tight">
          Inside the Process
        </h2>
      </div>

      {/* VIEWPORT - kasih ref */}
      <div ref={wrapperRef} className="overflow-hidden pr-6 md:pr-12">
        {/* TRACK */}
        <div ref={trackRef} className="flex gap-12">
          {signals.map((signal, index) => (
            <article
              key={index}
              data-cursor="hover"
              className="group relative flex-shrink-0 w-[420px]
                         transition-transform duration-500 ease-out
                         hover:-translate-y-2"
            >
              <div className="bg-card/50 backdrop-blur-xl border border-border/50 p-8">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  NO. {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-6 text-2xl tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {signal.title}
                </h3>

                <div className="w-12 h-px bg-accent my-6 transition-all duration-500 group-hover:w-full" />

                <p className="font-mono text-xs text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground">
                  {signal.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
