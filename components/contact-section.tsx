"use client";
import { Asterisk } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { ScrambleTextOnHover } from "@/components/scramble-text";
import { BitmapChevron } from "@/components/bitmap-chevron";
import TransitionLink from "./transition-link";
import { X } from "lucide-react";

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
  const [showResumeModal, setShowResumeModal] = useState(false);

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

  useEffect(() => {
    if (!footerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top bottom",
      once: true,

      onEnter: () => {
        setTimeout(() => {
          setShowResumeModal(true);
        }, 400); // 400ms delay
      },
    });

    return () => trigger.kill();
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

  useEffect(() => {
    if (!showResumeModal) return;

    gsap.fromTo(
      ".resume-modal",
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      },
    );
  }, [showResumeModal]);

  const closeResumeModal = () => {
    gsap.to(".resume-modal", {
      opacity: 0,
      y: 20,
      scale: 0.96,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => setShowResumeModal(false),
    });
  };

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
    mb-2 md:mb-4
  "
          >
            Just say
          </span>

          <h2
            className="
    flex items-center
    whitespace-nowrap
    font-sans
    tracking-tight
    leading-none
    uppercase
  "
            style={{
              WebkitTextStroke: "clamp(0.5px,0.08vw,2px) currentColor",
            }}
          >
            <span
              className="
      text-[clamp(16px,5vw,128px)]
      flex-shrink-0
    "
            >
              hello
            </span>

            <a
              href="mailto:mujahidazzam16@gmail.com"
              data-cursor="hover"
              className="
      text-[clamp(16px,5vw,128px)]
      text-foreground/10
      hover:text-foreground
      transition-colors duration-300
      whitespace-nowrap
    "
            >
              mujahidazzam16@gmail.com
            </a>
          </h2>
        </div>
      </div>

      <>
        {/* DESKTOP WRAPPER */}
        <div className="hidden md:block mb-12 px-6 lg:pl-24 lg:pr-12 ">
          <div className="flex items-center justify-between">
            {/* LEFT - TransitionLink */}
            <TransitionLink
              href="/resume"
              data-cursor="hover"
              className="
        font-mono
        text-[10px] lg:text-xs
        uppercase
        tracking-[0.15em]
        underline
        underline-offset-4
        decoration-1
        transition-colors duration-200
        text-primary
        hover:text-black
        hover:bg-accent
      "
            >
              <ScrambleTextOnHover
                text="jaid's resume"
                as="span"
                duration={0.6}
              />
            </TransitionLink>

            {/* RIGHT - Button */}
            <button
              onClick={() => {
                document
                  .getElementById("hero")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="
        group inline-flex items-center gap-2
        border border-foreground/20
        px-4 py-2 lg:px-6 lg:py-3
        font-mono
        text-[10px] lg:text-xs
        uppercase
        tracking-[0.15em] lg:tracking-widest
        text-foreground
        hover:border-accent
        hover:text-accent
        transition-all duration-200

      "
              data-cursor="hover"
            >
              <ScrambleTextOnHover
                text="Back to top"
                as="span"
                duration={0.6}
              />

              <BitmapChevron
                className="
          transition-transform duration-300 ease-in-out
          group-hover:-rotate-45
        "
              />
            </button>
          </div>
        </div>

        {/* MOBILE - LEFT (TransitionLink) */}
        <div
          className="
    fixed bottom-5 left-5 z-[999]
    flex md:hidden
  "
        >
          <TransitionLink
            href="/resume"
            data-cursor="hover"
            className="
      px-5 py-3
      
      border border-white/20
      bg-black/80 backdrop-blur-md

      font-mono
      text-xs
      uppercase
      tracking-[0.18em]
      text-white

      hover:border-accent
      hover:text-accent

      transition-all duration-300
    "
          >
            <ScrambleTextOnHover text="resume" as="span" duration={0.6} />
          </TransitionLink>
        </div>

        {/* MOBILE - RIGHT (Back to top button) */}
        <div
          className="
    fixed bottom-5 right-5 z-[999]
    flex md:hidden
  "
        >
          <button
            onClick={() => {
              document
                .getElementById("hero")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="
      w-16 h-16 rounded-full
      border border-white/20
      bg-black/80 backdrop-blur-md

      flex items-center justify-center

      text-white
      hover:border-accent
      hover:text-accent

      transition-all duration-300
    "
            data-cursor="hover"
            aria-label="Back to top"
          >
            <BitmapChevron className="-rotate-45 scale-110" />
          </button>
        </div>
      </>

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

      {showResumeModal && (
        <div
          onClick={closeResumeModal}
          className="
    fixed inset-0 z-[9999]
    flex items-center justify-center
    bg-black/50
    backdrop-blur-lg
    px-6
    animate-in fade-in duration-300
  "
        >
          <div
            className="
        resume-modal
        relative
        w-full max-w-lg
        border border-white/10
        bg-neutral-950/40
        backdrop-blur-lg
        p-8 md:p-10
        text-white
        shadow-2xl
      "
          >
            <button
              onClick={closeResumeModal}
              data-cursor="hover"
              className="
          absolute right-5 top-5
          text-white/40
          hover:text-white
          transition-colors
        "
            >
              <X size={20} />
            </button>

            <h3
              className="
              mt-4
          text-3xl
          font-semibold
          tracking-tight
        "
            >
              Thanks for stopping by.
            </h3>

            <p
              className="
          mt-4
          text-white/70
          leading-7
        "
            >
              Whether you're interested in my experience or the work I've built,
              I've got both ready for you.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <TransitionLink
                href="/resume"
                data-cursor="hover"
                className="
            flex-1
            bg-accent
            px-6
            py-3
            text-center
            font-mono
            text-xs
            uppercase
            tracking-[0.15em]
            text-black
            transition-all
            hover:scale-[1.02]
          "
              >
                View Resume
              </TransitionLink>

              <button
                onClick={() => {
                  closeResumeModal();

                  setTimeout(() => {
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
                data-cursor="hover"
                className="
            flex-1
            border
            border-white/10
            px-6
            py-3
            font-mono
            text-xs
            uppercase
            tracking-[0.15em]
            text-white
            transition-all
            hover:border-accent
            hover:text-accent
          "
              >
                View Projects
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
