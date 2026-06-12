"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const CanvasLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border border-white/10 border-t-white/40 rounded-full animate-spin" />
  </div>
);

interface CanvasWrapperProps {
  children: React.ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov?: number };
  dpr?: [number, number];
}

const R3FCanvas = dynamic(
  () =>
    import("@react-three/fiber").then(({ Canvas }) => {
      return function WrappedCanvas({
        children,
        className,
        camera,
        dpr,
      }: CanvasWrapperProps) {
        return (
          <Canvas
            className={className}
            camera={camera ?? { position: [0, 0, 5], fov: 50 }}
            dpr={dpr ?? [1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            style={{ background: "transparent" }}
          >
            {children}
          </Canvas>
        );
      };
    }),
  { ssr: false, loading: () => <CanvasLoader /> }
);

export function CanvasWrapper(props: CanvasWrapperProps) {
  return (
    <Suspense fallback={<CanvasLoader />}>
      <R3FCanvas {...props} />
    </Suspense>
  );
}
