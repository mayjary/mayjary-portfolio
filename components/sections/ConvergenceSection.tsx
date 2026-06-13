"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const DOMAINS = [
  {
    id: "ai",
    label: "Artificial Intelligence",
    short: "AI & ML",
    description: "Models, agents, and systems that learn and reason.",
    color: "#5b9cf6",
    position: { top: "8%", left: "50%", transform: "translateX(-50%)" },
    mobileOrder: 0,
  },
  {
    id: "fintech",
    label: "FinTech Systems",
    short: "FinTech",
    description: "Financial intelligence, analytics, and decision engines.",
    color: "#34d399",
    position: { bottom: "12%", left: "6%" },
    mobileOrder: 2,
  },
  {
    id: "psychology",
    label: "Human Psychology",
    short: "Psychology",
    description: "How people decide, behave, and interact with software.",
    color: "#7c6df0",
    position: { bottom: "12%", right: "6%" },
    mobileOrder: 3,
  },
  {
    id: "product",
    label: "Product Engineering",
    short: "Product",
    description: "Turning ideas into polished, scalable experiences.",
    color: "#fbbf24",
    position: { top: "42%", left: "4%" },
    mobileOrder: 1,
  },
];

export function ConvergenceSection() {
  const [active, setActive] = useState<string | null>(null);

  const activeDomain = DOMAINS.find((d) => d.id === active);

  return (
    <section id="convergence" className="relative py-24 md:py-48 overflow-hidden">
      <div
        className="section-glow w-[500px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pointer-events-none"
        style={{ background: "rgba(124, 109, 240, 0.08)" }}
      />

      <div className="section-padding max-w-7xl mx-auto relative">
        <SectionHeader
          label="The Intersection"
          title="Where I build"
          description="The best products emerge where disciplines overlap — not in silos, but at the convergence of intelligence, finance, psychology, and engineering."
          align="center"
        />

        {/* Desktop: orbital layout */}
        <div className="hidden md:block relative h-[520px] max-w-4xl mx-auto">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 520"
            preserveAspectRatio="xMidYMid meet"
          >
            {DOMAINS.map((domain) => {
              const cx = 400;
              const cy = 260;
              const positions: Record<string, [number, number]> = {
                ai: [400, 60],
                fintech: [100, 420],
                psychology: [700, 420],
                product: [80, 240],
              };
              const [x2, y2] = positions[domain.id];
              const isActive = !active || active === domain.id;
              return (
                <motion.line
                  key={domain.id}
                  x1={cx}
                  y1={cy}
                  x2={x2}
                  y2={y2}
                  stroke={domain.color}
                  strokeWidth={isActive ? 1.5 : 0.5}
                  strokeOpacity={isActive ? 0.35 : 0.1}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                />
              );
            })}
          </svg>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-accent rounded-2xl px-8 py-6 text-center card-shine">
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent/70 mb-2">
                Core Focus
              </div>
              <div className="text-xl font-medium text-gradient">
                Intelligent Products
              </div>
              <p className="text-xs text-muted mt-2 max-w-[180px]">
                Systems that think, decide, and deliver impact
              </p>
            </div>
          </motion.div>

          {DOMAINS.map((domain, i) => (
            <motion.button
              key={domain.id}
              type="button"
              className="absolute z-20 text-left max-w-[200px] group"
              style={domain.position as React.CSSProperties}
              onMouseEnter={() => setActive(domain.id)}
              onMouseLeave={() => setActive(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.04 }}
            >
              <div
                className="glass rounded-xl p-4 transition-all duration-300 card-shine"
                style={{
                  borderColor:
                    active === domain.id
                      ? `${domain.color}40`
                      : undefined,
                  boxShadow:
                    active === domain.id
                      ? `0 0 30px ${domain.color}20`
                      : undefined,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{
                    backgroundColor: domain.color,
                    boxShadow: `0 0 10px ${domain.color}60`,
                  }}
                />
                <div className="text-sm font-medium mb-1">{domain.label}</div>
                <p className="text-[11px] text-muted leading-relaxed">
                  {domain.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-3">
          <motion.div
            className="glass-accent rounded-2xl p-5 text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-accent/70 mb-1">
              Core Focus
            </div>
            <div className="text-lg font-medium text-gradient">
              Intelligent Products
            </div>
          </motion.div>

          {[...DOMAINS]
            .sort((a, b) => a.mobileOrder - b.mobileOrder)
            .map((domain, i) => (
              <motion.button
                key={domain.id}
                type="button"
                className="w-full text-left"
                onClick={() =>
                  setActive(active === domain.id ? null : domain.id)
                }
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div
                  className="glass rounded-xl p-4 flex items-start gap-4 transition-all duration-300"
                  style={{
                    borderColor:
                      active === domain.id ? `${domain.color}40` : undefined,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: domain.color }}
                  />
                  <div>
                    <div className="text-sm font-medium">{domain.label}</div>
                    <p
                      className={`text-xs text-muted mt-1 leading-relaxed transition-all ${
                        active === domain.id ? "block" : "line-clamp-2"
                      }`}
                    >
                      {domain.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
        </div>

        {activeDomain && (
          <motion.p
            key={activeDomain.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden md:block text-center text-sm text-muted mt-10 max-w-md mx-auto"
          >
            Exploring the overlap between{" "}
            <span style={{ color: activeDomain.color }}>
              {activeDomain.label.toLowerCase()}
            </span>{" "}
            and intelligent product design.
          </motion.p>
        )}
      </div>
    </section>
  );
}
