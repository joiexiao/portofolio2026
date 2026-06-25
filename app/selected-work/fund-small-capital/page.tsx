"use client";
import TransitionLink from "@/components/transition-link";
import { experiments } from "@/components/work-section";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlitchReveal } from "@/components/ui/glitch-reveal";
import { MusicButton } from "@/components/ui/music-button";
import { BitmapChevron } from "@/components/bitmap-chevron";
import { ScrambleTextOnHover, ScrambleText } from "@/components/scramble-text";

gsap.registerPlugin(ScrollTrigger);

/* =====================
   ENTRY VARIANTS
===================== */

const fromTop: Variants = {
  hidden: { y: -160, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 6.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fromBottom: Variants = {
  hidden: { y: 160, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 6.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =====================
   FLOATING VARIANTS
===================== */

const floating = (amp = 12, rot = 2, dur = 4): Variants => ({
  float: {
    y: [0, -amp, 0],
    rotate: [-rot, rot, -rot],
    transition: {
      duration: dur,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
});

/* =====================
   TEXT WAVE
===================== */

const textContainer: Variants = {
  hover: { transition: { staggerChildren: 0.035 } },
};

const textChar: Variants = {
  initial: { y: 0 },
  hover: {
    y: [-6, 6, -6],
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

function WaveText({ text }: { text: string }) {
  return (
    <motion.span
      variants={textContainer}
      initial="initial"
      whileHover="hover"
      className="inline-block"
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={textChar} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* =====================
   PAGE
===================== */

export default function FundSmallCapitalPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isManuallyPausedRef = useRef(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [showMenuCTA, setShowMenuCTA] = useState(false);
  const [modalContent, setModalContent] = useState<{
    type: "video" | "image";
    src: string;
  }>({
    type: "image",
    src: "",
  });

  useEffect(() => {
    if (!modalOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [modalOpen]);

  /* =====================
     PAGE ENTRY
  ===================== */
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { xPercent: -100, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
      );
    });

    return () => ctx.revert();
  }, []);

  /* =====================
     UNIVERSAL SCROLL ANIMATIONS
  ===================== */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // SECTION TEXT (title + desc)
      gsap.utils.toArray<HTMLElement>(".animate-section").forEach((section) => {
        const title = section.querySelector(".animate-title");
        const desc = section.querySelector(".animate-desc");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });

        if (title) {
          tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        if (desc) {
          tl.to(
            desc,
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.4",
          );
        }
      });

      // GRID ITEMS
      gsap.utils
        .toArray<HTMLElement>(".animate-grid-item")
        .forEach((el, index) => {
          gsap.fromTo(
            el,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 2.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              delay: (index % 4) * 0.3,
            },
          );
        });
    });

    return () => ctx.revert();
  }, []);

  /* =====================
     SCRAMBLE SECTION TRIGGER (SMOOTH + SCALABLE)
  ===================== */
  const [sectionStart, setSectionStart] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute("data-section-id");
          if (!id) return;

          // 🔥 FIX UTAMA: nunggu 1 frame biar GSAP settle
          requestAnimationFrame(() => {
            setSectionStart((prev) => ({
              ...prev,
              [id]: true,
            }));
          });

          observer.unobserve(entry.target); // sekali trigger
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -20% 0px",
      },
    );

    document.querySelectorAll("[data-section-id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowMenuCTA(window.scrollY > 120);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="w-full text-white">
      {/* GLOBAL GRID BACKGROUND - Fixed di seluruh halaman */}
      <div
        className="grid-bg fixed inset-0 opacity-50 pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* =====================
          CTA MENU (GLOBAL)
      ===================== */}
      <div className="fixed top-12 inset-x-0 z-50">
        <div className="mx-auto px-6 md:px-12 flex justify-end">
          <TransitionLink
            href="/menu"
            className={`
                     font-mono text-4xl
                     text-primary
                     underline underline-offset-5 decoration-2
                     transition-all duration-500 ease-out
                     hover:bg-primary hover:text-background
     
                     ${showMenuCTA ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
                   `}
            data-cursor="hover"
          >
            <span data-cursor="hover">menu</span>
          </TransitionLink>
        </div>
      </div>

      {/* AUDIO ELEMENT */}
      <audio ref={audioRef} src="/glitchaudio.mp3" loop preload="auto" />

      {/* MUSIC BUTTON */}
      <MusicButton
        audioRef={audioRef}
        isManuallyPausedRef={isManuallyPausedRef}
      />
      <GlitchReveal>
        <section
          className="
      relative
      w-full
      min-h-screen
      overflow-hidden
      text-white
      px-4
      sm:px-6
      md:px-10
    "
        >
          <div className="absolute inset-0" />

          {/* =====================
        CENTER TEXT
    ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 6.6, ease: "easeOut" }}
            className="
        relative z-10
        flex flex-col
        items-center
        justify-center
        text-center
        min-h-screen
      "
          >
            <h1
              className="
          font-bold
          tracking-tight
          leading-none

          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
        "
              data-cursor="hover"
            >
              <WaveText text="FUND SMALL CAPITAL" />
            </h1>

            <p
              className="
          mt-3 md:mt-4
          text-sm
          sm:text-lg
          md:text-xl
          lg:text-2xl
        "
              data-cursor="hover"
            >
              <WaveText text="web-based application design" />
            </p>
          </motion.div>

          {/* =====================
        FLOATING LOGOS
    ===================== */}

          {/* LOGO 1 */}
          <motion.div
            variants={fromTop}
            initial="hidden"
            animate="show"
            drag
            dragElastic={0.12}
            dragMomentum={false}
            className="
        absolute
        top-[18%] left-[4%]

        sm:top-[22%] sm:left-[8%]
        md:top-[30%] md:left-[12%]

        cursor-grab
      "
          >
            <motion.div variants={floating(14, 2, 4.2)} animate="float">
              <Image
                src="/crypto-placeholder1.png"
                alt=""
                width={70}
                height={70}
                className="md:w-[110px]"
              />
            </motion.div>
          </motion.div>

          {/* LOGO 2 */}
          <motion.div
            variants={fromTop}
            initial="hidden"
            animate="show"
            drag
            dragElastic={0.12}
            dragMomentum={false}
            className="
        absolute
        top-[16%] right-[2%]

        sm:top-[20%] sm:right-[8%]
        md:top-[30%] md:right-[22%]

        cursor-grab
      "
          >
            <motion.div variants={floating(18, 3, 5)} animate="float">
              <Image
                src="/crypto-placeholder8.png"
                alt=""
                width={80}
                height={80}
                className="md:w-[120px]"
              />
            </motion.div>
          </motion.div>

          {/* LOGO 3 */}
          <motion.div
            variants={fromBottom}
            initial="hidden"
            animate="show"
            drag
            dragElastic={0.12}
            dragMomentum={false}
            className="
        absolute
        bottom-[24%] left-[10%]

        sm:bottom-[22%] sm:left-[18%]
        md:bottom-[28%] md:left-[38%]

        cursor-grab
      "
          >
            <motion.div variants={floating(12, 2, 3.8)} animate="float">
              <Image
                src="/crypto-placeholder5.png"
                alt=""
                width={55}
                height={55}
                className="md:w-[90px]"
              />
            </motion.div>
          </motion.div>

          {/* LOGO 4 */}
          <motion.div
            variants={fromBottom}
            initial="hidden"
            animate="show"
            drag
            dragElastic={0.12}
            dragMomentum={false}
            className="
        absolute
        bottom-[14%] right-[8%]

        sm:bottom-[14%] sm:right-[18%]
        md:bottom-[18%] md:right-[35%]

        cursor-grab
      "
          >
            <motion.div variants={floating(16, 2, 4.6)} animate="float">
              <Image
                src="/crypto-placeholder6.png"
                alt=""
                width={75}
                height={75}
                className="md:w-[120px]"
              />
            </motion.div>
          </motion.div>

          {/* LOGO 5 */}
          <motion.div
            variants={fromTop}
            initial="hidden"
            animate="show"
            drag
            dragElastic={0.12}
            dragMomentum={false}
            className="
        absolute
        top-[8%] left-[28%]

        sm:top-[12%] sm:left-[32%]
        md:top-[22%] md:left-[30%]

        cursor-grab
      "
          >
            <motion.div variants={floating(20, 3, 5.4)} animate="float">
              <Image
                src="/crypto-placeholder2.png"
                alt=""
                width={85}
                height={85}
                className="md:w-[130px]"
              />
            </motion.div>
          </motion.div>

          {/* LOGO 6 */}
          <motion.div
            variants={fromTop}
            initial="hidden"
            animate="show"
            drag
            dragElastic={0.12}
            dragMomentum={false}
            className="
        absolute
        top-[10%] right-[30%]

        sm:top-[10%] sm:right-[32%]
        md:top-[20%] md:right-[39%]

        cursor-grab
      "
          >
            <motion.div variants={floating(10, 1.5, 3.5)} animate="float">
              <Image
                src="/crypto-placeholder4.png"
                alt=""
                width={50}
                height={50}
                className="md:w-[85px]"
              />
            </motion.div>
          </motion.div>

          {/* LOGO 7 */}
          <motion.div
            variants={fromBottom}
            initial="hidden"
            animate="show"
            drag
            dragElastic={0.12}
            dragMomentum={false}
            className="
        absolute
        bottom-[30%] left-[2%]

        sm:bottom-[28%] sm:left-[8%]
        md:bottom-[31%] md:left-[15%]

        cursor-grab
      "
          >
            <motion.div variants={floating(22, 3, 5.8)} animate="float">
              <Image
                src="/crypto-placeholder3.png"
                alt=""
                width={90}
                height={90}
                className="md:w-[140px]"
              />
            </motion.div>
          </motion.div>

          {/* LOGO 8 */}
          <motion.div
            variants={fromBottom}
            initial="hidden"
            animate="show"
            drag
            dragElastic={0.12}
            dragMomentum={false}
            className="
        absolute
        bottom-[28%] right-[0%]

        sm:bottom-[26%] sm:right-[6%]
        md:bottom-[30%] md:right-[14%]

        cursor-grab
      "
          >
            <motion.div variants={floating(24, 3, 6)} animate="float">
              <Image
                src="/crypto-placeholder7.png"
                alt=""
                width={95}
                height={95}
                className="md:w-[150px]"
              />
            </motion.div>
          </motion.div>
        </section>
      </GlitchReveal>
      {/* =====================
          PROJECT DETAIL
      ===================== */}
      <section
        data-section-id="section-1"
        className="animate-section py-20 md:py-24 lg:py-32
    px-6 sm:px-8 lg:px-32
    md:pl-20 md:pr-20
    lg:pl-24 lg:pr-24"
      >
        <GlitchReveal>
          <div className="max-w-7xl px-0 md:px-6 lg:px-0">
            <ScrambleText
              text="./Project-Overview"
              start={sectionStart["section-1"]}
              className="animate-scramble font-mono text-[10px] uppercase tracking-[0.3em] text-accent"
              duration={3.5}
            />
            <h2
              className="
    animate-title
    mt-6 md:mt-8
    text-4xl
    sm:text-5xl
    md:text-6xl
    lg:text-7xl
    leading-none
    tracking-tight
    relative
    z-10
    opacity-0
    translate-y-12
  "
            >
              Fund Small Capital
            </h2>
            <div
              className="
    animate-desc
    mt-12 md:mt-16 lg:mt-24
    max-w-4xl
    text-base
    sm:text-lg
    md:text-xl
    lg:text-2xl
    leading-relaxed
    opacity-0
    translate-y-12
  "
            >
              <p>
                Fund Small Capital is a cryptocurrency education community
                focused on sharing market insights, learning materials, and
                practical knowledge. Initially, content distribution and
                discussions were conducted through WhatsApp Groups and WhatsApp
                Channels, which limited content organization, scalability, and
                long-term accessibility.
              </p>
            </div>

            {/* META GRID */}
            <div
              className="
    mt-16 md:mt-24 lg:mt-32
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto]
    gap-10
    md:gap-12
    text-base
    md:text-lg
  "
            >
              <div className="animate-grid-item">
                <h2 className="font-medium text:base sm:text-lg lg:text-xl">
                  {" "}
                  The Challenge
                </h2>
                <p className="mt-2">
                  Transitioning from WhatsApp-based content delivery to a
                  structured, scalable, and centralized web-based education
                  platform.
                </p>
              </div>

              <div className="animate-grid-item">
                <h2 className="font-medium text:base sm:text-lg lg:text-xl">
                  {" "}
                  The Outcome
                </h2>
                <p className="mt-2">
                  A web-based cryptocurrency education and information platform
                  with organized content and improved accessibility for users.
                </p>
              </div>

              <div className="animate-grid-item whitespace-nowrap">
                <h2 className="font-medium text:base sm:text-lg lg:text-xl">
                  {" "}
                  Delivered
                </h2>
                <p className="mt-2">
                  UI UX Design
                  <br />
                  Web Design
                </p>
              </div>

              <div className="animate-grid-item whitespace-nowrap">
                <h2 className="font-medium text:base sm:text-lg lg:text-xl">
                  {" "}
                  Year
                </h2>
                <p className="mt-2">2025</p>
              </div>
            </div>
          </div>
        </GlitchReveal>
      </section>

      {/* =====================
          WHERE IT ALL STARTED
      ===================== */}
      <section
        data-section-id="section-2"
        className="animate-section py-20 md:py-24 lg:py-32
    px-6 sm:px-8 lg:px-32
    md:pl-20 md:pr-20
    lg:pl-24 lg:pr-24"
      >
        <GlitchReveal>
          <div className="max-w-8xl md:px-6 lg:px-0">
            <ScrambleText
              text="./Project-Origin"
              start={sectionStart["section-2"]}
              className="animate-scramble font-mono text-[10px] uppercase tracking-[0.3em] text-accent"
              duration={3.5}
            />
            <h2
              className="
    animate-title
    mt-6 md:mt-8
    text-4xl
    sm:text-5xl
    md:text-6xl
    lg:text-7xl
    leading-none
    tracking-tight
    opacity-0
    translate-y-12
  "
            >
              How it all began
            </h2>

            <p
              className="
    animate-desc
    mt-12 md:mt-16 lg:mt-24
    max-w-4xl
    text-base
    sm:text-lg
    md:text-xl
    lg:text-2xl
    leading-relaxed
    text-white
    opacity-0
    translate-y-12
  "
            >
              The project began with system analysis and UML design to define
              user roles, data flow, and platform structure. It continued with
              the design and development of the web-based application, followed
              by implementation and functional testing to ensure the platform
              met educational and usability requirements.
            </p>

            {/* IMAGE GRID */}
            <div
              className="
    mt-16 md:mt-24 lg:mt-32
    grid
    grid-cols-1
    md:grid-cols-2
    gap-12
    md:gap-20
    lg:gap-32
  "
            >
              {/* ================= ITEM 1 — VIDEO ================= */}
              <div className="animate-grid-item space-y-4">
                {/* CARD */}
                <div
                  onClick={() => {
                    setModalContent({
                      type: "video",
                      src: "/fscvideouser.mp4",
                    });
                    setModalOpen(true);
                  }}
                  className="group relative cursor-pointer"
                  data-cursor="hover"
                >
                  <div className="overflow-hidden">
                    <video
                      src="/fscvideouser.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="
            w-full
            h-auto
            object-cover
            transition-all
            duration-500
            group-hover:scale-105
            group-hover:blur-sm
            group-hover:brightness-75
          "
                    />
                  </div>

                  {/* OVERLAY */}
                  <div
                    className="
          absolute inset-0
          flex items-center justify-center
          bg-black/40
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          pointer-events-none
        "
                  >
                    <div
                      className="
            pointer-events-auto
            inline-flex
            items-center
            gap-2
            border
            border-white/40
            bg-black/80
            px-4
            py-2
            font-mono
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-white
            transition-all
            duration-200
            hover:border-accent
            hover:text-accent
          "
                    >
                      <ScrambleTextOnHover
                        text="Watch Video"
                        as="span"
                        duration={0.6}
                      />
                    </div>
                  </div>
                </div>

                {/* TEXT */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-foreground/60">
                    Website
                  </p>
                  <p className="text-base">Fund Small Capital Website</p>
                </div>
              </div>

              {/* ================= ITEM 2 — VIDEO ================= */}
              <div className="animate-grid-item space-y-4">
                <div
                  onClick={() => {
                    setModalContent({
                      type: "video",
                      src: "/fscvideoadmin.mp4",
                    });
                    setModalOpen(true);
                  }}
                  className="group relative cursor-pointer"
                  data-cursor="hover"
                >
                  <div className="overflow-hidden">
                    <video
                      src="/fscvideoadmin.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="
            w-full
            h-auto
            object-cover
            transition-all
            duration-500
            group-hover:scale-105
            group-hover:blur-sm
            group-hover:brightness-75
          "
                    />
                  </div>

                  <div
                    className="
          absolute inset-0
          flex items-center justify-center
          bg-black/40
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          pointer-events-none
        "
                  >
                    <div
                      className="
            pointer-events-auto
            inline-flex
            items-center
            gap-2
            border
            border-white/40
            bg-black/80
            px-4
            py-2
            font-mono
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-white
            transition-all
            duration-200
            hover:border-accent
            hover:text-accent
          "
                    >
                      <ScrambleTextOnHover
                        text="Watch Video"
                        as="span"
                        duration={0.6}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-foreground/60">
                    Dashboard
                  </p>
                  <p className="text-base">Fund Small Capital Dashboard</p>
                </div>
              </div>

              {/* ================= ITEM 3 — IMAGE ================= */}
              <div className="animate-grid-item space-y-4">
                <div
                  onClick={() => {
                    setModalContent({
                      type: "image",
                      src: "/FSCbrandguideline.webp",
                    });
                    setModalOpen(true);
                  }}
                  className="group relative cursor-pointer"
                  data-cursor="hover"
                >
                  <div className="overflow-hidden">
                    <Image
                      src="/FSCbrandguideline.webp"
                      alt="Fund Small Capital Brand Guidelines"
                      width={488}
                      height={297}
                      className="
            w-full
            h-auto
            object-cover
            transition-all
            duration-500
            group-hover:scale-105
            group-hover:blur-sm
            group-hover:brightness-75
          "
                    />
                  </div>

                  <div
                    className="
          absolute inset-0
          flex items-center justify-center
          bg-black/40
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          pointer-events-none
        "
                  >
                    <div
                      className="
            pointer-events-auto
            inline-flex
            items-center
            gap-2
            border
            border-white/40
            bg-black/80
            px-4
            py-2
            font-mono
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-white
            transition-all
            duration-200
            hover:border-accent
            hover:text-accent
          "
                    >
                      <ScrambleTextOnHover
                        text="Preview Image"
                        as="span"
                        duration={0.6}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-foreground/60">
                    Brand Guidelines
                  </p>
                  <p className="text-base">
                    Fund Small Capital Brand Guidelines
                  </p>
                </div>
              </div>

              {/* ================= ITEM 4 — IMAGE ================= */}
              <div className="animate-grid-item space-y-4">
                <div
                  onClick={() => {
                    setModalContent({
                      type: "image",
                      src: "/fsczinemockup.webp",
                    });
                    setModalOpen(true);
                  }}
                  className="group relative cursor-pointer"
                  data-cursor="hover"
                >
                  <div className="overflow-hidden">
                    <Image
                      src="/fsczinemockup.webp"
                      alt="Fund Small Capital Zine Design"
                      width={488}
                      height={297}
                      className="
            w-full
            h-auto
            object-cover
            transition-all
            duration-500
            group-hover:scale-105
            group-hover:blur-sm
            group-hover:brightness-75
          "
                    />
                  </div>

                  <div
                    className="
          absolute inset-0
          flex items-center justify-center
          bg-black/40
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          pointer-events-none
        "
                  >
                    <div
                      className="
            pointer-events-auto
            inline-flex
            items-center
            gap-2
            border
            border-white/40
            bg-black/80
            px-4
            py-2
            font-mono
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-white
            transition-all
            duration-200
            hover:border-accent
            hover:text-accent
          "
                    >
                      <ScrambleTextOnHover
                        text="Preview Image"
                        as="span"
                        duration={0.6}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-foreground/60">
                    Zine
                  </p>
                  <p className="text-base">Fund Small Capital Zine Design</p>
                </div>
              </div>
            </div>
          </div>
        </GlitchReveal>
      </section>

      {/* =====================
          MODAL
      ===================== */}

      {modalOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          {/* CENTER WRAPPER */}
          <div
            className="
        fixed
        top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2
        w-full max-w-6xl px-6
      "
            onClick={(e) => e.stopPropagation()}
          >
            {/* CONTENT */}
            <div className="relative overflow-hidden  modal-cursor">
              {/* CLOSE BUTTON — DI DALAM IMAGE */}
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
                className="
            absolute top-4 right-4 z-10
            bg-black/60 backdrop-blur
            px-3 py-2
            text-white text-sm
            hover:bg-black/80
            transition
          "
                data-cursor="hover"
              >
                ✕
              </button>

              {modalContent.type === "video" ? (
                <video
                  src={modalContent.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-auto object-cover"
                />
              ) : (
                <Image
                  src={modalContent.src}
                  alt=""
                  width={1600}
                  height={900}
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================
          CREDITS
      ===================== */}
      <section
        data-section-id="section-3"
        className="animate-section py-20 md:py-24 lg:py-32
    px-6 sm:px-8 lg:px-32
    md:pl-20 md:pr-20
    lg:pl-24 lg:pr-24"
      >
        <GlitchReveal>
          <div className="max-w-8xl md:px-6 lg:px-0">
            <ScrambleText
              text="./acknowledgements"
              start={sectionStart["section-3"]}
              className="animate-scramble font-mono text-[10px] uppercase tracking-[0.3em] text-accent"
              duration={3.5}
            />
            <h2
              className="
    animate-title
    mt-6 md:mt-8
    text-4xl
    sm:text-5xl
    md:text-6xl
    lg:text-7xl
    leading-none
    tracking-tight
    opacity-0
    translate-y-12
  "
            >
              Credits
            </h2>

            <p
              className="
    animate-desc
    mt-16 md:mt-24 lg:mt-32
    max-w-4xl
    text-base
    sm:text-lg
    md:text-xl
    lg:text-2xl
    leading-relaxed
    text-white
    opacity-0
    translate-y-12
  "
            >
              Special thanks to Fund Small Capital for the trust, collaboration,
              and valuable insights throughout the development process. This
              project would not have been possible without the open
              communication, feedback, and shared vision to build a more
              structured and sustainable cryptocurrency education platform. The
              collaboration played a key role in shaping the platform into a
              solution that truly supports the community’s learning needs.
            </p>
            <div
              className="
    mt-16 md:mt-24 lg:mt-32
    max-w-4xl
    grid
    grid-cols-1
    sm:grid-cols-2
    gap-x-10
    md:gap-x-20
    gap-y-12
    md:gap-y-20
    text-base
    md:text-lg
    lg:text-xl
  "
            >
              <div className="animate-grid-item">
                <p className="font-bold mb-2"> Clients</p>
                <p>Fund Small Capital</p>
              </div>

              <div className="animate-grid-item">
                <p className="font-bold mb-2">Collabolators</p>
                <a
                  href="https://github.com/amaliradifan"
                  data-cursor="hover"
                  className="hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Muhammad Amali Radifan
                </a>
              </div>

              <div className="animate-grid-item">
                <p className="font-bold mb-2">Technology</p>
                <p>
                  Figma
                  <br />
                  Adobe Photoshop
                </p>
              </div>

              <div className="animate-grid-item">
                <p className="font-bold mb-2">Products</p>
                <p>Educational Cryptocurrency Website</p>
              </div>
            </div>
          </div>
        </GlitchReveal>
      </section>

      {/* =====================
          NEXT PROJECT
      ===================== */}
      <section
        className="
         relative
         py-20 md:py-24 lg:py-32
         px-4 sm:px-6
         md:pl-20 md:pr-10
         lg:pl-20 lg:pr-12
         z-10
       "
      >
        {/* HEADER */}
        <div
          className="
         mb-10 md:mb-16
         flex
         items-center
         justify-between
         gap-4
       "
        >
          <h2
            className="
         font-mono
         text-2xl
         sm:text-2xl
         md:text-4xl
         uppercase
         [word-spacing:-0.3em]
         text-accent
         tracking-tight
         leading-none
       "
          >
            VIEW ANOTHER WORK
          </h2>

          {/* BACK TO HOME BUTTON */}
          <TransitionLink
            href="/"
            data-cursor="hover"
            className="
       group
       inline-flex
       items-center
       gap-2
       border
       border-foreground/40
       px-4
       py-2
       font-mono
       lg:text-[10px]
       sm:text-[8px]
       text-[8px]
       uppercase
       tracking-[0.25em]
       text-foreground
       hover:border-accent
       hover:text-accent
       transition-all
       duration-200
     "
          >
            <ScrambleTextOnHover text="Back to home" as="span" duration={0.6} />

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

        {/* LIST */}
        <div className="flex flex-col gap-6">
          {experiments
            .filter((e) => e.slug !== "fund-small-capital")
            .map((experiment) => {
              const globalIndex = experiments.findIndex(
                (e) => e.slug === experiment.slug,
              );

              return (
                <TransitionLink
                  key={experiment.slug}
                  href={
                    experiment.slug === "about"
                      ? "/about"
                      : `/selected-work/${experiment.slug}`
                  }
                  className="block"
                >
                  <article
                    data-cursor="hover"
                    className="
  group
  relative
  min-h-[180px]
  md:h-[200px]
  border
  border-border/40
  px-5
  py-6
  sm:px-8
  md:px-10
  overflow-hidden
  transition-colors
  duration-500
  hover:border-accent/60
"
                  >
                    {/* HOVER BG */}
                    <div className="absolute inset-0 bg-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* MAIN CONTENT */}
                    <div className="relative z-10 h-full flex flex-col justify-center">
                      {/* ROLE */}
                      <span
                        className="
    font-mono
    text-[10px]
    sm:text-[12px]
    uppercase
    tracking-widest
    text-muted-foreground
    transition-opacity
    duration-300
    md:group-hover:opacity-0
  "
                      >
                        {experiment.medium}
                      </span>

                      {/* TITLE */}
                      <h3
                        className="
    mt-3
    text-3xl
    sm:text-5xl
    md:text-7xl
    leading-none
    tracking-tight
    transition-transform
    duration-500
    md:group-hover:-translate-y-6
  "
                      >
                        {experiment.title}
                      </h3>
                    </div>

                    {/* DESCRIPTION */}
                    <div
                      className="
    relative
    md:absolute
    mt-6
    md:mt-0
    md:bottom-6
    md:left-10
    md:right-10
    z-10
  "
                    >
                      <p
                        className="
      font-mono
      text-accent
      text-[11px]
      md:text-xs
      leading-relaxed
      opacity-100
      translate-y-0
      md:opacity-0
      md:translate-y-6
      transition-all
      duration-500
      md:group-hover:opacity-100
      md:group-hover:translate-y-0
      max-w-md
    "
                      >
                        {experiment.description}
                      </p>
                    </div>

                    {/* INDEX — GLOBAL */}
                    <span className="absolute top-6 right-6 font-mono text-[10px] text-muted-foreground/40 transition-colors duration-300 group-hover:text-accent">
                      {String(globalIndex + 1).padStart(2, "0")}
                    </span>

                    {/* CORNER */}
                    <div className="absolute top-0 right-0 w-12 h-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
                      <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
                    </div>
                  </article>
                </TransitionLink>
              );
            })}
        </div>
      </section>
    </main>
  );
}
