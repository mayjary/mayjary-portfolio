export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tags: string[];
  accent: string;
  gradient: string;
  flagship?: boolean;
  media?: {
    type: "video" | "visual";
    src?: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: "finora",
    title: "FINORA",
    subtitle: "AI-Powered Personal Finance Platform",
    description:
      "Flagship FinTech product combining conversational AI, transaction intelligence, and predictive financial analytics into a unified decision engine.",
    features: [
      "AI chatbot for financial guidance",
      "Transaction tracking & categorization",
      "Budgeting & savings goals",
      "Financial analytics dashboard",
      "Personalized AI insights",
    ],
    tags: ["FinTech", "AI", "Python", "React", "NLP"],
    accent: "#5b9cf6",
    gradient: "from-blue-500/20 via-blue-900/10 to-transparent",
    flagship: true,
    media: { type: "video", src: "/Finora.mp4" },
  },
  {
    id: "outfit",
    title: "AI Outfit Try-On",
    subtitle: "Generative Fashion Intelligence",
    description:
      "Virtual try-on system using Google AI APIs to visualize outfit combinations on models before purchase — reducing uncertainty in online fashion.",
    features: [
      "Google AI image generation",
      "Virtual try-on experience",
      "Supabase cloud storage",
      "Wardrobe management",
    ],
    tags: ["Generative AI", "Supabase", "Next.js", "Vision"],
    accent: "#ec4899",
    gradient: "from-pink-500/20 via-pink-900/10 to-transparent",
    media: { type: "visual" },
  },
  {
    id: "sentiment",
    title: "Stock Market Sentiment",
    subtitle: "Predictive Market Intelligence",
    description:
      "NLP pipeline that processes financial news at scale, classifying sentiment to surface market signals before they become obvious.",
    features: [
      "Financial news processing",
      "Sentiment classification",
      "NLP pipeline",
      "Market trend visualization",
    ],
    tags: ["NLP", "Python", "ML", "FinTech"],
    accent: "#fbbf24",
    gradient: "from-amber-500/20 via-amber-900/10 to-transparent",
    media: { type: "video", src: "/stock_predictor.mov" },
  },
  {
    id: "manufacturehub",
    title: "ManufactureHub",
    subtitle: "Multi-Portal Workflow Platform",
    description:
      "Centralized manufacturing platform connecting clients, workers, and admins through role-based portals with real-time production tracking.",
    features: [
      "Client, worker & admin portals",
      "Project tracking",
      "Production analytics",
      "Role-based access control",
    ],
    tags: ["Full Stack", "RBAC", "Manufacturing", "Real-time"],
    accent: "#7c6df0",
    gradient: "from-indigo-500/20 via-indigo-900/10 to-transparent",
    media: { type: "video", src: "/ManuHub_video.mp4" },
  },
  {
    id: "hotel",
    title: "Luxury Restaurant Website",
    subtitle: "Hospitality & Food Service Digital Experiences",
    description:
      "Premium websites for Hotel The Greetings, SIAMO Bistro, and PICO Café — modern branding, responsive design, and customer engagement.",
    features: [
      "Booking system",
      "Email automation",
      "Customer management",
      "Reservation tracking",
    ],
    tags: ["Next.js", "Email", "Booking", "Full Stack"],
    accent: "#34d399",
    gradient: "from-teal-500/20 via-teal-900/10 to-transparent",
    media: { type: "video", src: "/hotel.mp4" },
  },
];
