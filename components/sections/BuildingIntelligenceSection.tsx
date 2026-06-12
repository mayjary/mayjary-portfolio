"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CanvasWrapper } from "@/components/three/CanvasWrapper";

const IntelligencePipelineScene = dynamic(
  () =>
    import("@/components/three/IntelligencePipeline").then(
      (mod) => mod.IntelligencePipelineScene
    ),
  { ssr: false }
);

const STAGES = [
  { label: "Data", description: "Raw signals from the world" },
  { label: "Learning", description: "Patterns extracted from chaos" },
  { label: "Reasoning", description: "Context applied to knowledge" },
  { label: "Decision", description: "Intelligence becomes action" },
  { label: "Impact", description: "Systems that change outcomes" },
];

export function BuildingIntelligenceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setProgress(Math.max(0, Math.min(1, (v - 0.1) / 0.7)));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const activeStage = Math.min(
    STAGES.length - 1,
    Math.floor(progress * STAGES.length)
  );

  return (
    <section
      id="intelligence"
      ref={containerRef}
      className="relative py-32 md:py-48 min-h-screen"
    >
      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeader
          label="Building Intelligence"
          title="From data to impact"
          description="The pipeline of intelligence — how raw information transforms into decisions that matter."
          align="center"
        />

        <motion.div style={{ opacity }} className="relative">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl border border-border overflow-hidden bg-surface/30">
            <CanvasWrapper
              className="w-full h-full"
              camera={{ position: [0, 0, 8], fov: 50 }}
              dpr={[1, 1.5]}
            >
              <IntelligencePipelineScene progress={progress} />
            </CanvasWrapper>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />
          </div>

          <div className="grid grid-cols-5 gap-2 md:gap-4 mt-8">
            {STAGES.map((stage, index) => (
              <motion.div
                key={stage.label}
                className={`text-center p-3 md:p-4 rounded-xl border transition-all duration-500 ${
                  index <= activeStage
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-border bg-transparent opacity-40"
                }`}
                animate={{
                  scale: index === activeStage ? 1.02 : 1,
                }}
              >
                <div className="font-mono text-[10px] md:text-xs text-emerald-400/60 mb-1">
                  0{index + 1}
                </div>
                <div className="text-sm md:text-base font-medium">
                  {stage.label}
                </div>
                <div className="text-[10px] md:text-xs text-muted mt-1 hidden md:block">
                  {stage.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
