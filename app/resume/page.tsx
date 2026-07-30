"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { ScrambleTextOnHover } from "@/components/scramble-text";
import TransitionLink from "@/components/transition-link";
import ThemeToggle from "@/components/ui/theme-toggle";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

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
              if (index < iteration) return originalText[index];
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

  const target = "mujahid-azzam";

  const start = text.indexOf(target);
  const end = start + target.length;

  return (
    <span className="text-xs sm:text-sm font-mono text-primary z-10">
      {displayText.slice(0, start)}

      <TransitionLink
        href="/about"
        data-cursor="hover"
        className="
          text-primary
          hover:bg-primary
          hover:text-background
          transition-colors duration-200
        "
      >
        <span
          className={`
            relative inline-block

            after:absolute
            after:left-0
            after:bottom-[1px]
            after:h-[0.5px]
            after:w-full
            after:bg-current

            after:origin-left
            after:transition-transform
            after:duration-500
            after:ease-out

            ${isAnimating ? "after:scale-x-0" : "after:scale-x-100"}
          `}
        >
          {displayText.slice(start, end)}
        </span>
      </TransitionLink>

      {displayText.slice(end)}
    </span>
  );
};

export default function ResumePage() {
  const [isDark, setIsDark] = useState(true);

  const panelStyle = isDark
    ? "border border-white/10 bg-[#0a0a0a] text-white"
    : "border border-black/10 bg-[#f8f4ec] text-black";

  const sectionTitle = `
    text-[10px]
    sm:text-xs
    uppercase
    tracking-[0.25em]
    pb-3
    border-b
    font-mono
    ${isDark ? "border-white/10 text-white/60" : "border-black/10 text-black/60"}
  `;

  const textMuted = isDark ? "text-white/50" : "text-black/50";

  const workExperience = [
    {
      company: "Heulaulabs",
      type: "Freelance, Jakarta, Indonesia",
      position: "UI/UX Designer",
      date: "Feb 2025 - Jul 2025",
      desc: [
        "Designed 20+ screens across 4 core user flows for Levi Camp, a camp reservation platform, covering the full process from user flow mapping to wireframes, high-fidelity mockups, and interactive prototypes.",
        "Collaborated with a cross-functional team of 2 developers and 1 project manager to ensure designs were implemented accurately and responsively.",
        "Built and customized a UI Kit into 30+ reusable components, reducing screen creation and content-filling time across the product.",
      ],
    },
    {
      company: "Kala Loop",
      type: "Freelance, Jakarta, Indonesia",
      position: "UI/UX Designer & Treasurer",
      date: "Mar 2026 - Present",
      desc: [
        "Designed 50+ user and admin dashboard screens for Common Ground, a combat sports event management platform, covering both mobile and desktop layouts.",
        "Designed 10+ features across user and admin flows, translating requirements into wireframes and high-fidelity designs.",
        "Managed team finances by creating internal PRDs and MOUs to formalize financial processes and responsibilities.",
        "Tracked team fund inflows and outflows, preparing ad-hoc recaps when significant expenses or calculation discrepancies occurred.",
      ],
    },
    {
      company: "Yayasan Amaliah ASTRA",
      type: "Internship, Jakarta, Indonesia",
      position: "Graphic Designer",
      date: "May 2025 - Jun 2025",
      desc: [
        "Designed a mockup template used for livestock handover documentation across 50+ partner companies during the Kurban Astra 2025 event.",
        "Created supporting materials including delivery letters and livestock handover data recaps to ensure clear documentation across all recipients.",
        "Redesigned the previous year's mockup through 2 revision rounds (1 major, 1 minor) to align with updated event branding.",
      ],
    },
    {
      company: "Think Store",
      type: "Freelance, Bogor, Indonesia",
      position: "Graphic Designer",
      date: "Sep 2024",
      desc: [
        "Established Think Store's brand identity from logo exploration to visual direction, creating a cohesive look for a thrifting/pre-loved fashion brand.",
        "Designed 5 promotional posters and 2 video content pieces for Instagram feeds and stories.",
      ],
    },
    {
      company: "Malky Joki Store",
      type: "Freelance, South Tangerang, Indonesia",
      position: "Graphic Designer",
      date: "Jan 2023",
      desc: [
        "Designed 15+ promotional posters for a Mobile Legends ranked boosting service, supporting ongoing digital content needs.",
        "Interpreted client-provided visual references into on-brand designs matching requested style and tone.",
      ],
    },
  ];

  const organizationalExperience = [
    {
      company: "Himpunan Mahasiswa D3 Sistem Informasi",
      type: "UPN \u201cVeteran\u201d Jakarta",
      position: "General Treasurer",
      date: "Jan 2024 - Dec 2024",
      desc: [
        "Managed financial operations for 2 core programs (membership dues and organizational uniform procurement), including fund disbursement requests from 5 divisions.",
        "Prepared monthly and end-of-period financial reports, maintaining organized documentation to support transparent budget management.",
        "Coordinated with committee members across 5 divisions and 36 members to manage program expenses and support successful execution of organizational activities.",
      ],
    },
  ];

  const selectedProjects = [
    {
      company: "Fund Small Capital",
      type: "Academic Project (Real Case Study)",
      position: "UI/UX Designer",
      date: "Jul 2025 - Dec 2025",
      desc: [
        "Designed 25+ screens across 10 user flows for 3 user roles in a web-based e-learning application, from user flow mapping to high-fidelity prototypes.",
        "Authored complete system documentation solo, including use case, activity (25+), sequence (20+), ERD, and class diagrams across 3 user roles, taking on end-to-end product design responsibilities from system architecture to interface design.",
        "Created a supplementary zine mockup as a self-initiated deliverable to present the project in a more engaging format.",
      ],
    },
    {
      company: "Museum Virtual Bela Negara",
      type: "Curricular Internship Project",
      position: "UI/UX Designer",
      date: "Aug 2024 - Oct 2024",
      desc: [
        "Designed 10+ screens for a virtual museum platform featuring photo and artifact collections, historical narratives, and interactive timelines.",
        "Structured navigation across 4 main menus and 7 content pages to improve storytelling flow and content discoverability.",
        "Balanced modern visual design with the university's brand color identity, maintaining a cohesive look between historical content and contemporary presentation.",
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`
      relative min-h-screen bg-black text-white
      px-4 py-6
      sm:px-8 sm:py-10
      lg:px-16 lg:py-14
      ${inter.className}
    `}
    >
      {/* GRID BG */}
      <div
        className="grid-bg fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* HEADER */}
      <div className="relative z-10 mb-6 sm:mb-10 lg:mb-12 flex items-center justify-between max-w-7xl mx-auto gap-4">
        <ScrambleText text="./portfolio/mujahid-azzam/resume" />

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* TOGGLE (ALWAYS VISIBLE) */}
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />

          {/* DOWNLOAD (DESKTOP ONLY) */}
          <motion.a
            href="/Mujahid-Azzam-Resume-Master.pdf"
            download
            data-cursor="hover"
            className="
            hidden md:block
            border border-white/10
            px-4 py-2
            font-mono text-[10px]
            uppercase tracking-[0.2em]
            text-white
            hover:text-primary
            hover:border-primary
            transition-all duration-300
          "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <ScrambleTextOnHover text="Download Resume" />
          </motion.a>
        </div>
      </div>

      {/* MOBILE FLOATING CTA */}
      <motion.a
        href="/Mujahid-Azzam-Resume.pdf"
        download
        data-cursor="hover"
        className="
        md:hidden
        fixed bottom-5 right-4
        z-20
        border sm:border-white/10
        px-4 py-2
        font-mono text-[10px]
        uppercase tracking-[0.2em]
        md:text-white
        text-primary
        border-primary
        bg-black/60 backdrop-blur
        md:hover:text-primary
        md:hover:border-primary
        hover:text-white
        hover:border-white
        transition-all duration-300
      "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <ScrambleTextOnHover text="Download Resume" />
      </motion.a>

      {/* MAIN WRAPPER */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-start">
          {/* ===== KOLOM KIRI ===== */}
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
            {/* HERO + EDUCATION + WORK EXPERIENCE */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`${panelStyle} p-5 sm:p-7 lg:p-8 space-y-6 transition-colors duration-500`}
            >
              {/* HERO */}
              <div className="space-y-5">
                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-2xl lg:text-3xl tracking-tight leading-none">
                    Mujahid Azzam Darmawan
                  </h1>

                  <p className="font-mono uppercase tracking-[0.3em] text-[10px] sm:text-xs sm:tracking-[0.1em] opacity-60">
                    UI/UX DESIGNER | GRAPHIC DESIGNER
                  </p>
                </div>

                <div
                  className={`flex flex-wrap w-full gap-x-2 gap-y-1 text-[10px] sm:text-xs ${textMuted}`}
                >
                  <a
                    href="mailto:mujahidazzam16@gmail.com"
                    target="_blank"
                    className="hover:opacity-100 transition-opacity hover:text-primary"
                    data-cursor="hover"
                  >
                    mujahidazzam16@gmail.com |
                  </a>
                  <a
                    href="https://wa.me/6287808677159"
                    target="_blank"
                    className="hover:opacity-100 transition-opacity hover:text-primary"
                    data-cursor="hover"
                  >
                    087808677159 |
                  </a>

                  <a
                    href="https://linkedin.com/in/mujahidazzam"
                    target="_blank"
                    className="hover:opacity-100 transition-opacity hover:text-primary"
                    data-cursor="hover"
                  >
                    linkedin.com/in/mujahidazzam |
                  </a>

                  <a
                    href="https://github.com/joiexiao"
                    target="_blank"
                    className="hover:opacity-100 transition-opacity hover:text-primary"
                    data-cursor="hover"
                  >
                    github.com/joiexiao |
                  </a>

                  <span>Depok, West Java, Indonesia</span>
                </div>

                <p className="text-[11px] sm:text-xs leading-[1.9] text-justify opacity-80">
                  Fresh graduate in Information Systems with 10+ completed
                  projects in UI/UX and graphic design, spanning freelance work
                  and case studies. Freelancing in digital design since 2023,
                  with hands-on experience in user research, wireframing,
                  high-fidelity prototyping, and visual design production.
                </p>
              </div>

              {/* WORK EXPERIENCE */}
              <section className="space-y-5">
                <h2 className={sectionTitle}>Work Experience</h2>

                {workExperience.map((item, i) => (
                  <div
                    key={i}
                    className={`
                space-y-3
                ${
                  i !== 0
                    ? `pt-6 border-t ${
                        isDark ? "border-white/10" : "border-black/10"
                      }`
                    : ""
                }
              `}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="text-[11px] sm:text-xs font-semibold tracking-wide">
                            {item.company}
                          </h3>

                          <span
                            className={`text-[10px] sm:text-xs ${textMuted}`}
                          >
                            —
                          </span>

                          <span
                            className={`
                        text-[10px] sm:text-xs
                        tracking-[0.12em]
                        ${textMuted}
                      `}
                          >
                            {item.type}
                          </span>
                        </div>

                        <p className="text-[10px] sm:text-xs mt-1 opacity-80">
                          {item.position}
                        </p>
                      </div>

                      <span
                        className={`
                    text-[10px] sm:text-xs
                    whitespace-nowrap
                    shrink-0
                    ${textMuted}
                  `}
                      >
                        {item.date}
                      </span>
                    </div>

                    <ul className="text-[10px] sm:text-xs space-y-2 leading-[1.8] list-disc pl-4 opacity-80">
                      {item.desc.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </motion.div>
          </div>

          {/* ===== KOLOM KANAN ===== */}
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
            {/* ORGANIZATIONAL EXPERIENCE - HIMA */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className={`${panelStyle} p-5 sm:p-7 lg:p-8 space-y-8 transition-colors duration-500 h-fit`}
            >
              <section className="space-y-5">
                <h2 className={sectionTitle}>Organizational Experience</h2>

                {organizationalExperience.map((item, i) => (
                  <div
                    key={i}
                    className={`
                space-y-3
                ${
                  i !== 0
                    ? `pt-6 border-t ${
                        isDark ? "border-white/10" : "border-black/10"
                      }`
                    : ""
                }
              `}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="text-[11px] sm:text-xs font-semibold tracking-wide">
                            {item.company}
                          </h3>

                          <span
                            className={`text-[10px] sm:text-xs ${textMuted}`}
                          >
                            —
                          </span>

                          <span
                            className={`
                        text-[10px] sm:text-xs
                        tracking-[0.12em]
                        ${textMuted}
                      `}
                          >
                            {item.type}
                          </span>
                        </div>

                        <p className="text-[10px] sm:text-xs mt-1 opacity-80">
                          {item.position}
                        </p>
                      </div>

                      <span
                        className={`
                    text-[10px] sm:text-xs
                    whitespace-nowrap
                    shrink-0
                    ${textMuted}
                  `}
                      >
                        {item.date}
                      </span>
                    </div>

                    <ul className="text-[10px] sm:text-xs space-y-2 leading-[1.8] list-disc pl-4 opacity-80">
                      {item.desc.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </motion.div>
            {/* SELECTED PROJECTS */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className={`${panelStyle} p-5 sm:p-7 lg:p-8 space-y-8 transition-colors duration-500 h-fit`}
            >
              <section className="space-y-5">
                <h2 className={sectionTitle}>Selected Projects</h2>

                {selectedProjects.map((item, i) => (
                  <div
                    key={i}
                    className={`
                space-y-3
                ${
                  i !== 0
                    ? `pt-6 border-t ${
                        isDark ? "border-white/10" : "border-black/10"
                      }`
                    : ""
                }
              `}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="text-[11px] sm:text-xs font-semibold tracking-wide">
                            {item.company}
                          </h3>

                          <span
                            className={`text-[10px] sm:text-xs ${textMuted}`}
                          >
                            —
                          </span>

                          <span
                            className={`
                        text-[10px] sm:text-xs
                        tracking-[0.12em]
                        ${textMuted}
                      `}
                          >
                            {item.type}
                          </span>
                        </div>

                        <p className="text-[10px] sm:text-xs mt-1 opacity-80">
                          {item.position}
                        </p>
                      </div>

                      <span
                        className={`
                    text-[10px] sm:text-xs
                    whitespace-nowrap
                    shrink-0
                    ${textMuted}
                  `}
                      >
                        {item.date}
                      </span>
                    </div>

                    <ul className="text-[10px] sm:text-xs space-y-2 leading-[1.8] list-disc pl-4 opacity-80">
                      {item.desc.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </motion.div>

            {/* EDUCATION */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={`${panelStyle} p-5 sm:p-7 lg:p-8 space-y-6 transition-colors duration-500 h-fit`}
            >
              <section className="space-y-5">
                <h2 className={sectionTitle}>Education</h2>

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[11px] sm:text-xs font-semibold tracking-wide flex-1">
                      Associate&apos;s Degree in Information Systems
                    </h3>

                    <span
                      className={`
            text-[10px] sm:text-xs
            whitespace-nowrap
            shrink-0
            ${textMuted}
          `}
                    >
                      Grade: 3.76
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <p className={`text-[10px] sm:text-xs flex-1 ${textMuted}`}>
                      Universitas Pembangunan Nasional &quot;Veteran&quot;
                      Jakarta
                    </p>

                    <span
                      className={`
            text-[10px] sm:text-xs
            whitespace-nowrap
            shrink-0
            ${textMuted}
          `}
                    >
                      Graduated: 2026
                    </span>
                  </div>
                </div>
              </section>
            </motion.div>

            {/* SKILLS */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className={`${panelStyle} p-5 sm:p-7 lg:p-8 space-y-6 transition-colors duration-500 h-fit min-h-[315px]`}
            >
              <section className="space-y-6">
                <h2 className={sectionTitle}>Skills</h2>

                <div className="space-y-1.5">
                  {[
                    {
                      title: "Technical Skill",
                      items: [
                        "React.js",
                        "Next.js",
                        "Laravel",
                        "Tailwind CSS",
                        "GSAP",
                      ],
                    },
                    {
                      title: "Tools",
                      items: [
                        "Figma",
                        "Adobe Photoshop",
                        "Adobe Illustrator",
                        "Notion",
                        "Canva",
                        "Google Analytics",
                        "Visual Studio Code",
                        "Git",
                        "GitHub",
                      ],
                    },
                    {
                      title: "Soft Skills",
                      items: [
                        "Adapting design approaches across diverse client briefs and project constraints, from concept exploration to structured, user-centered solutions",
                      ],
                    },
                    {
                      title: "Languages",
                      items: [
                        {
                          name: "Bahasa Indonesia",
                          level: "Native",
                        },
                        {
                          name: "English",
                          level: "Intermediate",
                        },
                      ],
                    },
                  ].map((skill, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
                    >
                      <h3 className="text-[11px] sm:text-xs font-semibold whitespace-nowrap sm:w-40 shrink-0">
                        {skill.title} :
                      </h3>

                      {skill.title === "Languages" ? (
                        <p className="text-[10px] sm:text-xs leading-[1.8] opacity-80">
                          {(
                            skill.items as {
                              name: string;
                              level: string;
                            }[]
                          )
                            .map((lang) => `${lang.name} (${lang.level})`)
                            .join(", ")}
                          .
                        </p>
                      ) : (
                        <p className="text-[10px] sm:text-xs leading-[1.8] opacity-80">
                          {(skill.items as string[]).join(", ")}.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="relative z-10 mt-6 sm:mt-10 lg:mt-12 max-w-7xl mx-auto flex items-center justify-between">
        {/* CTA */}
        <TransitionLink
          href="/"
          data-cursor="hover"
          className="
            font-mono
            text-[10px]
            sm:text-xs
            uppercase
            tracking-[0.15em]
            underline
            underline-offset-4
            decoration-1
            transition-colors
            duration-200
            hover:text-black
            text-primary
            hover:bg-accent
            "
        >
          <ScrambleTextOnHover
            text="jaid's portfolio"
            as="span"
            duration={0.6}
          />
        </TransitionLink>
      </div>
    </motion.div>
  );
}
