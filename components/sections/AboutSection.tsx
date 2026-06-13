"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader, Reveal } from "@/components/ui/SectionHeader";
import { TIMELINE } from "@/lib/data/timeline";

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="story" ref={containerRef} className="relative py-24 md:py-48">
      <div className="glow-line w-full max-w-7xl mx-auto section-padding mb-16 md:mb-0 opacity-60" />

      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeader
          label="The Journey"
          title="Not a resume. A trajectory."
          description="Every system I've built reflects an evolution — from learning fundamentals to engineering intelligence."
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-border">
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background:
                  "linear-gradient(to bottom, #5b9cf6, #7c6df0, #34d399)",
              }}
            />
          </div>

          <div className="space-y-12 md:space-y-20">
            {TIMELINE.map((milestone, index) => (
              <Reveal key={milestone.id} delay={index * 0.1}>
                <div className="relative pl-12 md:pl-16 group">
                  <div className="absolute left-0 top-1 w-10 h-10 md:w-12 md:h-12 rounded-full border border-border bg-background-elevated flex items-center justify-center group-hover:border-accent/40 transition-colors duration-500 shadow-sm shadow-accent/5">
                    <span className="font-mono text-xs text-muted group-hover:text-accent transition-colors">
                      {milestone.phase}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2 md:mb-3">
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-medium tracking-tight">
                      {milestone.title}
                    </h3>
                    <span className="font-mono text-xs text-muted/80">
                      {milestone.year}
                    </span>
                  </div>
                  <p className="text-muted text-sm md:text-lg leading-relaxed max-w-xl">
                    {milestone.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
