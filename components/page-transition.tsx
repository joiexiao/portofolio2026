"use client";

import { createContext, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

type PageTransitionContextType = {
  navigate: (href: string) => void;
  goBack: () => void;
  onReady: (cb: () => void) => void;
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

  // Track apakah ada transisi yang pernah jalan
  const hasTransitioned = useRef(false);
  // Queue callbacks yang nunggu transisi selesai
  const readyCallbacks = useRef<(() => void)[]>([]);

  // Dipanggil dari page/component buat daftarin callback
  const onReady = (cb: () => void) => {
    if (!hasTransitioned.current) {
      // Gak ada transisi (direct URL access), langsung fire
      cb();
    } else {
      readyCallbacks.current.push(cb);
    }
  };

  // Fire semua callback yang udah didaftarin, terus bersih
  const fireReady = () => {
    readyCallbacks.current.forEach((cb) => cb());
    readyCallbacks.current = [];
  };

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
    hasTransitioned.current = true;

    // ⛔ hide scrollbar BEFORE animation starts
    lockScroll();

    gsap.set([blueRef.current, darkRef.current], {
      y: "100%",
    });

    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onComplete: () => {
        isAnimating.current = false;

        readyCallbacks.current.forEach((cb) => cb());
        unlockScroll(); // ✅ restore scrollbar AFTER exit
      },
    });

    // ENTER
    tl.to(blueRef.current, { y: "0%", duration: 0.9 });
    tl.to(darkRef.current, { y: "0%", duration: 0.9 }, "-=0.5");

    // MID ACTION (route change)
    tl.add(onMid);

    // EXIT — fireReady dipanggil pas layer terakhir selesai exit
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

    // trigger next page animation sedikit sebelum layer habis
    tl.call(fireReady, [], "-=0.85");
  };

  const navigate = (href: string) => {
    playTransition(() => router.push(href));
  };

  const goBack = () => {
    playTransition(() => router.back());
  };

  return (
    <PageTransitionContext.Provider value={{ navigate, goBack, onReady }}>
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
