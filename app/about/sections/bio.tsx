"use client";

import { ScrambleText } from "@/components/scramble-text";
import { useEffect, useRef, useState } from "react";

export default function Bio() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [scrambleKey, setScrambleKey] = useState<number[]>([0, 0, 0]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionRefs.current.findIndex(
            (el) => el === entry.target,
          );

          if (index === -1) return;

          if (entry.isIntersecting) {
            setActiveIndex(index);

            // ✅ Scramble mulai pas blur selesai
            setTimeout(() => {
              setScrambleKey((prev) => {
                const copy = [...prev];
                copy[index] = copy[index] + 1;
                return copy;
              });
            }, 600);
          } else {
            // ✅ PENTING: Reset activeIndex pas keluar
            setActiveIndex((prev) => (prev === index ? -1 : prev));
          }
        });
      },
      { threshold: 0.5 },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const getSectionClass = (index: number) => {
    if (activeIndex === -1) return "opacity-0 blur-md";
    if (activeIndex === index) return "opacity-100 blur-0";
    if (activeIndex > index) return "opacity-40 blur-sm";
    return "opacity-0 blur-md";
  };

  return (
    <>
      {/* ================= SCREEN 1 ================= */}
      <section
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className={`w-screen h-screen flex-shrink-0 flex items-center transition-all px-6 py-24 duration-[600ms] ease-out ${getSectionClass(0)}`}
      >
        <div
          className="
    w-full

    px-6
    sm:px-12
    md:px-16
    lg:px-24
  "
        >
          <span className="text-sm font-mono tracking-widest text-primary mb-6 inline-block">
            {scrambleKey[0] > 0 ? (
              <ScrambleText
                key={`bg-${scrambleKey[0]}`}
                text="./background"
                start={true}
                duration={0.6}
              />
            ) : (
              "./background"
            )}
          </span>

          <h2
            className="text-4xl
md:text-4xl
lg:text-5xl font-semibold leading-tight max-w-5xl"
          >
            <span className="relative inline group">
              <span
                onMouseEnter={() => setHoveredWord("graduated")}
                onMouseLeave={() => setHoveredWord(null)}
                className="hover:text-black transition-colors cursor-pointer underline decoration-primary decoration-4 underline-offset-8 hover:bg-primary"
                data-cursor="hover"
              >
                Graduated
              </span>

              <div
                className={`
            pointer-events-none
            absolute
            left-1/2
            top-full
            mt-1
            -translate-x-1/2
            transition-all
            duration-300
            ease-out
            ${hoveredWord === "graduated" ? "opacity-100 scale-100" : "opacity-0 scale-100"}
          `}
              >
                <div
                  className="
              rounded-xl
              bg-white/10
              backdrop-blur-sm 
              border border-white/20
              shadow-xl
              p-2.5
              hidden md:block w-48
            "
                >
                  <img
                    src="/graduated.jpg"
                    alt="UPNVJ"
                    className="w-72 rounded-xl"
                  />
                </div>
              </div>
            </span>{" "}
            in 2026 from Universitas Pembangunan Nasional Veteran Jakarta,
            <br /> with a Diploma in{" "}
            <span className="relative inline group">
              <span
                onMouseEnter={() => setHoveredWord("is")}
                onMouseLeave={() => setHoveredWord(null)}
                className="hover:text-black transition-colors cursor-pointer underline decoration-primary decoration-4 underline-offset-8 hover:bg-primary"
                data-cursor="hover"
              >
                Information Systems
              </span>

              <div
                className={`
            pointer-events-none
            absolute
            left-1/2
            top-full
            mt-1
            -translate-x-1/2
            transition-all
            duration-300
            ease-out
            ${hoveredWord === "is" ? "opacity-100 scale-100" : "opacity-0 scale-100"}
          `}
              >
                <div
                  className="
              rounded-xl
              bg-white/10
              backdrop-blur-sm 
              border border-white/20
              shadow-xl
              p-2.5
              hidden md:block w-48
            "
                >
                  <img
                    src="/hacker.jpg"
                    alt="Information Systems"
                    className="w-72 rounded-xl"
                  />
                </div>
              </div>
            </span>
            .
          </h2>
        </div>
      </section>

      {/* ================= SCREEN 2 ================= */}
      <section
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        className={`w-screen h-screen flex-shrink-0  px-6 py-24 flex items-center transition-all px-6 py-24 duration-[600ms] ease-out ${getSectionClass(1)}`}
      >
        <div
          className="
    w-full

    px-6
    sm:px-12
    md:px-16
    lg:px-24
  "
        >
          <span className="text-sm tracking-widest font-mono text-primary mb-6 inline-block">
            {scrambleKey[1] > 0 ? (
              <ScrambleText
                key={`journey-${scrambleKey[1]}`}
                text="./journey"
                start={true}
                duration={0.6}
              />
            ) : (
              "./journey"
            )}
          </span>

          <h2
            className="text-4xl
md:text-4xl
lg:text-5xl font-semibold leading-tight max-w-5xl"
          >
            During academic studies, built experience across multiple{" "}
            {/* ✅ UI/UX HOVER */}
            <span className="relative inline group">
              <span
                onMouseEnter={() => setHoveredWord("uiux")}
                onMouseLeave={() => setHoveredWord(null)}
                className="hover:text-black transition-colors cursor-pointer underline decoration-primary decoration-4 underline-offset-8 hover:bg-primary"
                data-cursor="hover"
              >
                UI/UX
              </span>

              <div
                className={`
            pointer-events-none
            absolute
            left-1/2
            top-full
            mt-1
            -translate-x-1/2
            transition-all
            duration-300
            ease-out
            ${hoveredWord === "uiux" ? "opacity-100 scale-100" : "opacity-0 scale-100"}
          `}
              >
                <div
                  className="
              rounded-xl
              bg-white/10
              backdrop-blur-sm 
              border border-white/20
              shadow-xl
              p-2.5
              hidden md:block w-48
            "
                >
                  <img
                    src="/uiux1.jpg"
                    alt="UI/UX Design"
                    className="w-72 rounded-xl"
                  />
                </div>
              </div>
            </span>{" "}
            and {/* ✅ GRAPHIC DESIGN HOVER */}
            <span className="relative inline group">
              <span
                onMouseEnter={() => setHoveredWord("graphic")}
                onMouseLeave={() => setHoveredWord(null)}
                className="hover:text-black transition-colors cursor-pointer underline decoration-primary decoration-4 underline-offset-8 hover:bg-primary"
                data-cursor="hover"
              >
                Graphic Design
              </span>

              <div
                className={`
            pointer-events-none
            absolute
            left-1/2
            top-full
            mt-1
            -translate-x-1/2
            transition-all
            duration-300
            ease-out
            ${hoveredWord === "graphic" ? "opacity-100 scale-100" : "opacity-0 scale-100"}
          `}
              >
                <div
                  className="
              rounded-xl
              bg-white/10
              backdrop-blur-sm 
              border border-white/20
              shadow-xl
              p-2.5
              hidden md:block w-48
            "
                >
                  <img
                    src="/graphicdesign.jpg"
                    alt="Graphic Design"
                    className="w-72 rounded-xl"
                  />
                </div>
              </div>
            </span>{" "}
            roles in Jakarta.
          </h2>
        </div>
      </section>

      {/* ================= SCREEN 3 ================= */}
      <section
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        className={`w-screen h-screen flex-shrink-0  px-6 py-24 flex items-center transition-all duration-[600ms] ease-out ${getSectionClass(2)}`}
      >
        <div
          className="
    w-full

    px-6
    sm:px-12
    md:px-16
    lg:px-24
  "
        >
          <span className="text-sm tracking-widest font-mono text-primary mb-6 inline-block">
            {scrambleKey[2] > 0 ? (
              <ScrambleText
                key={`exp-${scrambleKey[2]}`}
                text="./experience"
                start={true}
                duration={0.6}
              />
            ) : (
              "./experience"
            )}
          </span>

          <h2
            className="text-4xl
md:text-4xl
lg:text-5xl font-semibold leading-tight max-w-5xl"
          >
            Began working as a{" "}
            <span className="relative inline group">
              <span
                onMouseEnter={() => setHoveredWord("freelance")} // ✅ unique-id harus beda tiap kata
                onMouseLeave={() => setHoveredWord(null)}
                className="hover:text-black transition-colors cursor-pointer underline decoration-primary decoration-4 underline-offset-8 hover:bg-primary"
                data-cursor="hover"
              >
                freelance
              </span>
              <div
                className={`
            pointer-events-none
            absolute
            left-1/2
            top-full
            mt-1
            -translate-x-1/2
            transition-all
            duration-300
            ease-out
            ${hoveredWord === "freelance" ? "opacity-100 scale-100" : "opacity-0 scale-100"}
          `}
              >
                <div
                  className="
              rounded-xl
              bg-white/10
              backdrop-blur-sm 
              border border-white/20
              shadow-xl
              p-2.5
              hidden md:block w-48
            "
                >
                  <img
                    src="/freelance.jpg"
                    alt="Freelance"
                    className="w-72 rounded-xl"
                  />
                </div>
              </div>
            </span>{" "}
            UI/UX and graphic designer in 2024.
          </h2>
        </div>
      </section>
    </>
  );
}
