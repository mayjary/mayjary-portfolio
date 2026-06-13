"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 md:mb-20 ${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-4xl"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className={`${align === "center" ? "flex justify-center" : ""} mb-4 md:mb-5`}
      >
        <span className="label-pill">{label}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-gradient leading-[1.08] md:leading-[1.05]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-4 md:mt-6 text-base md:text-xl text-muted leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } max-w-2xl px-1`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
