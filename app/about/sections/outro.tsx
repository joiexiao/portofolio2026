"use client";

import TransitionLink from "@/components/transition-link";
import gsap from "gsap";
import { useRef, useEffect, useState, forwardRef } from "react";
import { ScrambleText } from "@/components/scramble-text";
import { ScrambleTextOnHover } from "@/components/scramble-text";
import { BitmapChevron } from "@/components/bitmap-chevron";
import { Mail, Github, Linkedin } from "lucide-react";

/* ===============================
   WORD POSITIONS (PX BASED)
================================ */
const words = [
  // top arc
  { text: "make it happen!", x: -170, y: -45, size: "text-sm" },
  { text: "why not?", x: -90, y: -80, size: "text-sm" },
  { text: "fancy that?", x: 100, y: -80, size: "text-sm" },

  // upper mid
  { text: "let's begin!", x: 0, y: -50, size: "text-sm" },
  { text: "take it further!", x: 150, y: -45, size: "text-sm" },

  // mid
  { text: "proceed", x: -220, y: -10, size: "text-sm" },
  { text: "onwards", x: -210, y: 23, size: "text-sm" },
  { text: "next step", x: 220, y: -10, size: "text-sm" },

  // bottom mid
  { text: "start here", x: 220, y: 18, size: "text-sm" },

  // bottom arc
  { text: "together", x: 0, y: -90, size: "text-sm" },
  { text: "#opentowork", x: 0, y: 90, size: "text-sm" },
  { text: "let's see", x: 140, y: 50, size: "text-sm" },
  { text: "let's make it real!", x: 0, y: 60, size: "text-sm" },
  { text: "be in touch!", x: -150, y: 50, size: "text-sm" },
];

interface OutroProps {}

const Outro = forwardRef<HTMLElement, OutroProps>((props, ref) => {
  const itemsRef = useRef<HTMLSpanElement[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [startScramble, setStartScramble] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    const timer = setTimeout(() => {
      gsap.from(titleRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
          setStartScramble(true);
        },
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (itemsRef.current.length === 0) return;

    gsap.set(itemsRef.current, {
      opacity: 0,
      scale: 0.85,
      filter: "blur(4px)",
    });
  }, []);

  const show = () => {
    setIsHovered(true);
    gsap.to(itemsRef.current, {
      opacity: 0.9,
      scale: 1,
      filter: "blur(0px)",
      stagger: {
        amount: 0.6,
        from: "random",
      },
      duration: 0.5,
      ease: "back.out(1.6)",
    });
  };

  const hide = () => {
    setIsHovered(false);
    gsap.to(itemsRef.current, {
      opacity: 0,
      scale: 0.85,
      filter: "blur(4px)",
      stagger: {
        amount: 0.3,
        from: "random",
      },
      duration: 0.35,
      ease: "power2.in",
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative"
    >
      {/* ✅ TOP RIGHT - Time & Location */}
      <div className="absolute top-24 left-32 right-32">
        <div className="relative">
          {/* LEFT TEXT */}
          <div className="text-left">
            <p className="text-2xl font-medium">
              Bogor, IDN{" "}
              <span className="text-white/60 text-sm">
                (currently at Coffee Shop)
              </span>
            </p>
            <p className="text-2xl font-medium">
              {formatTime()} {formatDate()}
            </p>
          </div>

          {/* RIGHT LINK */}
          <TransitionLink
            href="/resume"
            data-cursor="hover"
            className="absolute right-0 top-1 font-mono text-xs uppercase tracking-widest text-white hover:text-primary underline underline-offset-4 decoration-1 transition-colors duration-200"
          >
            <ScrambleTextOnHover
              text="jaid's resume"
              as="span"
              duration={0.6}
              className="cursor-hover"
              data-cursor="hover"
            />
          </TransitionLink>
        </div>
      </div>

      {/* CENTER WRAPPER */}
      <div className="flex items-center relative">
        <h1
          ref={titleRef}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((p) => !p);
          }}
          onMouseEnter={show}
          onMouseLeave={hide}
          className="relative z-10 font-mono font-bold text-6xl leading-none cursor-pointer select-none hero-title text-primary underline underline-offset-8 decoration-4 hover:bg-primary hover:text-background"
          style={{
            textShadow: isHovered ? "0 0 40px rgba(96,165,250,0.5)" : "none",
          }}
          data-cursor="hover"
        >
          <ScrambleText text="shall we?" start={startScramble} duration={0.9} />
        </h1>

        {/* WORD CLOUD */}
        <div className="absolute inset-0 pointer-events-none">
          {words.map((item, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className={`absolute font-mono ${item.size} text-white whitespace-nowrap`}
              style={{
                left: `calc(50% + ${item.x}px)`,
                top: `calc(50% + ${item.y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {item.text}
            </span>
          ))}
        </div>

        {open && (
          <div
            ref={modalRef}
            className="
       absolute left-1/2 top-full mt-4
      -translate-x-1/2
      flex items-center gap-8
      rounded-2xl
      backdrop-blur-sm

      px-[30px] py-[24px]
    "
            style={{
              background: "rgba(167, 202, 255, 0.10)",
              outline: "1px rgba(166.73, 202.04, 255, 0.40) solid",
              outlineOffset: "-1px",
              boxShadow: "0 0 30px rgba(96,165,250,0.25)",
            }}
          >
            <a
              href="mailto:mujahidazzam16@gmail.com"
              className="opacity-50 hover:opacity-100 transition"
              aria-label="Email"
              data-cursor="hover"
            >
              <Mail size={32} color="white" strokeWidth={1.5} />
            </a>

            <a
              href="https://www.linkedin.com/in/mujahidazzam"
              target="_blank"
              className="opacity-50 hover:opacity-100 transition"
              aria-label="LinkedIn"
              data-cursor="hover"
            >
              <Linkedin size={32} color="white" strokeWidth={1.5} />
            </a>

            <a
              href="https://github.com/joiexiao"
              target="_blank"
              className="opacity-50 hover:opacity-100 transition"
              aria-label="GitHub"
              data-cursor="hover"
            >
              <Github size={32} color="white" strokeWidth={1.5} />
            </a>
          </div>
        )}
      </div>

      {/* ✅ BOTTOM CENTER - Contact Button */}
      <div className="absolute bottom-24 right-32">
        <TransitionLink
          href="/#work"
          className="group inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200"
          data-cursor="hover"
        >
          <ScrambleTextOnHover text="View Projects" as="span" duration={0.6} />
          <BitmapChevron className="transition-transform duration-[500ms]' ease-in-out group-hover:rotate-45" />
        </TransitionLink>
      </div>
    </section>
  );
});

Outro.displayName = "Outro";

export default Outro;
