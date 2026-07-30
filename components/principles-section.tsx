"use client";

import { useRef, useEffect } from "react";
import { HighlightText } from "@/components/highlight-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedNoise } from "@/components/animated-noise";

gsap.registerPlugin(ScrollTrigger);

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  const principles = [
    {
      number: "01",
      label: "USER EXPERIENCE",
      titleParts: [
        { text: "UX ", highlight: false },
        { text: " RESEARCH", highlight: true },
      ],
      description:
        "Analyzing user needs and product requirements to create intuitive, well-structured interfaces.",
      align: "left",
    },
    {
      number: "02",
      label: "USER INTERFACE",
      titleParts: [
        { text: "UI ", highlight: true },
        { text: " DESIGN", highlight: false },
      ],
      description:
        "Crafting visually engaging interfaces that balance aesthetics, consistency, and functionality.",
      align: "right",
    },
    {
      number: "03",
      label: "GRAPHICS",
      titleParts: [
        { text: "GRAPHICS ", highlight: false },
        { text: "DESIGN", highlight: true },
      ],
      description:
        "Transforming ideas into compelling visuals that communicate with clarity and purpose.",
      align: "left",
    },
    {
      number: "04",
      label: "STRATEGY",
      titleParts: [
        { text: "DESIGN ", highlight: false },
        { text: " STRATEGY", highlight: true },
      ],
      description:
        "Aligning user needs and business goals to create purposeful digital experiences.",
      align: "right",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !principlesRef.current)
      return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      const articles = principlesRef.current?.querySelectorAll("article");

      articles?.forEach((article, index) => {
        const isRight = principles[index].align === "right";
        gsap.from(article, {
          x: isRight ? 80 : -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="principles"
      className="relative py-32   pl-6 lg:pl-24
  pr-6 lg:pr-24"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          03 / Work Scope
        </span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-7xl tracking-tight">
          Areas of Focus
        </h2>
      </div>

      {/* Principles */}
      <div ref={principlesRef} className="space-y-24 md:space-y-32">
        {principles.map((principle, index) => (
          <article
            key={index}
            data-cursor="hover"
            className={`group flex flex-col cursor-pointer ${
              principle.align === "right"
                ? "items-end text-right"
                : "items-start text-left"
            }`}
          >
            {/* Annotation */}
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4 group-hover:text-primary">
              {principle.number} / {principle.label}
            </span>

            {/* Title */}
            <h3 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-8xl max-w-4xl tracking-tight leading-none">
              {principle.titleParts.map((part, i) =>
                part.highlight ? (
                  <HighlightText key={i} parallaxSpeed={0.6}>
                    {part.text}
                  </HighlightText>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </h3>

            {/* Description (always visible, clearer on hover) */}
            <p
              className="
                mt-6 max-w-md font-mono text-sm leading-relaxed
                text-muted-foreground/70
                transition-colors duration-300 ease-out
                group-hover:text-foreground
              "
            >
              {principle.description}
            </p>

            {/* Decorative line */}
            <div
              className={`
                mt-8 h-[1px] bg-border w-24 md:w-48
                transition-opacity duration-300
                opacity-60 group-hover:opacity-100
                ${principle.align === "right" ? "mr-0" : "ml-0"}
              `}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
