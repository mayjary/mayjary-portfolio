"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SKILL_CLUSTERS } from "@/lib/data/skills";

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: Math.min(600, containerRef.current.offsetWidth * 0.75),
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getConnections = () => {
    const connections: { x1: number; y1: number; x2: number; y2: number; cluster: string }[] = [];
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
    <section id="skills" className="relative py-32 md:py-48">
      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeader
          label="Technology Ecosystem"
          title="Constellations of craft"
          description="Technologies don't exist in isolation. They form interconnected systems — just like the products I build."
          align="center"
        />

        <div
          ref={containerRef}
          className="relative w-full mx-auto rounded-2xl border border-border bg-surface/50 overflow-hidden"
          style={{ height: dimensions.height }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {connections.map((conn, i) => {
              const isActive =
                !activeCluster || conn.cluster === activeCluster;
              return (
                <motion.line
                  key={i}
                  x1={conn.x1}
                  y1={conn.y1}
                  x2={conn.x2}
                  y2={conn.y2}
                  stroke={
                    SKILL_CLUSTERS.find((c) => c.id === conn.cluster)?.color ??
                    "#3b82f6"
                  }
                  strokeWidth={isActive ? 1 : 0.5}
                  strokeOpacity={isActive ? 0.3 : 0.08}
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
                className="absolute font-mono text-[10px] md:text-xs uppercase tracking-widest pointer-events-none"
                style={{
                  left: `${cluster.cx * 100}%`,
                  top: `${cluster.cy * 100}%`,
                  transform: "translate(-50%, -180%)",
                  color: cluster.color,
                  opacity: activeCluster === cluster.id || !activeCluster ? 1 : 0.3,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {cluster.label}
              </motion.div>

              {cluster.nodes.map((node) => (
                <motion.button
                  key={node.id}
                  type="button"
                  className="absolute group"
                  style={{
                    left: `${node.x * 100}%`,
                    top: `${node.y * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  whileHover={{ scale: 1.15 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: cluster.color,
                      boxShadow:
                        hoveredNode === node.id
                          ? `0 0 20px ${cluster.color}`
                          : "none",
                      opacity:
                        !hoveredNode ||
                        hoveredNode === node.id ||
                        activeCluster === cluster.id
                          ? 1
                          : 0.3,
                    }}
                  />
                  <span
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap text-xs md:text-sm font-medium transition-opacity duration-300"
                    style={{
                      opacity: hoveredNode === node.id ? 1 : 0.6,
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
