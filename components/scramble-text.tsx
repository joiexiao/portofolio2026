"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delayMs?: number;
  duration?: number;
  start?: boolean; // 🔥 trigger dari luar
  onComplete?: () => void; // 🔥 TAMBAH INI
}

interface ScrambleTextOnHoverProps {
  text: string;
  className?: string;
  /** Duration of the scramble animation in seconds */
  duration?: number;
  /** Element type to render */
  as?: "span" | "button" | "div";
  /** onClick handler for buttons */
  onClick?: () => void;
}

const GLYPHS = "!@#$%^&*()_+-=<>?/\\[]{}Xx";

/**
 * Run the scramble animation on text
 */
function runScrambleAnimation(
  text: string,
  duration: number,
  setDisplayText: (text: string) => void,
  onComplete?: () => void,
): gsap.core.Tween {
  const lockedIndices = new Set<number>();
  const finalChars = text.split("");
  const totalChars = finalChars.length;
  const scrambleObj = { progress: 0 };

  return gsap.to(scrambleObj, {
    progress: 1,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      const numLocked = Math.floor(scrambleObj.progress * totalChars);

      for (let i = 0; i < numLocked; i++) {
        lockedIndices.add(i);
      }

      const newDisplay = finalChars
        .map((char, i) => {
          if (lockedIndices.has(i)) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplayText(newDisplay);
    },
    onComplete: () => {
      setDisplayText(text);
      onComplete?.();
    },
  });
}

/**
 * Scramble text animation component - animates on mount.
 */
export function ScrambleText({
  text,
  className,
  delayMs = 0,
  duration = 0.9,
  start = false, // 🔥 TAMBAH INI
  onComplete, // 🔥 TAMBAH INI
}: ScrambleTextProps) {
  // Initialize with text to avoid flash of empty content
  const [displayText, setDisplayText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!start || hasAnimated || !text) return;

    const scrambledStart = text
      .split("")
      .map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
      .join("");
    setDisplayText(scrambledStart);

    timeoutRef.current = setTimeout(() => {
      animationRef.current = runScrambleAnimation(
        text,
        duration,
        setDisplayText,
        () => {
          setHasAnimated(true);
          onCompleteRef.current?.(); // 🔥 PAKE REF
        },
      );
    }, delayMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationRef.current) animationRef.current.kill();
    };
  }, [start]); // 🔥 TETEP CUMA [start]

  // Empty deps - only run on mount

  // Handle text prop changes after initial animation
  useEffect(() => {
    if (hasAnimated && displayText !== text) {
      setDisplayText(text);
    }
  }, [text, hasAnimated, displayText]);

  return (
    <span ref={containerRef} className={className}>
      {start ? displayText : ""}
    </span>
  );
}

/**
 * Scramble text animation component - animates on hover.
 */
export function ScrambleTextOnHover({
  text,
  className,
  duration = 0.4,
  as: Component = "span",
  onClick,
  ...props
}: ScrambleTextOnHoverProps & React.HTMLAttributes<HTMLElement>) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // Kill any existing animation
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    // Start with scrambled
    const scrambledStart = text
      .split("")
      .map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
      .join("");
    setDisplayText(scrambledStart);

    tweenRef.current = runScrambleAnimation(
      text,
      duration,
      setDisplayText,
      () => {
        isAnimating.current = false;
      },
    );
  }, [text, duration]);

  // Update display text if text prop changes
  useEffect(() => {
    if (!isAnimating.current) {
      setDisplayText(text);
    }
  }, [text]);

  return (
    <Component
      {...props}
      className={className}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {displayText}
    </Component>
  );
}
