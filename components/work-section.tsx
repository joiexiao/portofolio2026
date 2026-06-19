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
    title: "Malky Joki",
    slug: "malky-joki",
    medium: "Graphic Designer",
    description:
      "Designed Instagram promotional posters for feeds and stories with consistent visuals.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Amaliah ASTRA",
    slug: "amaliah-astra",
    medium: "Graphic Designer",
    description: "Designed symbolic visual mockups with a conceptual approach.",
    span: "col-span-2 row-span-1",
  },
  {
    title: "Think Store",
    slug: "think-store",
    medium: "Graphic Designer",
    description:
      "Designed Instagram promotional posters for feeds and stories.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Fund Small Capital",
    slug: "fund-small-capital",
    medium: "UI UX Designer",
    description:
      "Designed an e-learning platform with a user-centered UX approach, along with a zine to promote and communicate the community’s value.",
    span: "col-span-2 row-span-1",
  },
  {
    title: "Museum Virtual Bela Negara",
    slug: "museum-virtual",
    medium: "UI UX Designer",
    description:
      "Designed a virtual museum experience to showcase collections through intuitive navigation and engaging visual storytelling.",
    span: "col-span-2 row-span-1",
  },
  {
    title: "Levi Camp",
    slug: "levi-camp",
    medium: "UI UX Designer",
    description:
      "Designed a camp reservation platform with a focus on clear booking flow and seamless user experience.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Common Ground Project",
    slug: "common-ground-project",
    medium: "UI UX Designer",
    description:
      "Designed a design system and website mockups, supported by user research, wireframing, and prototyping.",
    span: "col-span-2 row-span-1",
  },
  {
    medium: "Coming Soon!",
    slug: "about",
    title: "Would You?",
    span: "col-span-1 row-span-1",
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
      className="relative py-32 pl-6 lg:pl-24
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
      </div>

      {/* GRID */}
      <div
        ref={gridRef}
        className="
    grid
    grid-cols-1
    md:grid-cols-4
    gap-4
    md:gap-6
    auto-rows-auto
    md:auto-rows-[200px]
  "
      >
        {experiments.map((experiment, index) => {
          const href =
            experiment.slug === "about"
              ? "/about"
              : `/selected-work/${experiment.slug}`;

          return (
            <TransitionLink
              key={experiment.slug}
              href={href}
              className={cn(
                "block col-span-1",
                experiment.span
                  .replace("col-span-1", "md:col-span-1")
                  .replace("col-span-2", "md:col-span-2")
                  .replace("row-span-1", "md:row-span-1"),
              )}
            >
              <article
                data-cursor="hover"
                className="
            group
            relative
            min-h-[180px]
            md:h-full
            border
            border-border/40
            px-5
            py-6
            sm:px-8
            md:p-5
            overflow-hidden
            transition-colors
            duration-500
            hover:border-accent/60
            bg-card/50
            backdrop-blur-lg
          "
              >
                {/* HOVER BG */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 transition-opacity duration-500 md:group-hover:opacity-100" />

                {/* CONTENT */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    {/* ROLE */}
                    <span
                      className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-widest
                  text-muted-foreground
                  transition-opacity
                  duration-300
                  opacity-100
                  md:group-hover:opacity-0
                "
                    >
                      {experiment.medium}
                    </span>

                    {/* TITLE */}
                    <h3
                      className="
                  mt-3
                  text-2xl
                  md:text-4xl
                  tracking-tight
                  transition-all
                  duration-500
                  md:group-hover:-translate-y-4
                  md:group-hover:text-accent
                "
                    >
                      {experiment.title}
                    </h3>
                  </div>

                  {/* DESCRIPTION */}
                  <div
                    className="
                relative
                mt-6
                md:mt-0
                md:absolute
                md:bottom-5

                z-10
              "
                  >
                    <p
                      className="
                  font-mono
                  text-xs
                  text-accent
                  leading-relaxed
   

                  opacity-100
                  translate-y-0

                  md:opacity-0
                  md:translate-y-6

                  transition-all
                  duration-500

                  md:group-hover:opacity-100
                  md:group-hover:translate-y-0
                "
                    >
                      {experiment.description}
                    </p>
                  </div>
                </div>

                {/* INDEX */}
                <span className="absolute top-6 right-6 font-mono text-[10px] text-muted-foreground/40 transition-colors duration-300 group-hover:text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* CORNER */}
                <div className="absolute top-0 right-0 w-12 h-12 opacity-0 transition-opacity duration-500 md:group-hover:opacity-100">
                  <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
                  <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
                </div>
              </article>
            </TransitionLink>
          );
        })}
      </div>
    </section>
  );
}
