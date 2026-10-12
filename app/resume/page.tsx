import { BitmapChevron } from "@/components/bitmap-chevron";
import { ScrambleTextOnHover } from "@/components/scramble-text";
import TransitionLink from "@/components/transition-link";

export default function ResumePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="max-w-xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-neutral-500">
          Jaid's Portfolio
        </p>

        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          Under{" "}
          <span className="underline underline-offset-8 underline-primary decoration-2 decoration-primary">
            Maintenance.
          </span>
        </h1>

        <p className="mt-5 text-sm leading-relaxed text-neutral-400 md:text-base mb-8">
          This page is currently being updated. Please check back soon.
        </p>

        <TransitionLink
          href="/#work"
          className="
    group
    inline-flex w-full items-center justify-center gap-3

    border border-foreground/20
    px-5 py-3

    font-mono
    text-[10px] uppercase tracking-[0.25em]
    text-foreground

    transition-all duration-200
    hover:border-accent hover:text-accent

    sm:w-auto
    sm:px-6
    sm:text-xs
  "
          data-cursor="hover"
        >
          <ScrambleTextOnHover
            text="View Projects"
            as="span"
            data-cursor="hover"
            duration={0.6}
          />

          <BitmapChevron className="transition-transform duration-500 ease-in-out group-hover:rotate-45" />
        </TransitionLink>
      </div>
    </main>
  );
}
