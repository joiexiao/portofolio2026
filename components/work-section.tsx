"use client";

import { useRef, useEffect } from "react";
import TransitionLink from "@/components/transition-link";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedNoise } from "@/components/animated-noise";

gsap.registerPlugin(ScrollTrigger);

export const experiments = [
  {
    title: "Amaliah ASTRA",
    slug: "amaliah-astra",
    medium: "Graphic Designer",
    description: "Symbolic visual mockups design.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Malky Joki",
    slug: "malky-joki",
    medium: "Graphic Designer",
    description:
      "Price list & promotional posters for Instagram feeds and stories.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Think Store",
    slug: "think-store",
    medium: "Graphic Designer",
    description:
      "Logo design and promotional posters for Instagram feeds and stories",
    span: "col-span-2 row-span-1",
  },
  {
    title: "Museum Virtual Bela Negara",
    slug: "museum-virtual",
    medium: "UI UX Designer",
    description:
      "Design system, Website mockups (Lo-Fi → Hi-Fi), Visual assets.",
    span: "col-span-2 row-span-1",
  },
  {
    title: "Levi Camp",
    slug: "levi-camp",
    medium: "UI UX Designer",
    description: "Design system, Website mockups (Lo-Fi → Hi-Fi).",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Fund Small Capital",
    slug: "fund-small-capital",
    medium: "UI UX Designer",
    description:
      "Design system, UML, Website mockups (Lo-Fi → Hi-Fi), Zine, Visual assets.",
    span: "col-span-1.4 row-span-1",
  },
  {
    title: "Common Ground Project",
    slug: "common-ground-project",
    medium: "UI UX Designer",
    description: "Design system, Website mockups (Lo-Fi → Hi-Fi).",
    span: "col-span-2 row-span-1",
  },
];

export function WorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // HEADER
      gsap.fromTo(
        headerRef.current!,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current!,
            start: "top 90%",
          },
        },
      );

      // CARDS
      const cards = gridRef.current!.querySelectorAll("article");

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current!,
            start: "top 90%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-32   pl-6 lg:pl-24
  pr-6 lg:pr-24"
    >
      {/* HEADER */}
      <div ref={headerRef} className="mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            02 / Work
          </span>
          <h2 className="mt-4  text-4xl md:text-6xl lg:text-7xl tracking-tight">
            Selected Works
          </h2>
        </div>

        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          Studies across interface design, agent systems, and visual
          computation.
        </p>
      </div>

      {/* GRID */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]"
      >
        {experiments.map((experiment, index) => (
          <TransitionLink
            key={experiment.slug}
            href={`/selected-work/${experiment.slug}`}
            className={cn("block", experiment.span)}
          >
            <article
              data-cursor="hover"
              className="group relative h-full border border-border/40 p-5 flex flex-col justify-between overflow-hidden transition-colors duration-500 hover:border-accent/60 bg-card/50 backdrop-blur-lg"
            >
              {/* HOVER BG */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* CONTENT */}
              <div className="relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {experiment.medium}
                </span>
                <h3 className="mt-3  text-2xl md:text-4xl tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {experiment.title}
                </h3>
              </div>

              {/* DESCRIPTION */}
              <div className="relative z-10">
                <p className="font-mono text-xs text-muted-foreground leading-relaxed max-w-[280px] opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {experiment.description}
                </p>
              </div>

              {/* INDEX */}
              <span className="absolute bottom-4 right-4 font-mono text-[10px] text-muted-foreground/40 transition-colors duration-300 group-hover:text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* CORNER */}
              <div className="absolute top-0 right-0 w-12 h-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
              </div>
            </article>
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
