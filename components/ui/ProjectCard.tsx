"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data/projects";
import { ProjectVideo } from "@/components/ui/ProjectVideo";
import { ProjectVisual } from "@/components/ui/ProjectVisual";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isFlagship = project.flagship;

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={`group relative flex flex-col rounded-[1.75rem] md:rounded-[2rem] overflow-hidden border border-border bg-background-elevated/80 backdrop-blur-sm transition-colors duration-500 hover:border-border-hover ${
        isFlagship ? "lg:col-span-2" : ""
      }`}
      style={{
        boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 48px -12px ${project.accent}12`,
      }}
    >
      {/* Top — name & badge */}
      <div className="relative z-10 px-6 md:px-8 pt-6 md:pt-8 pb-4 md:pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            {isFlagship && (
              <span
                className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] mb-2 px-2.5 py-1 rounded-full"
                style={{
                  color: project.accent,
                  backgroundColor: `${project.accent}12`,
                  border: `1px solid ${project.accent}30`,
                }}
              >
                Flagship
              </span>
            )}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gradient">
              {project.title}
            </h3>
            <p
              className="mt-1 text-sm md:text-base font-medium"
              style={{ color: project.accent }}
            >
              {project.subtitle}
            </p>
          </div>
          <div
            className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
            style={{
              background: `${project.accent}10`,
              border: `1px solid ${project.accent}25`,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 7h12M7 1l6 6-6 6"
                stroke={project.accent}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="relative mx-3 md:mx-5 rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/40">
        {project.media?.type === "video" && project.media.src ? (
          <ProjectVideo
            src={project.media.src}
            accent={project.accent}
            title={project.title}
          />
        ) : (
          <ProjectVisual projectId={project.id} />
        )}
      </div>

      {/* Bottom — details */}
      <div className="relative z-10 px-6 md:px-8 pt-5 md:pt-6 pb-6 md:pb-8 mt-auto">
        <p className="text-sm md:text-base text-muted leading-relaxed mb-5 max-w-2xl">
          {project.description}
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-5">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/75"
            >
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: project.accent }}
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/80">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] md:text-xs font-mono rounded-full glass text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[inherit]"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${project.accent}08, transparent 60%)`,
        }}
      />
    </motion.article>
  );
}
