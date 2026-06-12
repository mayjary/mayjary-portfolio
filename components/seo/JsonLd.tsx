import { SITE } from "@/lib/constants";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: "AI Engineer & Full Stack Developer",
    url: SITE.url,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Navi Mumbai",
      addressCountry: "IN",
    },
    sameAs: [SITE.linkedin, SITE.github],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "FinTech",
      "Full Stack Development",
      "LLM Architecture",
      "Agentic AI",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
