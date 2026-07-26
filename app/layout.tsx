import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/smooth-scroll";
import CustomCursor from "@/components/ui/custom-cursor";
import { PageTransition } from "@/components/page-transition";
import { GoogleAnalytics } from "@next/third-parties/google";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Jaid's Space",
  description: "Exploring the intersection of design, code, and creativity.",
  icons: {
    icon: "/logos.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark bg-background ${ibmPlexSans.variable} ${ibmPlexMono.variable} ${bebasNeue.variable}`}
    >
      <body className="antialiased overflow-x-hidden">
        <CustomCursor />
        <div className="noise-overlay" />

        {/* ❗ PageTransition TIDAK BOLEH render <body> */}
        <PageTransition>
          <SmoothScroll>{children}</SmoothScroll>
        </PageTransition>

        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
