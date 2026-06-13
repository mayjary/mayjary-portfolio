"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 md:py-48">
      <div className="glow-line w-full max-w-7xl mx-auto section-padding mb-12 md:mb-0 opacity-50" />

      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeader
          label="Product Showcase"
          title="Systems I've shipped"
          description="Each project is a case study in product thinking — solving real problems with intelligent engineering."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
