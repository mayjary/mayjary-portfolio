"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { OBSESSIONS } from "@/lib/data/obsessions";

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
      className="absolute w-48 md:w-56"
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
        className="glass rounded-2xl p-5 md:p-6 cursor-default group hover:border-border-hover transition-colors duration-500"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="font-mono text-[10px] uppercase tracking-widest text-accent/60 mb-2">
          Exploring
        </div>
        <h3 className="text-lg md:text-xl font-medium mb-2 group-hover:text-gradient-accent transition-all">
          {obsession.title}
        </h3>
        <p className="text-xs md:text-sm text-muted leading-relaxed">
          {obsession.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function ObsessionsSection() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeader
          label="Current Obsessions"
          title="What I'm exploring now"
          description="The frontier of intelligence — topics that occupy my mind and drive my next builds."
          align="center"
        />

        <div className="relative h-[500px] md:h-[600px] max-w-4xl mx-auto">
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
