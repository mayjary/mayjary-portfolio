export interface Obsession {
  id: string;
  title: string;
  description: string;
}

export const OBSESSIONS: Obsession[] = [
  {
    id: "agentic",
    title: "Agentic AI",
    description: "Autonomous systems that plan, act, and adapt.",
  },
  {
    id: "rag",
    title: "RAG Systems",
    description: "Retrieval-augmented intelligence for grounded reasoning.",
  },
  {
    id: "llm",
    title: "LLM Architecture",
    description: "Understanding how large models think and scale.",
  },
  {
    id: "fintech",
    title: "FinTech Intelligence",
    description: "AI-driven financial decision systems.",
  },
  {
    id: "psychology",
    title: "Human Psychology",
    description: "Designing interfaces that respect how people decide.",
  },
  {
    id: "generative",
    title: "Generative AI",
    description: "Creating intelligence that produces, not just predicts.",
  },
];
