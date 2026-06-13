"use client";

import { useLenis } from "@/lib/hooks/useLenis";
import { useMousePosition } from "@/lib/hooks/useMousePosition";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  useLenis();
  const { x, y } = useMousePosition();

  return (
    <>
      <AmbientBackground />
      <div
        className="cursor-glow hidden md:block"
        style={{ left: x, top: y }}
        aria-hidden
      />
      <div className="noise-overlay" aria-hidden />
      {children}
    </>
  );
}
