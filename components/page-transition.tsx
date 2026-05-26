"use client";

import { createContext, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

type PageTransitionContextType = {
  navigate: (href: string) => void;
  goBack: () => void;
};

const PageTransitionContext = createContext<PageTransitionContextType | null>(
  null,
);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used inside PageTransition");
  }
  return ctx;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const blueRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // 🔒 lock scroll + hide scrollbar
  const lockScroll = () => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  };

  // 🔓 restore scroll
  const unlockScroll = () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  };

  const playTransition = (onMid: () => void) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // ⛔ hide scrollbar BEFORE animation starts
    lockScroll();

    gsap.set([blueRef.current, darkRef.current], {
      y: "100%",
    });

    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onComplete: () => {
        isAnimating.current = false;
        unlockScroll(); // ✅ restore scrollbar AFTER exit
      },
    });

    // ENTER
    tl.to(blueRef.current, { y: "0%", duration: 0.9 });
    tl.to(darkRef.current, { y: "0%", duration: 0.9 }, "-=0.5");

    // MID ACTION (route change)
    tl.add(onMid);

    // EXIT
    tl.to(blueRef.current, { y: "-100%", duration: 0.9 });
    tl.to(
      darkRef.current,
      {
        y: "-100%",
        duration: 1.15,
        ease: "power3.inOut",
      },
      "-=0.15",
    );
  };

  const navigate = (href: string) => {
    playTransition(() => router.push(href));
  };

  const goBack = () => {
    playTransition(() => router.back());
  };

  return (
    <PageTransitionContext.Provider value={{ navigate, goBack }}>
      {children}

      {/* DARK LAYER */}
      <div
        ref={darkRef}
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{ background: "#111", transform: "translateY(100%)" }}
      />

      {/* BLUE LAYER */}
      <div
        ref={blueRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{
          background: "oklch(0.82 0.09 255)",
          transform: "translateY(100%)",
        }}
      />
    </PageTransitionContext.Provider>
  );
}
