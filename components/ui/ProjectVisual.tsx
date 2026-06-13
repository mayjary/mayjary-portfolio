"use client";

function OutfitVisual() {
  return (
    <div className="relative w-full h-full p-6 md:p-10 flex items-center justify-center min-h-[280px]">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-violet-500/5 to-transparent" />
      <div className="relative flex gap-3 md:gap-5 items-center">
        <div className="w-16 md:w-20 h-20 md:h-24 rounded-xl bg-white/[0.05] border border-pink-500/20 flex items-center justify-center">
          <div className="w-10 md:w-12 h-12 md:h-14 rounded-lg bg-pink-500/20" />
        </div>
        <div className="text-xl md:text-2xl text-pink-400/40">+</div>
        <div className="w-16 md:w-20 h-20 md:h-24 rounded-xl bg-white/[0.05] border border-pink-500/20 flex items-center justify-center">
          <div className="w-10 md:w-12 h-8 md:h-10 rounded-lg bg-pink-500/20" />
        </div>
        <div className="text-xl md:text-2xl text-pink-400/40">→</div>
        <div className="w-20 md:w-24 h-28 md:h-32 rounded-xl bg-gradient-to-b from-pink-500/20 to-pink-500/5 border border-pink-500/30 flex items-center justify-center">
          <div className="w-7 md:w-8 h-16 md:h-20 rounded-full bg-pink-500/15" />
        </div>
      </div>
    </div>
  );
}

export function ProjectVisual({ projectId }: { projectId: string }) {
  if (projectId !== "outfit") return null;

  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0a0a0c]">
      <OutfitVisual />
    </div>
  );
}
