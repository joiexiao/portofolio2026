"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { AnimatedNoise } from "@/components/animated-noise";
import { usePageTransition } from "@/components/page-transition";
import TransitionLink from "@/components/transition-link";

export default function MenuPage() {
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const { navigate, goBack } = usePageTransition();

  useEffect(() => {
    if (itemsRef.current.length === 0) return;

    /* ===============================
       INITIAL STATE
    ================================ */
    gsap.set(itemsRef.current, {
      x: -120,
      opacity: 0,
      filter: "blur(6px)",
    });

    /* ===============================
       ANIMATE IN
       (nunggu transition-page kelar)
    ================================ */
    const timer = setTimeout(() => {
      gsap.to(itemsRef.current, {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: {
          each: 0.12,
          from: "start", // TOP → BOTTOM
        },
      });
    }, 900); // ⬅️ samain sama durasi transition-page lo

    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/#contact" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 120; // offset header

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <main className="fixed inset-0 text-white">
      {/* GRID BG */}
      <div
        className="grid-bg fixed inset-0 opacity-50 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* NOISE */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <AnimatedNoise opacity={0.03} />
      </div>

      {/* CONTAINER */}
      <div className="relative h-full px-6 z-10">
        {/* CLOSE CTA */}
        <div className="fixed top-12 inset-x-0 z-50 px-6 md:px-12">
          <div className="flex justify-end">
            <button
              onClick={goBack}
              data-cursor="hover"
              className="
          fixed top-12 right-12
          font-mono text-4xl
          text-primary
          hover:bg-primary hover:text-background
          transition-colors underline underline-offset-5 decoration-2"
            >
              close
            </button>
          </div>
        </div>

        {/* MENU */}
        <nav className="h-full flex items-center">
          <ul className="mx-32 space-y-8 text-8xl leading-none font-light">
            {menuItems.map((item, i) => (
              <li
                key={item.label}
                ref={(el) => {
                  if (el) itemsRef.current[i] = el;
                }}
              >
                <TransitionLink
                  href={item.href}
                  className="group block w-fit cursor-hover"
                  data-cursor="hover"
                >
                  <div className="relative inline-block overflow-hidden">
                    {/* BACKGROUND BLOCK */}
                    <div
                      className="
                        absolute inset-y-0 left-0 w-full
                        bg-accent
                        scale-x-0 origin-left
                        transition-transform duration-500 ease-out
                        group-hover:scale-x-100
                      "
                    />

                    {/* TEXT */}
                    <span
                      className="
    relative z-10 px-2
    transition-colors duration-300
    group-hover:text-background
  "
                      data-cursor="hover"
                    >
                      {item.label}
                    </span>
                  </div>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
