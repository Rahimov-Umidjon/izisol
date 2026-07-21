"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { usePathname } from "next/navigation";

interface ModelProps {
  scrollProgress: number;
}

function Model({ scrollProgress }: ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/robot.glb");

  useFrame(() => {
    if (modelRef.current) {
      const targetRotationY = scrollProgress * Math.PI * 2; // 360 gradus
      const targetRotationX = scrollProgress * Math.PI * 0.5; // 90 gradus

      modelRef.current.rotation.y +=
        (targetRotationY - modelRef.current.rotation.y) * 0.08;
      modelRef.current.rotation.x +=
        (targetRotationX - modelRef.current.rotation.x) * 0.08;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.5} />;
}

interface HeroModelProps {
  /**
   * Scroll qilish uchun ajratilgan "vaqt oralig'i" balandligi (viewport
   * balandliklarida). Qancha katta bo'lsa, model shuncha uzoq
   * "yopishib" turadi va sekinroq aylanadi.
   */
  scrollLengthVh?: number;
  /**
   * Sahifa tepasidagi fixed/sticky navbar balandligi (piksellarda).
   * Shu qadar joy sticky blokning tepasida bo'sh qoladi, shunda model
   * navbar ostiga kirib, qisman yopilib qolmaydi.
   */
  topOffsetPx?: number;
}

export default function HeroModel({
  scrollLengthVh = 300,
  topOffsetPx = 80,
}: HeroModelProps) {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  // Tashqi (baland) konteyner — scroll shu ichida "sarflanadi"
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const stickyHeight = window.innerHeight - topOffsetPx;
      const scrollableDistance = rect.height - stickyHeight;

      if (scrollableDistance <= 0) {
        setScrollProgress(0);
        return;
      }

      // Sticky blok rect.top === topOffsetPx bo'lganda "yopishishni" boshlaydi
      // va rect.top === topOffsetPx - scrollableDistance bo'lganda tugaydi.
      let progress = (topOffsetPx - rect.top) / scrollableDistance;
      progress = Math.min(Math.max(progress, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [topOffsetPx , pathname]);

  return (
    // 1) Baland "scroll maydoni" — masalan 300vh
    <div ref={wrapperRef} style={{ height: `${scrollLengthVh}vh`, width: "100%" }}>
      {/* 2) Sticky blok — navbar balandligicha top offset bilan,
          shu tufayli model navbar ostiga kirmay, to'liq ko'rinib turadi */}
      <div
        className="sticky w-full"
        style={{ top: topOffsetPx, height: `calc(100vh - ${topOffsetPx}px)` }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Environment preset="city" />
          <Model scrollProgress={scrollProgress} />
        </Canvas>
      </div>
    </div>
  );
}

useGLTF.preload("/models/robot.glb");