"use client";
import TransitionLink from "@/components/transition-link";
import { experiments } from "@/components/work-section";
import Image from "next/image";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedNoise } from "@/components/animated-noise";
import { GlitchReveal } from "@/components/ui/glitch-reveal";
import { MusicButton } from "@/components/ui/music-button";
import { BitmapChevron } from "@/components/bitmap-chevron";
import { ScrambleTextOnHover, ScrambleText } from "@/components/scramble-text";

gsap.registerPlugin(ScrollTrigger);

export default function MuseumVirtualPage() {
  const heroImageRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isManuallyPausedRef = useRef(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [showMenuCTA, setShowMenuCTA] = useState(false);
  const menuTriggerRef = useRef<HTMLDivElement | null>(null);
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
    if (!menuTriggerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMenuCTA(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-120px 0px 0px 0px",
      },
    );

    observer.observe(menuTriggerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="w-full text-white">
      {/* GLOBAL GRID BACKGROUND - Fixed di seluruh halaman */}
      <div
        className="grid-bg fixed inset-0 opacity-50 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* GLOBAL ANIMATED NOISE - Fixed di seluruh halaman */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <AnimatedNoise opacity={0.03} />
      </div>

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
      {/* =====================
          LOGO HERO
      ===================== */}
      <GlitchReveal>
        <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
          <div ref={heroImageRef} className="relative w-full h-full">
            <Image
              src="/museumabnhero.png"
              alt="Logo Project Thumbnail"
              fill
              priority
              className="objec-cover"
            />
            {/* Gradient bottom fade */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40
      bg-gradient-to-b from-transparent to-black"
            />
          </div>
        </section>
      </GlitchReveal>

      {/* =====================
          PROJECT DETAIL
      ===================== */}
      <div ref={menuTriggerRef} className="h-px w-full" />
      <section
        data-section-id="section-1"
        className="animate-section relative px-6 py-24 h-fit z-10"
      >
        <GlitchReveal>
          <div className="max-w-7xl mx-32">
            <ScrambleText
              text="./Project-Overview"
              start={sectionStart["section-1"]}
              className="animate-scramble font-mono text-[10px] uppercase tracking-[0.3em] text-accent"
              duration={3.5}
            />
            <h2 className="animate-title mt-8 text-7xl whitespace-nowrap tracking-tight relative z-10 opacity-0 translate-y-12">
              Museum Virtual Bela Negara
            </h2>
            <div className="animate-desc mt-24 max-w-4xl text-2xl leading-relaxed opacity-0 translate-y-12">
              <p>
                Museum Virtual Bela Negara is an academic project initiated by
                Universitas Pembangunan Nasional “Veteran” Jakarta, aimed at
                creating a virtual museum to promote nationalism and strengthen
                awareness of national defense values. The platform presents
                Indonesian history and civic education in a digital and
                accessible format.
              </p>
            </div>

            {/* META GRID */}
            <div className="mt-32 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] gap-12 text-lg">
              <div className="animate-grid-item">
                <h2 className="font-medium text-xl"> The Challenge</h2>
                <p className="mt-2 leading-relaxed">
                  Developing an educational website that presents Indonesian
                  history, news, and national defense values in an engaging and
                  well-structured digital experience.
                </p>
              </div>

              <div className="animate-grid-item">
                <h2 className="font-medium text-xl"> The Outcome</h2>
                <p className="mt-2 leading-relaxed">
                  A virtual museum website that delivers historical content{" "}
                  <br />
                  news, and national defense values in an accessible and
                  educational format.
                </p>
              </div>

              <div className="animate-grid-item whitespace-nowrap">
                <h2 className="font-medium text-xl"> Delivered</h2>
                <p className="mt-2 leading-relaxed">
                  UI UX Design
                  <br />
                  Web Design
                </p>
              </div>

              <div className="animate-grid-item whitespace-nowrap">
                <h2 className="font-medium text-xl"> Year</h2>
                <p className="mt-2 leading-relaxed">2025</p>
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
        className="animate-section relative px-6 py-24 h-fit z-10"
      >
        <GlitchReveal>
          <div className="max-w-8xl mx-32">
            <ScrambleText
              text="./Project-Origin"
              start={sectionStart["section-2"]}
              className="animate-scramble font-mono text-[10px] uppercase tracking-[0.3em] text-accent"
              duration={3.5}
            />
            <h2 className="animate-title mt-8 text-7xl whitespace-nowrap tracking-tight opacity-0 translate-y-12">
              How it all began
            </h2>

            <p className="animate-desc mt-24 max-w-4xl text-2xl leading-relaxed text-white opacity-0 translate-y-12">
              The project started with both online and offline research on
              Indonesian history, national movements, and cultural references.
              The collected research was then curated, structured, and
              transformed into meaningful digital content, forming the
              foundation of the virtual museum experience.
            </p>

            {/* IMAGE GRID */}
            <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-32">
              {/* ================= ITEM 1 — IMAGE ================= */}
              <div className="animate-grid-item space-y-4">
                {/* CARD */}
                <div
                  onClick={() => {
                    setModalContent({
                      type: "image",
                      src: "/museumabnstyleguide.png",
                    });
                    setModalOpen(true);
                  }}
                  className="group relative cursor-pointer"
                  data-cursor="hover"
                >
                  <div className="overflow-hidden">
                    <Image
                      src="/museumabnstyleguide.png"
                      alt="Museum Virtual Bela Negara Website"
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
                        text="Preview Image"
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
                  <p className="text-base">
                    Museum Virtual Bela Negara Website
                  </p>
                </div>
              </div>

              {/* ================= ITEM 2 — IMAGE ================= */}
              <div className="animate-grid-item space-y-4">
                <div
                  onClick={() => {
                    setModalContent({
                      type: "image",
                      src: "/museumabnmockup.png",
                    });
                    setModalOpen(true);
                  }}
                  className="group relative cursor-pointer"
                  data-cursor="hover"
                >
                  <div className="overflow-hidden">
                    <Image
                      src="/museumabnmockup.png"
                      alt="Museum Virtual Bela Negara High Fidelity"
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
                    High Fidelity
                  </p>
                  <p className="text-base">
                    Museum Virtual Bela Negara High Fidelity
                  </p>
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
        className="animate-section relative px-6 py-24 h-fit z-10"
      >
        <GlitchReveal>
          <div className="max-w-8xl mx-32">
            <ScrambleText
              text="./acknowledgements"
              start={sectionStart["section-3"]}
              className="animate-scramble font-mono text-[10px] uppercase tracking-[0.3em] text-accent"
              duration={3.5}
            />
            <h2 className="animate-title mt-8 text-7xl whitespace-nowrap tracking-tight opacity-0 translate-y-12">
              Credits
            </h2>

            <p className="animate-desc mt-32 max-w-4xl text-2xl leading-relaxed text-white opacity-0 translate-y-12">
              Special thanks to Universitas Pembangunan Nasional Veteran Jakarta
              for the opportunity and trust in providing this project, as well
              as for supporting the development of a digital platform dedicated
              to preserving and sharing the spirit of Bela Negara.
            </p>
            <div className="mt-32 max-w-4xl grid grid-cols-2 gap-x-20 gap-y-20  text-xl">
              <div className="animate-grid-item">
                <p className="font-bold mb-2">Clients</p>
                <p className="">
                  Universitas Pembangunan Nasional Veteran Jakarta
                </p>
              </div>

              <div className="animate-grid-item">
                <p className="font-bold mb-2">Collabolators</p>
                <p className="">Museum Virtual Bela Negara Team</p>
              </div>

              <div className="animate-grid-item">
                <p className="font-bold mb-2">Technology</p>
                <p className="">
                  Figma
                  <br />
                </p>
              </div>

              <div className="animate-grid-item">
                <p className="font-bold mb-2">Products</p>
                <p className="">Museum Virtual Website</p>
              </div>
            </div>
          </div>
        </GlitchReveal>
      </section>

      {/* =====================
          NEXT PROJECT
      ===================== */}
      <section className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
        {/* HEADER */}
        <div className="mb-16 flex items-center justify-between">
          <h2 className="font-mono text-4xl uppercase [word-spacing:-0.3em] text-accent tracking-tight">
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
            text-[10px]
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
            .filter((e) => e.slug !== "museum-virtual")
            .map((experiment) => {
              const globalIndex = experiments.findIndex(
                (e) => e.slug === experiment.slug,
              );

              return (
                <TransitionLink
                  key={experiment.slug}
                  href={`/selected-work/${experiment.slug}`}
                  className="block"
                >
                  <article
                    data-cursor="hover"
                    className="group relative h-[180px] md:h-[200px] border border-border/40 px-10 overflow-hidden transition-colors duration-500 hover:border-accent/60"
                  >
                    {/* HOVER BG */}
                    <div className="absolute inset-0 bg-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* MAIN CONTENT */}
                    <div className="relative z-10 h-full flex flex-col justify-center">
                      {/* ROLE */}
                      <span className="font-mono text-[12px] uppercase tracking-widest text-muted-foreground transition-opacity duration-300 group-hover:opacity-0">
                        {experiment.medium}
                      </span>

                      {/* TITLE */}
                      <h3 className="mt-3  text-5xl md:text-7xl leading-none tracking-tight transition-transform duration-500 group-hover:-translate-y-6">
                        {experiment.title}
                      </h3>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="absolute bottom-6 left-10 right-10 z-10">
                      <p className="font-mono text-accent text-xs leading-relaxed opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 max-w-md">
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
