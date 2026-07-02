"use client";

type ThemeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
};

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle Theme"
      data-cursor="hover"
      className="
        relative
        flex items-center
        border border-white/10
        overflow-hidden
        transition-colors duration-300
        hover:border-primary
        group
      "
    >
      {/* SLIDING INDICATOR */}
      <span
        className={`
          absolute top-0 bottom-0
          w-1/2
          transition-all duration-300 ease-out
          ${isDark ? "translate-x-full bg-neutral-900" : "translate-x-0 bg-primary"}
        `}
      />

      {/* SUN (LIGHT) */}
      <span
        className={`
          relative z-10
          flex items-center justify-center
          w-7 h-7
          transition-colors duration-300
        `}
      >
        <svg
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`
            transition-colors duration-300
            ${!isDark ? "stroke-black" : "stroke-neutral-700 group-hover:stroke-primary"}
          `}
        >
          <circle cx="12" cy="12" r="4.5" strokeWidth="1.8" />
          <g strokeWidth="1.8" strokeLinecap="round">
            <line x1="12" y1="1.5" x2="12" y2="3.5" />
            <line x1="12" y1="20.5" x2="12" y2="22.5" />
            <line x1="1.5" y1="12" x2="3.5" y2="12" />
            <line x1="20.5" y1="12" x2="22.5" y2="12" />
            <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
            <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
            <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" />
            <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
          </g>
        </svg>
      </span>

      {/* MOON (DARK) */}
      <span
        className={`
          relative z-10
          flex items-center justify-center
          w-7 h-7
          transition-colors duration-300
        `}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`
            transition-colors duration-300
            ${isDark ? "stroke-primary" : "stroke-neutral-700 group-hover:stroke-primary"}
          `}
        >
          <path
            d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
