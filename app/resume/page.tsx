"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Old_Standard_TT } from "next/font/google";
import localFont from "next/font/local";
import { ScrambleTextOnHover } from "@/components/scramble-text";
import TransitionLink from "@/components/transition-link";

// Font Configuration - Langsung di file ini
const oldStandardTT = Old_Standard_TT({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Old English Text MT (self-hosted)
// Download dari: https://www.dafont.com/ atau font repository lainnya
// Letakkan di: public/fonts/OldEnglishTextMT.woff2
const oldEnglishText = localFont({
  src: [
    {
      path: "../../public/fonts/OldEnglishTextMT.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});

// ScrambleText Component
const ScrambleText = ({
  text,
  duration = 1000,
}: {
  text: string;
  duration?: number;
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setIsAnimating(true);
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
      const originalText = text;
      let iteration = 0;

      const interval = setInterval(() => {
        setDisplayText(
          originalText
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return originalText[index];
              }
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join(""),
        );

        if (iteration >= originalText.length) {
          clearInterval(interval);
          setIsAnimating(false);
        }

        iteration += 1 / 3;
      }, duration / originalText.length);

      return () => clearInterval(interval);
    }, 800);

    return () => clearTimeout(initialDelay);
  }, [text, duration]);

  return <span className="font-mono">{displayText}</span>;
};

// Download Button Component
const DownloadButton = () => {
  return (
    <motion.a
      href="/Mujahid-Azzam-Resume.pdf"
      download
      data-cursor="hover"
      className="
      px-6 py-3
      border border-foreground/20
      backdrop-blur-xl
      font-mono text-xs uppercase tracking-widest
      text-foreground text-center
      hover:border-accent hover:text-accent
      transition-all duration-200
    "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ScrambleTextOnHover text="Download Resume" />
    </motion.a>
  );
};

export default function ResumePage() {
  return (
    <motion.div
      className="relative h-fit text-white p-8 md:p-12 lg:p-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with scramble text */}
      <div className="pt-12 mb-12 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-sm md:text-base font-mono text-primary">
          <ScrambleText text="./portfolio/mujahid-azzam/resume" />
        </h1>

        {/* Desktop Only */}
        <div className="hidden md:block">
          <DownloadButton />
        </div>
      </div>

      {/* Main Content Grid */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto ${oldStandardTT.className}`}
      >
        {/* Left Column */}
        <motion.div
          className={`border border-white p-8 lg:p-10 space-y-4 ${oldStandardTT.className}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Header Section */}
          <div className="text-center space-y-2 pb-2 border-b border-white">
            <h1
              className={`text-3xl lg:text-4xl tracking-wide ${oldStandardTT.className}`}
            >
              Mujahid Azzam Darmawan
            </h1>
          </div>
          <div className="text-center space-y-2 pb-3 border-b border-white">
            <p className="text-xs text-gray-300">Tapos, Kota Depok, 16457</p>
            <div className="flex flex-wrap justify-center gap-x-1 text-xs text-gray-300">
              <span>mujahidazzam16@gmail.com</span>
              <span>|</span>
              <a
                href="https://wa.me/6287808677159"
                className="hover:text-primary transition-colors"
                data-cursor="hover"
              >
                087808677159
              </a>
              <span>|</span>
              <a
                href="https://linkedin.com/in/mujahidazzam"
                className="hover:text-primary transition-colors"
                data-cursor="hover"
              >
                linkedin.com/in/mujahidazzam
              </a>
              <span>|</span>
              <a
                href="https://github.com/joiexiao"
                className="hover:text-primary transition-colors"
                data-cursor="hover"
              >
                github.com/joiexiao
              </a>
            </div>
          </div>

          {/* Intro Paragraph */}
          <div className="space-y-4">
            <div className="space-y-4">
              <p
                className={`float-left mr-3 -mt-1 text-[96px] leading-[0.90] ${oldEnglishText.className}`}
              >
                I
              </p>

              <p className="text-xs leading-[1.75] text-justify">
                come from an Information Systems background and have an interest
                in creative digital design. I work with both technical structure
                and visual design principles to create solutions that are clear,
                functional, and visually considered. I am interested in
                exploring how technology and visual expression can work together
                in a balanced way.
              </p>
            </div>
          </div>

          {/* Educations */}
          <div className="space-y-4">
            <h2
              className={`text-xl border-b border-white pb-1 ${oldStandardTT.className}`}
            >
              Educations
            </h2>
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">
                    Diploma of Information System, UPN "Veteran" Jakarta -
                    Jakarta, Indonesia
                  </h3>
                  <p className="text-xs text-gray-400">GPA : 3.71 / 4.00</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  Aug 2022 - Jan 2026
                </span>
              </div>
            </div>
          </div>

          {/* Experiences */}
          <div className="space-y-6">
            <h2
              className={`text-xl border-b border-white pb-1 ${oldStandardTT.className}`}
            >
              Experiences
            </h2>

            {/* UI/UX Designer - Heulanitas */}
            <div>
              <div
                className={`flex justify-between items-start mb-2 ${oldStandardTT.className}`}
              >
                <h3 className="text-sm font-semibold flex-1">
                  UI/UX Designer, Heulaulabs - Jakarta, Indonesia
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  Feb 2025 - Present
                </span>
              </div>
              <ul className="text-xs space-y-1 leading-relaxed list-disc list-outside pl-4 marker:text-gray-400">
                <li>
                  Designed user interfaces for web-based applications by
                  translating user requirements into structured wireframes, user
                  flows, and high-fidelity prototypes.
                </li>
                <li>
                  Worked with visual hierarchy, typography, and spacing to
                  improve clarity and consistency across screens.
                </li>
                <li>
                  Collaborated with developers to ensure designs were
                  implemented accurately and responsively.
                </li>
                <li>
                  Maintained design systems including typography, color
                  palettes, and reusable components to support scalable product
                  development.
                </li>
              </ul>
            </div>

            {/* Graphic Designer - Malky Joki Store */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold flex-1">
                  Graphic Designer, Malky Joki Store - Jakarta, Indonesia
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  Jan 2023
                </span>
              </div>
              <ul className="text-xs space-y-1 leading-relaxed list-disc list-outside pl-4 marker:text-gray-400">
                <li>
                  Designed digital graphic assets such as social media posts,
                  banners, and promotional visuals.
                </li>
                <li>
                  Applied layout, typography, and color principles to ensure
                  clear and consistent visual communication.
                </li>
                <li>
                  Revised and adjusted designs based on feedback and content
                  requirements.
                </li>
              </ul>
            </div>

            {/* Graphic Designer - Think Store */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold flex-1">
                  Graphic Designer, Think Store - Bogor, Indonesia
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  Sep 2024
                </span>
              </div>
              <ul className="text-xs space-y-1 leading-relaxed list-disc list-outside pl-4 marker:text-gray-400">
                <li>
                  Created graphic design materials for digital and promotional
                  needs.
                </li>
                <li>
                  Ensured visual consistency across different design outputs and
                  platforms.
                </li>
                <li>Adapted designs to various formats and resolutions.</li>
              </ul>
            </div>

            {/* Graphic Designer - Amaliah ASTRA */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold flex-1">
                  Graphic Designer, Amaliah ASTRA - Jakarta, Indonesia
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  May 2025 - Jun 2025
                </span>
              </div>
              <ul className="text-xs space-y-1 leading-relaxed list-disc list-outside pl-4 marker:text-gray-400">
                <li>
                  Designed visual mockups for the Astra Kurban 2025 event,
                  focusing on the presentation and handover of sacrificial
                  animals.
                </li>
                <li>
                  Created layout concepts and visual compositions to support
                  clear communication during the event.
                </li>
                <li>
                  Ensured visual consistency with Astra’s branding and event
                  context.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Organization */}
          <div className="border border-white p-8 lg:p-10 space-y-6">
            <h2
              className={`text-xl border-b border-white pb-1 ${oldStandardTT.className}`}
            >
              Organization
            </h2>
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold flex-1">
                  Treasurer, HIMA D3 SI UPN "Veteran" Jakarta - Jakarta,
                  Indonesia
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  Jan 2024 - Dec 2024
                </span>
              </div>
              <ul className="text-xs space-y-1 leading-relaxed list-disc list-outside pl-4 marker:text-gray-400">
                <li>
                  Managed financial records and budgeting documentation for
                  organizational programs.
                </li>
                <li>
                  Supported internal documentation and coordination for
                  committee activities.
                </li>
              </ul>
            </div>
          </div>

          {/* Selected Projects */}
          <div className="border border-white p-8 lg:p-10 space-y-6">
            <h2
              className={`text-xl border-b border-white pb-1 ${oldStandardTT.className}`}
            >
              Selected Projects
            </h2>

            {/* Fund Small Capital */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold flex-1">
                  Fund Small Capital, Web Based Application - Project UI/UX
                  Designer
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  Jul 2025 - Dec 2025
                </span>
              </div>
              <ul className="text-xs space-y-1 leading-relaxed list-disc list-outside pl-4 marker:text-gray-400">
                <li>
                  Designed secured user interfaces for a financial web
                  application, focusing on clarity, accessibility, and ease of
                  use.
                </li>
                <li>
                  Created user flows, wireframes, and high-fidelity prototypes
                  to support smooth user journeys.
                </li>
                <li>
                  Ensured design alignment with business goals while maintaining
                  a clean and modern visual style.
                </li>
              </ul>
            </div>

            {/* Museum Bela Negara */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold flex-1">
                  Museum Bela Negara, Virtual Museum Web Platform - Project
                  UI/UX Designer
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  Aug 2024 - Oct 2024
                </span>
              </div>
              <ul className="text-xs space-y-1 leading-relaxed list-disc list-outside pl-4 marker:text-gray-400">
                <li>
                  Designed digital interfaces for a virtual museum experience.
                </li>
                <li>
                  Structured navigation and content organization to enhance
                  storytelling and user engagement.
                </li>
                <li>Balanced modern visual design with historical context.</li>
              </ul>
            </div>

            {/* levi Camp */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold flex-1">
                  Levi Camp, Camp Reservation Web Platform - Project UI/UX
                  Designer
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  Feb 2024 - Jul 2024
                </span>
              </div>
              <ul className="text-xs space-y-1 leading-relaxed list-disc list-outside pl-4 marker:text-gray-400">
                <li>
                  Designed interfaces for a camp reservation system with a focus
                  on booking clarity.
                </li>
                <li>
                  Simplified information flow to reduce user confusion during
                  the reservation process.
                </li>
                <li>Created responsive layouts for desktop and mobile use.</li>
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="border border-white p-8 lg:p-10 space-y-4">
            <h2
              className={`text-xl border-b border-white pb-1 ${oldStandardTT.className}`}
            >
              Technical Skills
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold mb-1">
                  Technologies / Framework:
                </h3>
                <p className="text-xs leading-relaxed">
                  Laravel, Tailwind CSS, Next.js, React.js, GSAP.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Soft Skills:</h3>
                <p className="text-xs leading-relaxed">
                  Structured thinking, visual problem solving, collaboration,
                  time management
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Tools:</h3>
                <p className="text-xs leading-relaxed">
                  Figma, Adobe Photoshop, Adobe Illustrator, Capcut, Canva,
                  Microsoft Word, Microsoft Excel, Visual Studio Code, NetBeans,
                  Android Studio, CodeBlocks, GitHub, Git.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Link */}
      <div className="pb-12 mt-12 flex justify-between items-center max-w-7xl mx-auto">
        {/* Mobile Only */}
        <div className="md:hidden">
          <DownloadButton />
        </div>

        <TransitionLink
          href="/"
          data-cursor="hover"
          className="
      font-mono
      text-xs
      uppercase
      text-primary
      underline
      underline-offset-4
      decoration-1
      hover:bg-primary
      hover:text-background
      transition-colors
      duration-200
    "
        >
          <ScrambleTextOnHover
            text="jaid's portfolio"
            as="span"
            duration={0.6}
            className="cursor-hover"
            data-cursor="hover"
          />
        </TransitionLink>
      </div>
    </motion.div>
  );
}
