"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { OBSESSIONS } from "@/lib/data/obsessions";

const ACCENT_COLORS = [
  "#5b9cf6",
  "#7c6df0",
  "#34d399",
  "#fbbf24",
  "#f472b6",
  "#5b9cf6",
];

function FloatingModule({
  obsession,
  index,
}: {
  obsession: (typeof OBSESSIONS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];

  const positions = [
    { top: "5%", left: "10%" },
    { top: "15%", right: "8%" },
    { top: "45%", left: "5%" },
    { top: "40%", right: "12%" },
    { bottom: "20%", left: "15%" },
    { bottom: "10%", right: "10%" },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.08);
    y.set((e.clientY - centerY) * 0.08);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="absolute w-44 lg:w-52"
      style={{
        ...positions[index],
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="glass rounded-2xl p-5 cursor-default group hover:border-border-hover transition-colors duration-500 card-shine"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          borderColor: `${color}20`,
        }}
      >
        <div
          className="font-mono text-[10px] uppercase tracking-widest mb-2"
          style={{ color: `${color}99` }}
        >
          Exploring
        </div>
        <h3 className="text-base lg:text-lg font-medium mb-2 group-hover:text-gradient-accent transition-all">
          {obsession.title}
        </h3>
        <p className="text-xs text-muted leading-relaxed">
          {obsession.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

function MobileObsessionCard({
  obsession,
  index,
}: {
  obsession: (typeof OBSESSIONS)[0];
  index: number;
}) {
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="glass rounded-xl p-4 card-shine"
      style={{ borderColor: `${color}18` }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
        />
        <div>
          <h3 className="text-sm font-medium mb-1">{obsession.title}</h3>
          <p className="text-xs text-muted leading-relaxed">
            {obsession.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ObsessionsSection() {
  return (
    <section className="relative py-24 md:py-48 overflow-hidden">
      <div
        className="section-glow w-[350px] h-[350px] bottom-0 left-1/4 absolute pointer-events-none"
        style={{ background: "rgba(124, 109, 240, 0.07)" }}
      />

      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeader
          label="Current Obsessions"
          title="What I'm exploring now"
          description="The frontier of intelligence — topics that occupy my mind and drive my next builds."
          align="center"
        />

        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
          {OBSESSIONS.map((obsession, index) => (
            <MobileObsessionCard
              key={obsession.id}
              obsession={obsession}
              index={index}
            />
          ))}
        </div>

        <div className="hidden md:block relative h-[520px] lg:h-[580px] max-w-4xl mx-auto">
          {OBSESSIONS.map((obsession, index) => (
            <FloatingModule
              key={obsession.id}
              obsession={obsession}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
