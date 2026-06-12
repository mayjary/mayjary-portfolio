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
    <section id="story" ref={containerRef} className="relative py-32 md:py-48">
      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeader
          label="The Journey"
          title="Not a resume. A trajectory."
          description="Every system I've built reflects an evolution — from learning fundamentals to engineering intelligence."
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-border">
            <motion.div
              className="w-full bg-accent origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {TIMELINE.map((milestone, index) => (
              <Reveal key={milestone.id} delay={index * 0.1}>
                <div className="relative pl-12 md:pl-16 group">
                  <div className="absolute left-0 top-1 w-10 h-10 md:w-12 md:h-12 rounded-full border border-border bg-background flex items-center justify-center group-hover:border-accent/50 transition-colors duration-500">
                    <span className="font-mono text-xs text-muted group-hover:text-accent transition-colors">
                      {milestone.phase}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-4 mb-3">
                    <h3 className="text-2xl md:text-4xl font-medium tracking-tight">
                      {milestone.title}
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {milestone.year}
                    </span>
                  </div>
                  <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl">
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
