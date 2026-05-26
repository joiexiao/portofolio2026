"use client";
import { Asterisk } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { ScrambleTextOnHover } from "@/components/scramble-text";
import { BitmapChevron } from "@/components/bitmap-chevron";
import { AnimatedNoise } from "@/components/animated-noise";

const Marquee = dynamic(() => import("react-fast-marquee"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Keen to Collaborate?",
    "Have a project in mind?",
    "Want to work together?",
    "Let's talk.",
  ];

  /* ============================
    SCROLL ANIMATIONS
  ============================ */
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        });
      }

      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const targetText = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < targetText.length) {
            setDisplayText(targetText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  /* ============================
    FOOTER ITEM
  ============================ */
  function FooterItem() {
    return (
      <div
        className="
        flex items-center gap-8
        whitespace-nowrap
        px-10
        font-[var(--font-bebas)]
        uppercase tracking-[0.1em]
        text-black
      "
        data-cursor="hover"
      >
        <span>
          <Asterisk />
        </span>
        <span>© 2025 Mujahid Azzam</span>
        <span>
          <Asterisk />
        </span>
        <span>Depok, Indonesia</span>
        <span>
          <Asterisk />
        </span>
        <span>mujahidazzam16@gmail.com</span>
        <span>
          <Asterisk />
        </span>
        <span>(+62) 878 0867 7159</span>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative
        min-h-screen
        flex flex-col
        pt-24
        border-t border-border/30
      "
    >
      {/* CONTENT WRAPPER - CONSISTENT PADDING */}
      <div className="flex-1 pl-6 md:pl-28 pr-6 md:pr-12">
        {/* Header */}
        <div ref={headerRef} className="mb-32">
          <span
            className="
              inline-block
              text-[24px]
              text-accent
              typing-cursor
              font-mono
              tracking-tight
            "
          >
            {displayText}
          </span>
        </div>

        {/* Title */}
        <div className="mb-48">
          <span className="uppercase tracking-[0.2em] text-accent font-medium text-xs md:text-xl lg:text-2xl">
            Just say
          </span>

          <h2
            className="
              mt-2
              flex flex-col md:flex-row md:items-baseline gap-2
              font-[var(--font-bebas)]
              tracking-tight
            "
          >
            <span className="font-medium text-4xl md:text-5xl lg:text-7xl">
              Hello
            </span>

            <a
              href="mailto:mujahidazzam16@gmail.com"
              data-cursor="hover"
              className="
                font-medium text-4xl md:text-5xl lg:text-7xl
                text-foreground/30
                transition-colors duration-300
                hover:text-foreground
                break-all md:break-normal
              "
            >
              mujahidazzam16@gmail.com
            </a>
          </h2>
        </div>

        {/* BACK TO TOP - MOVED INSIDE PADDING CONTAINER */}
        <div className="flex justify-end mb-12">
          <a
            href="#hero"
            data-cursor="hover"
            className="
              group
              inline-flex
              items-center
              gap-3
              border
              border-foreground/50
              px-6
              py-3
              font-mono
              text-xs
              uppercase
              tracking-widest
              text-foreground
              hover:border-accent
              hover:text-accent
              transition-all
              duration-200
            "
          >
            <ScrambleTextOnHover text="Back to top" as="span" duration={0.6} />

            <BitmapChevron
              className="
                transition-transform
                duration-[400ms]
                ease-in-out
                group-hover:rotate-317
              "
            />
          </a>
        </div>
      </div>

      {/* FOOTER — FULL BLEED - FIXED */}
      <div className="w-full -mx-6 md:-mx-0">
        <div
          ref={footerRef}
          className="
            relative
            h-[64px]
            overflow-hidden
            border-t border-black/20
            bg-white
            flex items-center
          "
        >
          <Marquee speed={18} pauseOnHover gradient={false}>
            <FooterItem />
            <FooterItem />
          </Marquee>
        </div>
      </div>
    </section>
  );
}
