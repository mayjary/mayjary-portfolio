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
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
    ),
  }
);

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NeuralNetworkHero />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none z-[1]" />

      <div className="relative z-10 section-padding w-full max-w-7xl mx-auto pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-mono text-xs md:text-sm uppercase tracking-[0.35em] text-muted mb-8"
          >
            {SITE.roles.join(" · ")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-[clamp(2.5rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-tight max-w-5xl"
          >
            <span className="text-gradient">Building intelligent systems</span>
            <br />
            <span className="text-foreground/40">
              where AI, finance, and human
            </span>
            <br />
            <span className="text-gradient-accent">decision making converge.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 text-lg md:text-xl text-muted max-w-2xl leading-relaxed"
          >
            {SITE.name} — crafting products at the intersection of artificial
            intelligence, financial systems, and human psychology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton
              as="a"
              href="#projects"
              className="px-8 py-4 text-sm font-medium rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              View Products
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="px-8 py-4 text-sm font-medium rounded-full border border-border hover:border-border-hover hover:bg-surface"
            >
              Initialize Contact
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 scroll-indicator"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            Scroll to explore
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-muted to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
