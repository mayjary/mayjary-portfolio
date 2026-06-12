"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader, Reveal } from "@/components/ui/SectionHeader";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { PROJECTS } from "@/lib/data/projects";

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = PROJECTS[activeIndex];

  return (
    <section id="projects" className="relative py-32 md:py-48">
      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeader
          label="Product Showcase"
          title="Systems I've shipped"
          description="Each project is a case study in product thinking — solving real problems with intelligent engineering."
        />

        <div className="flex flex-wrap gap-2 mb-12">
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
                index === activeIndex
                  ? "bg-foreground text-background"
                  : "border border-border text-muted hover:text-foreground hover:border-border-hover"
              }`}
            >
              {project.title}
              {project.flagship && (
                <span className="ml-2 text-[10px] opacity-60">★</span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                {active.flagship && (
                  <span
                    className="inline-block font-mono text-xs uppercase tracking-widest mb-4 px-3 py-1 rounded-full border"
                    style={{
                      borderColor: `${active.accent}40`,
                      color: active.accent,
                    }}
                  >
                    Flagship Product
                  </span>
                )}
                <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-2">
                  {active.title}
                </h3>
                <p
                  className="text-lg md:text-xl mb-6"
                  style={{ color: active.accent }}
                >
                  {active.subtitle}
                </p>
                <p className="text-muted text-base md:text-lg leading-relaxed mb-8">
                  {active.description}
                </p>

                <div className="space-y-3 mb-8">
                  {active.features.map((feature, i) => (
                    <Reveal key={feature} delay={i * 0.05}>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ backgroundColor: active.accent }}
                        />
                        <span className="text-sm md:text-base text-foreground/80">
                          {feature}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono rounded-full border border-border text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ProjectVisual projectId={active.id} />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-16">
          {PROJECTS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-foreground"
                  : "w-4 bg-border hover:bg-muted"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
