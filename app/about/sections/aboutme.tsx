"use client";

import { ScrambleText } from "@/components/scramble-text";
import { useEffect, useRef, useState } from "react";

export default function AboutMe() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [scrambleKey, setScrambleKey] = useState<number[]>([0, 0, 0, 0]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

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

            setTimeout(() => {
              setScrambleKey((prev) => {
                const copy = [...prev];
                copy[index] = copy[index] + 1;
                return copy;
              });
            }, 600);
          } else {
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
        className={`w-screen h-screen flex-shrink-0 flex items-center transition-all duration-[600ms] px-6 py-24 ease-out ${getSectionClass(0)}`}
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
          <h1
            className="text-3xl
md:text-5xl
lg:text-6xl font-medium leading-tight"
          >
            Clients and companies
            <br />
            I've worked with
          </h1>
          <div className="w-24 h-px bg-accent my-6 transition-all duration-500 group-hover:w-full" />
          <div className="space-y-1">
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Universitas Pembangunan Nasional Veteran Jakarta
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Yayasan Amaliah ASTRA
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Levi Camp
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Heulaulabs
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Think Store
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Malky Joki
            </p>
          </div>
        </div>
      </section>

      {/* ================= SCREEN 2 ================= */}
      <section
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        className={`w-screen h-screen flex-shrink-0 flex items-center transition-all duration-[600ms] px-6 py-24 ease-out ${getSectionClass(1)}`}
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
          <h1
            className="text-3xl
md:text-5xl
lg:text-6xl  font-medium leading-tight"
          >
            Clients and companies I’d love
            <br />
            to work with in the future
          </h1>
          <div className="w-24 h-px bg-accent my-6 transition-all duration-500 group-hover:w-full" />
          <div className="space-y-1">
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Entertainment brands and studios
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Non-profit organisations and charitable initiatives
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Early-stage startups
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Independent and small businesses
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Artists and creative practitioners
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl mt-12"
            >
              I’m drawn to working alongside people who are genuinely committed
              to creating positive change.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SCREEN 3 ================= */}
      <section
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        className={`w-screen h-screen flex-shrink-0 flex items-center transition-all duration-[600ms] px-6 py-24 ease-out ${getSectionClass(2)}`}
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
          <h1
            className="text-3xl
md:text-5xl
lg:text-6xl  font-medium leading-tight"
          >
            What keeps me busy
            <br />
            outside of work
          </h1>
          <div className="w-24 h-px bg-accent my-6 transition-all duration-500 group-hover:w-full" />
          <div className="space-y-1">
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Training at the gym
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Watching anime, as well as reading manhwa and manga
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Enjoying time alone with a coffee and a quiet smoke
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Reading, with a strong interest in philosophy and non-fiction
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Spending meaningful time with family
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Listening to music while zoning out
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl mt-12"
            >
              Exploring new places, ideally ones I’ve never experienced before.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SCREEN 4 ================= */}
      <section
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        className={`w-screen h-screen flex-shrink-0 flex items-center transition-all duration-[600ms] px-6 py-24 ease-out ${getSectionClass(3)}`}
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
          <h1
            className="text-3xl
md:text-5xl
lg:text-6xl  font-medium leading-tight"
          >
            What I hope to achieve in
            <br />
            the future
          </h1>
          <div className="w-24 h-px bg-accent my-6 transition-all duration-500 group-hover:w-full" />
          <div className="space-y-1">
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Creating meaningful work that brings joy through design
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Continuing to learn and experiment with Webflow
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Discovering quiet places to enjoy a smoke around the world
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Spending more time with family
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl"
            >
              Exploring the city through street photography
            </p>
            <p
              className="text-sm
md:text-xl
lg:text-2xl mt-12"
            >
              In the long run, I aim to apply my skills in ways that create a
              positive difference, however small.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
