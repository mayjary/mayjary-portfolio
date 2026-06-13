"use client";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      <div
        className="section-glow w-[600px] h-[600px] -top-[200px] -left-[100px]"
        style={{ background: "rgba(91, 156, 246, 0.12)" }}
      />
      <div
        className="section-glow w-[500px] h-[500px] top-[40%] -right-[150px]"
        style={{ background: "rgba(124, 109, 240, 0.1)" }}
      />
      <div
        className="section-glow w-[400px] h-[400px] bottom-[10%] left-[20%]"
        style={{ background: "rgba(52, 211, 153, 0.07)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
