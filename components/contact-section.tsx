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
        text-sm md:text-base lg:text-lg
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
        pt-0 sm:pt-8 md:pt-20 xl:pt-24
      "
    >
      {/* CONTENT WRAPPER - CONSISTENT PADDING */}
      <div
        className="
    flex-1
    flex
    flex-col
    justify-center
    pl-6 lg:pl-24
    pr-6 lg:pr-24
  "
      >
        {/* Header */}
        <div ref={headerRef} className="lg:mb-32 mb-24 lg:mt-0 mt-12">
          <span
            className="
              inline-block
              text-base sm:text-xl lg:text-2xl
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
        <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-48">
          <span
            className="
    block
    uppercase tracking-[0.2em]
    text-accent font-light
    text-[10px] sm:text-xs md:text-base lg:text-base
    mb-2 md:mb-8
  "
          >
            Just say
          </span>

          <h2
            className="
    flex items-baseline
    whitespace-nowrap
    font-(--font-bebas)
    tracking-tight
    leading-[0.9]
    w-full
  "
          >
            <span
              className="
      font-semibold
      text-[clamp(24px,5vw,128px)]
      flex-shrink-0
    "
            >
              hello
            </span>

            <a
              href="mailto:mujahidazzam16@gmail.com"
              data-cursor="hover"
              className="
      font-semibold
      text-[clamp(24px,5vw,128px)]

      text-foreground/10
      hover:text-foreground
      transition-colors duration-300

      whitespace-nowrap
      min-w-0
    "
            >
              mujahidazzam16@gmail.com
            </a>
          </h2>
        </div>
      </div>

      {/* BACK TO TOP - MOVED INSIDE PADDING CONTAINER */}
      <div className="flex justify-end mb-12 px-6 md:px-12">
        <a
          href="#hero"
          className="
      group inline-flex items-center gap-2

      border border-foreground/20

      px-4 py-2
      lg:px-6 lg:py-3

      font-mono
      text-[10px]
      lg:text-xs

      uppercase
      tracking-[0.15em]
      lg:tracking-widest

      text-foreground
      hover:border-accent
      hover:text-accent

      transition-all duration-200
    "
          data-cursor="hover"
        >
          <ScrambleTextOnHover text="Back to top" as="span" duration={0.6} />

          <BitmapChevron
            className="
                transition-transform
                duration-400ms
                ease-in-out
                group-hover:-rotate-45
              "
          />
        </a>
      </div>
      {/* FOOTER — FULL BLEED - FIXED */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen">
        <div
          ref={footerRef}
          className="
      relative
      lg:h-16 sm:h-14 h-12
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
