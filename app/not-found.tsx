import FuzzyText from "@/components/ui/FuzzyText";
import LetterGlitch from "@/components/ui/LetterGlitch";

export default function NotFound() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <LetterGlitch
          glitchColors={["#263e60", "#1a3352", "#9dc7fe"]}
          glitchSpeed={40}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
          characters="01"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <FuzzyText
          className="mx-auto block"
          fontSize="clamp(5rem,20vw,14rem)"
          baseIntensity={0.15}
          hoverIntensity={0.45}
        >
          404
        </FuzzyText>

        <div className="mt-4 flex justify-center">
          <FuzzyText
            fontSize="clamp(1rem,2vw,1.5rem)"
            baseIntensity={0.1}
            hoverIntensity={0.25}
          >
            Page Not Found
          </FuzzyText>
        </div>
      </div>
    </div>
  );
}
