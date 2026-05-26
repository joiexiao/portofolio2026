"use client";

import { useEffect, useState } from "react";
import TransitionLink from "@/components/transition-link";
import { HeroSection } from "@/components/hero-section";
import { SignalsSection } from "@/components/signals-section";
import { WorkSection } from "@/components/work-section";
import { PrinciplesSection } from "@/components/principles-section";
import { ContactSection } from "@/components/contact-section";
import { SideNav } from "@/components/side-nav";
import { AnimatedNoise } from "@/components/animated-noise";
import CustomCursor from "@/components/ui/custom-cursor";
import PageLoader from "@/components/page-loader";

export default function Page() {
  const [showMenuCTA, setShowMenuCTA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [triggerGlitch, setTriggerGlitch] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("initialLoadComplete");

    if (!hasLoaded) {
      setIsLoading(true);
    } else {
      setShowContent(true);
    }
  }, []);

  const handleLoaderFinish = () => {
    sessionStorage.setItem("initialLoadComplete", "true");

    // ✅ LANGSUNG show content (ga pake delay)
    setShowContent(true);

    // ✅ Trigger glitch SEDIKIT SEBELUM loader ilang (overlap)
    setTimeout(() => {
      setTriggerGlitch(true);
    }, 200); // ⬅️ trigger pas phase 4 loader (slice effect)

    // ✅ Baru remove loader SETELAH content muncul
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  useEffect(() => {
    if (!window.location.hash) return;

    const id = window.location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "auto" });
      });
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) {
        setShowMenuCTA(true);
      } else {
        setShowMenuCTA(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <CustomCursor />

      {isLoading && <PageLoader onFinish={handleLoaderFinish} />}

      <main
        className={`
          relative min-h-screen overflow-hidden
          transition-opacity duration-500
          ${showContent ? "opacity-100" : "opacity-0"}
        `}
      >
        <SideNav />

        <div className="grid-bg fixed inset-0 opacity-50" aria-hidden="true" />

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

        <div className="relative z-10">
          <AnimatedNoise opacity={0.03} />
          <HeroSection triggerGlitch={triggerGlitch} />
          <SignalsSection />
          <WorkSection />
          <PrinciplesSection />
          <ContactSection />
        </div>
      </main>
    </>
  );
}
