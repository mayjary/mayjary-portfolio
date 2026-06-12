export interface TimelineMilestone {
  id: string;
  phase: string;
  title: string;
  description: string;
  year: string;
}

export const TIMELINE: TimelineMilestone[] = [
  {
    id: "student",
    phase: "01",
    title: "Student",
    description:
      "Started with curiosity about how software shapes human behavior. Studied fundamentals while exploring the intersection of code and cognition.",
    year: "2021",
  },
  {
    id: "developer",
    phase: "02",
    title: "Developer",
    description:
      "Built full-stack applications — from campus systems to booking platforms. Learned to ship products, not just write code.",
    year: "2022",
  },
  {
    id: "builder",
    phase: "03",
    title: "Builder",
    description:
      "Shifted from features to systems. Started building platforms with real users — finance trackers, manufacturing hubs, AI-powered tools.",
    year: "2023",
  },
  {
    id: "ai-engineer",
    phase: "04",
    title: "AI Engineer",
    description:
      "Now focused on intelligent systems — LLMs, agentic workflows, FinTech intelligence, and products where AI drives real decisions.",
    year: "2024 — Now",
  },
];
