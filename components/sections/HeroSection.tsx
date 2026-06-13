"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/lib/constants";

const NeuralNetworkHero = dynamic(
  () =>
    import("@/components/three/NeuralNetworkHero").then(
      (mod) => mod.NeuralNetworkHeroCanvas
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-b from-accent/8 via-violet/5 to-transparent" />
    ),
  }
);

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      <NeuralNetworkHero />

      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background pointer-events-none z-[1]" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[min(90vw,600px)] h-[300px] pointer-events-none z-[1] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse, rgba(91,156,246,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 section-padding w-full max-w-7xl mx-auto pt-24 md:pt-28 pb-6 md:pb-10">
        <div className="flex-1 flex items-center justify-center py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="label-pill mb-6 md:mb-8"
            >
              {SITE.location}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] md:tracking-[0.35em] text-muted mb-6 md:mb-8 max-w-[90vw] leading-relaxed"
            >
              {SITE.roles.join(" · ")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="text-[clamp(2rem,7.5vw,6rem)] font-medium leading-[1] md:leading-[0.95] tracking-tight max-w-5xl px-2"
            >
              <span className="text-gradient">Building intelligent systems</span>
              <br />
              <span className="text-foreground/50">
                where AI, finance, and human
              </span>
              <br />
              <span className="text-gradient-accent">
                decision making converge.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-8 md:mt-10 text-base md:text-xl text-muted max-w-xl leading-relaxed px-4"
            >
              {SITE.name} — crafting products at the intersection of artificial
              intelligence, financial systems, and human psychology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0"
            >
              <MagneticButton
                as="a"
                href="#projects"
                className="w-full sm:w-auto px-8 py-3.5 md:py-4 text-sm font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-accent/10"
              >
                View Products
              </MagneticButton>
              <MagneticButton
                as="a"
                href="#contact"
                className="w-full sm:w-auto px-8 py-3.5 md:py-4 text-sm font-medium rounded-full glass hover:border-border-hover"
              >
                Initialize Contact
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center gap-2 shrink-0 scroll-indicator"
        >
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted/80">
            Scroll to explore
          </span>
          <div className="w-px h-8 md:h-10 bg-gradient-to-b from-accent/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
