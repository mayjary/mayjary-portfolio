"use client";

function FinoraVisual() {
  return (
    <div className="relative w-full h-full p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl" />
      <div className="relative grid grid-cols-3 gap-3 h-full">
        <div className="col-span-2 space-y-3">
          <div className="h-8 w-32 rounded-lg bg-blue-500/20 border border-blue-500/20" />
          <div className="h-24 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
            <div className="flex items-end gap-1 h-full">
              {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-blue-500/30"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
              <div className="text-[10px] text-blue-400/60 font-mono">Balance</div>
              <div className="text-lg font-medium mt-1">₹2,48,500</div>
            </div>
            <div className="h-16 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
              <div className="text-[10px] text-emerald-400/60 font-mono">Savings</div>
              <div className="text-lg font-medium mt-1 text-emerald-400">+12.4%</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 flex flex-col">
          <div className="text-[10px] text-blue-400/60 font-mono mb-2">AI Assistant</div>
          <div className="space-y-2 flex-1">
            <div className="text-[11px] text-muted bg-blue-500/10 rounded-lg p-2">
              Analyze my spending patterns
            </div>
            <div className="text-[11px] bg-white/[0.05] rounded-lg p-2">
              Your dining expenses increased 23% this month...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuraVisual() {
  return (
    <div className="relative w-full h-full p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl" />
      <div className="relative space-y-3">
        <div className="flex gap-3">
          {["Production", "Inventory", "Quality", "Shipping"].map((label, i) => (
            <div
              key={label}
              className="flex-1 h-20 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3"
            >
              <div className="text-[10px] text-emerald-400/60 font-mono">{label}</div>
              <div className="mt-2 h-1.5 rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-emerald-500/50"
                  style={{ width: `${60 + i * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="h-32 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
            <path
              d="M0,80 Q50,60 100,70 T200,40 T300,20"
              fill="none"
              stroke="rgba(16,185,129,0.4)"
              strokeWidth="2"
            />
            <path
              d="M0,80 Q50,60 100,70 T200,40 T300,20 V100 H0 Z"
              fill="url(#auraGrad)"
              opacity="0.2"
            />
            <defs>
              <linearGradient id="auraGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function OutfitVisual() {
  return (
    <div className="relative w-full h-full p-6 md:p-8 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent rounded-2xl" />
      <div className="relative flex gap-4 items-center">
        <div className="w-20 h-24 rounded-xl bg-white/[0.05] border border-pink-500/20 flex items-center justify-center">
          <div className="w-12 h-14 rounded-lg bg-pink-500/20" />
        </div>
        <div className="text-2xl text-pink-400/40">+</div>
        <div className="w-20 h-24 rounded-xl bg-white/[0.05] border border-pink-500/20 flex items-center justify-center">
          <div className="w-12 h-10 rounded-lg bg-pink-500/20" />
        </div>
        <div className="text-2xl text-pink-400/40">→</div>
        <div className="w-24 h-32 rounded-xl bg-gradient-to-b from-pink-500/20 to-pink-500/5 border border-pink-500/30 flex items-center justify-center">
          <div className="w-8 h-20 rounded-full bg-pink-500/15" />
        </div>
      </div>
    </div>
  );
}

function SentimentVisual() {
  return (
    <div className="relative w-full h-full p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl" />
      <div className="relative space-y-3">
        <div className="flex gap-2">
          {["Bullish", "Neutral", "Bearish"].map((s, i) => (
            <div
              key={s}
              className="flex-1 text-center py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="text-[10px] font-mono text-muted">{s}</div>
              <div
                className="text-lg font-medium mt-1"
                style={{ color: i === 0 ? "#10b981" : i === 2 ? "#ef4444" : "#f59e0b" }}
              >
                {i === 0 ? "62%" : i === 2 ? "18%" : "20%"}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[
            "RBI maintains repo rate amid inflation concerns",
            "Tech sector shows strong Q3 earnings growth",
            "Global markets react to geopolitical tensions",
          ].map((headline, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]"
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor: i === 0 ? "#f59e0b" : i === 1 ? "#10b981" : "#ef4444",
                }}
              />
              <span className="text-[11px] text-muted truncate">{headline}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManufactureHubVisual() {
  return (
    <div className="relative w-full h-full p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-2xl" />
      <div className="relative grid grid-cols-3 gap-3 h-full">
        {[
          { role: "Client", color: "#6366f1", items: 3 },
          { role: "Worker", color: "#8b5cf6", items: 4 },
          { role: "Admin", color: "#a78bfa", items: 2 },
        ].map((portal) => (
          <div
            key={portal.role}
            className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 flex flex-col"
          >
            <div
              className="text-[10px] font-mono mb-3"
              style={{ color: portal.color }}
            >
              {portal.role}
            </div>
            <div className="space-y-2 flex-1">
              {Array.from({ length: portal.items }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 rounded bg-white/[0.04] border border-white/[0.04]"
                  style={{ opacity: 1 - i * 0.2 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8">
        <div className="w-16 h-px bg-indigo-500/30" />
        <div className="w-16 h-px bg-indigo-500/30" />
      </div>
    </div>
  );
}

function HotelVisual() {
  return (
    <div className="relative w-full h-full p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent rounded-2xl" />
      <div className="relative max-w-sm mx-auto space-y-4">
        <div className="text-center">
          <div className="text-[10px] font-mono text-teal-400/60">Reservations</div>
          <div className="text-2xl font-light mt-1 tracking-wide">Grand Vista</div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-md text-[8px] flex items-center justify-center"
              style={{
                backgroundColor:
                  [5, 6, 12, 13, 19, 20].includes(i)
                    ? "rgba(20,184,166,0.2)"
                    : "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted font-mono">
          <span>3 confirmed</span>
          <span>Email sent ✓</span>
        </div>
      </div>
    </div>
  );
}

const VISUALS: Record<string, React.ComponentType> = {
  finora: FinoraVisual,
  aura: AuraVisual,
  outfit: OutfitVisual,
  sentiment: SentimentVisual,
  manufacturehub: ManufactureHubVisual,
  hotel: HotelVisual,
};

export function ProjectVisual({ projectId }: { projectId: string }) {
  const Visual = VISUALS[projectId];
  if (!Visual) return null;
  return (
    <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-surface">
      <Visual />
    </div>
  );
}
