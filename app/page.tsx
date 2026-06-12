import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { BuildingIntelligenceSection } from "@/components/sections/BuildingIntelligenceSection";
import { ObsessionsSection } from "@/components/sections/ObsessionsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <BuildingIntelligenceSection />
      <ObsessionsSection />
      <ContactSection />
    </>
  );
}
