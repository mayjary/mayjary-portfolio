"use client";

import { useRef, useEffect } from "react";

interface ProjectVideoProps {
  src: string;
  accent: string;
  title: string;
}

export function ProjectVideo({ src, accent, title }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ensurePlaying = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener("loadeddata", ensurePlaying);
    video.addEventListener("canplay", ensurePlaying);
    video.addEventListener("canplaythrough", ensurePlaying);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ensurePlaying();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(video);

    ensurePlaying();

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", ensurePlaying);
      video.removeEventListener("canplay", ensurePlaying);
      video.removeEventListener("canplaythrough", ensurePlaying);
    };
  }, [src]);

  return (
    <div className="relative w-full aspect-[16/10] bg-[#0a0a0c] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${accent}18, transparent 70%)`,
        }}
      />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a0a0c] to-transparent z-[2] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0c]/80 to-transparent z-[2] pointer-events-none" />
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        aria-label={`${title} demo`}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
    </div>
  );
}
