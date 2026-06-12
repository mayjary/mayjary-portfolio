"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE } from "@/lib/constants";

interface TerminalLine {
  type: "input" | "output" | "success" | "error";
  text: string;
}

const COMMANDS: Record<
  string,
  { output: string; action?: () => void; type?: "success" }
> = {
  help: {
    output: `Available commands:
  contact   — Display contact information
  linkedin  — Open LinkedIn profile
  github    — Open GitHub profile
  email     — Display email address
  resume    — Download resume
  clear     — Clear terminal
  about     — About Mayank`,
  },
  contact: {
    output: `Name:     ${SITE.name}
Location: ${SITE.location}
Email:    ${SITE.email}
Status:   Open to opportunities`,
    type: "success",
  },
  linkedin: {
    output: "Opening LinkedIn profile...",
    action: () => window.open(SITE.linkedin, "_blank"),
    type: "success",
  },
  github: {
    output: "Opening GitHub profile...",
    action: () => window.open(SITE.github, "_blank"),
    type: "success",
  },
  email: {
    output: `Email: ${SITE.email}`,
    action: () => {
      window.location.href = `mailto:${SITE.email}`;
    },
    type: "success",
  },
  resume: {
    output: "Downloading resume...",
    action: () => {
      const a = document.createElement("a");
      a.href = SITE.resume;
      a.download = "Mayank_Poojary_Resume.pdf";
      a.click();
    },
    type: "success",
  },
  about: {
    output: `AI Engineer & Product Builder
Building intelligent systems where AI, finance,
and human decision making converge.

Roles: ${SITE.roles.join(", ")}`,
    type: "success",
  },
  clear: {
    output: "",
  },
};

const WELCOME = `Mayank OS v2.026 — Intelligence Terminal
Type 'help' to see available commands.`;

export function ContactSection() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", text: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", text: `$ ${trimmed}` },
    ];

    if (trimmed === "clear") {
      setLines([{ type: "output", text: WELCOME }]);
      return;
    }

    const command = COMMANDS[trimmed];
    if (command) {
      if (command.output) {
        newLines.push({
          type: command.type ?? "output",
          text: command.output,
        });
      }
      setLines(newLines);
      command.action?.();
    } else {
      newLines.push({
        type: "error",
        text: `Command not found: '${trimmed}'. Type 'help' for available commands.`,
      });
      setLines(newLines);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  const lineColors: Record<TerminalLine["type"], string> = {
    input: "text-emerald-400",
    output: "text-muted",
    success: "text-foreground/90",
    error: "text-red-400",
  };

  return (
    <section id="contact" className="relative py-32 md:py-48">
      <div className="section-padding max-w-7xl mx-auto">
        <SectionHeader
          label="Initialize Contact"
          title="Command center"
          description="An interface for the curious. Type a command to connect."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="rounded-2xl border border-border overflow-hidden bg-[#0a0a0a] shadow-2xl shadow-accent/5">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="ml-3 font-mono text-xs text-muted">
                mayank@intelligence ~ terminal
              </span>
            </div>

            <div
              ref={terminalRef}
              className="p-6 h-80 md:h-96 overflow-y-auto font-mono text-sm leading-relaxed"
              data-lenis-prevent
            >
              <AnimatePresence mode="popLayout">
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`mb-2 whitespace-pre-wrap ${lineColors[line.type]}`}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-emerald-400">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-foreground caret-emerald-400"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
                <span className="terminal-cursor text-emerald-400">▊</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["contact", "linkedin", "github", "email", "resume"].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => executeCommand(cmd)}
                className="px-4 py-2 text-xs font-mono rounded-lg border border-border text-muted hover:text-foreground hover:border-border-hover transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
