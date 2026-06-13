"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SKILL_CLUSTERS } from "@/lib/data/skills";

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setDimensions({
          width: w,
          height: mobile ? Math.max(480, w * 1.1) : Math.min(560, w * 0.72),
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getConnections = () => {
    const connections: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      cluster: string;
    }[] = [];
    SKILL_CLUSTERS.forEach((cluster) => {
      cluster.nodes.forEach((node, i) => {
        if (i < cluster.nodes.length - 1) {
          const next = cluster.nodes[i + 1];
          connections.push({
            x1: node.x * dimensions.width,
            y1: node.y * dimensions.height,
            x2: next.x * dimensions.width,
            y2: next.y * dimensions.height,
            cluster: cluster.id,
          });
        }
        connections.push({
          x1: cluster.cx * dimensions.width,
          y1: cluster.cy * dimensions.height,
          x2: node.x * dimensions.width,
          y2: node.y * dimensions.height,
          cluster: cluster.id,
        });
      });
    });
    return connections;
  };

  const connections = getConnections();
  const activeCluster = hoveredNode
    ? SKILL_CLUSTERS.find((c) => c.nodes.some((n) => n.id === hoveredNode))?.id
    : null;

  return (
    <section id="skills" className="relative py-24 md:py-48">
      <div
        className="section-glow w-[400px] h-[300px] top-20 right-0 absolute pointer-events-none hidden md:block"
        style={{ background: "rgba(91, 156, 246, 0.06)" }}
      />

      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeader
          label="Technology Ecosystem"
          title="Constellations of craft"
          description="Technologies don't exist in isolation. They form interconnected systems — just like the products I build."
          align="center"
        />

        <div
          ref={containerRef}
          className="relative w-full mx-auto rounded-2xl border border-border glass overflow-hidden card-shine"
          style={{ height: dimensions.height }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {connections.map((conn, i) => {
              const isActive = !activeCluster || conn.cluster === activeCluster;
              return (
                <motion.line
                  key={i}
                  x1={conn.x1}
                  y1={conn.y1}
                  x2={conn.x2}
                  y2={conn.y2}
                  stroke={
                    SKILL_CLUSTERS.find((c) => c.id === conn.cluster)?.color ??
                    "#5b9cf6"
                  }
                  strokeWidth={isActive ? 1.2 : 0.5}
                  strokeOpacity={isActive ? 0.4 : 0.1}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.02 }}
                />
              );
            })}
          </svg>

          {SKILL_CLUSTERS.map((cluster) => (
            <div key={cluster.id}>
              <motion.div
                className="absolute font-mono text-[9px] md:text-xs uppercase tracking-widest pointer-events-none z-10"
                style={{
                  left: `${cluster.cx * 100}%`,
                  top: `${cluster.cy * 100}%`,
                  transform: "translate(-50%, -200%)",
                  color: cluster.color,
                  opacity:
                    activeCluster === cluster.id || !activeCluster ? 1 : 0.35,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {isMobile ? cluster.label.split(" ")[0] : cluster.label}
              </motion.div>

              {cluster.nodes.map((node) => (
                <motion.button
                  key={node.id}
                  type="button"
                  className="absolute group z-10"
                  style={{
                    left: `${node.x * 100}%`,
                    top: `${node.y * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onTouchStart={() => setHoveredNode(node.id)}
                  onTouchEnd={() => setHoveredNode(null)}
                  whileHover={{ scale: 1.15 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: cluster.color,
                      boxShadow:
                        hoveredNode === node.id
                          ? `0 0 16px ${cluster.color}`
                          : `0 0 6px ${cluster.color}40`,
                      opacity:
                        !hoveredNode ||
                        hoveredNode === node.id ||
                        activeCluster === cluster.id
                          ? 1
                          : 0.35,
                    }}
                  />
                  <span
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap text-[10px] md:text-xs font-medium transition-opacity duration-300"
                    style={{
                      opacity:
                        hoveredNode === node.id || isMobile ? 0.85 : 0.55,
                      color:
                        hoveredNode === node.id ? cluster.color : undefined,
                    }}
                  >
                    {node.label}
                  </span>
                </motion.button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
