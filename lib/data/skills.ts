export interface SkillNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface SkillCluster {
  id: string;
  label: string;
  color: string;
  cx: number;
  cy: number;
  nodes: SkillNode[];
}

export const SKILL_CLUSTERS: SkillCluster[] = [
  {
    id: "ai",
    label: "AI & Machine Learning",
    color: "#3b82f6",
    cx: 0.25,
    cy: 0.35,
    nodes: [
      { id: "python", label: "Python", x: 0.15, y: 0.25 },
      { id: "ml", label: "Machine Learning", x: 0.28, y: 0.18 },
      { id: "nlp", label: "NLP", x: 0.35, y: 0.32 },
      { id: "ai-systems", label: "AI Systems", x: 0.22, y: 0.42 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    color: "#8b5cf6",
    cx: 0.72,
    cy: 0.28,
    nodes: [
      { id: "react", label: "React", x: 0.62, y: 0.2 },
      { id: "nextjs", label: "Next.js", x: 0.75, y: 0.15 },
      { id: "typescript", label: "TypeScript", x: 0.82, y: 0.28 },
      { id: "tailwind", label: "Tailwind", x: 0.68, y: 0.38 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#10b981",
    cx: 0.28,
    cy: 0.72,
    nodes: [
      { id: "nodejs", label: "Node.js", x: 0.18, y: 0.65 },
      { id: "express", label: "Express", x: 0.32, y: 0.62 },
      { id: "rest", label: "REST APIs", x: 0.25, y: 0.78 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    color: "#f59e0b",
    cx: 0.72,
    cy: 0.72,
    nodes: [
      { id: "mongodb", label: "MongoDB", x: 0.62, y: 0.65 },
      { id: "supabase", label: "Supabase", x: 0.78, y: 0.62 },
      { id: "appwrite", label: "Appwrite", x: 0.72, y: 0.78 },
      { id: "firebase", label: "Firebase", x: 0.85, y: 0.72 },
    ],
  },
];
