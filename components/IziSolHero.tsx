"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { usePathname } from "next/navigation";

/**
 * IziSolHero — tayyor 3D robot modeli (GLB) bilan ishlaydigan hero bo'limi.
 *
 * MODELNI YUKLAB OLISH:
 * 1) https://poly.pizza/m/QCm7qe9uNJ ga o'ting ("Animated Robot" by Quaternius, CC0 — bepul, attribution shart emas)
 * 2) "Download GLTF" tugmasini bosing, .glb faylni oling
 * 3) Faylni  public/models/robot.glb  qilib joylashtiring (Next.js'da public/ papkasi statik fayllar uchun)
 *
 * O'RNATISH:
 *   npm install three
 *   npm install -D @types/three   (agar TS xato bersa)
 *
 * QO'LLASH:
 *   components/IziSolHero.tsx qilib saqlang, so'ng:
 *   import IziSolHero from "@/components/IziSolHero";
 *
 * ESLATMA: Boshqa robot/model ishlatmoqchi bo'lsang, MODEL_PATH ni
 * public/ ichidagi o'z .glb faylingga yo'naltirsang bas — qolgan kod o'zgarmaydi.
 */

const MODEL_PATH = "/models/robot.glb";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Bosh sahifa", href: "#home" },
  { label: "Biz haqimizda", href: "#about" },
  { label: "Xizmatlar", href: "#services" },
  { label: "Aloqa", href: "#contact" },
];

export default function IziSolHero(): React.ReactElement {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // ---- Scene ----
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(2.4, 1.6, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ---- Lighting ----
    const ambient = new THREE.AmbientLight(0x9db4ff, 0.55);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(3, 5, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xf59e0b, 2.2, 12);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x5eead4, 1.4, 12);
    fillLight.position.set(-2, 1, 3);
    scene.add(fillLight);

    // ---- Ground shadow catcher ----
    const groundGeo = new THREE.CircleGeometry(2.2, 48);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.28 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // ---- Controls (faqat aylantirish, zoom/pan yo'q) ----
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2.6;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.1;
    controls.target.set(0, 1, 0);
    controls.update();

    // ---- Model yuklash ----
    const loader = new GLTFLoader();
    let mixer: THREE.AnimationMixer | null = null;
    let robot: THREE.Object3D | null = null;

    loader.load(
      MODEL_PATH,
      (gltf) => {
        robot = gltf.scene;
        robot.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = false;
          }
        });

        // Modelni markazlash va o'lchamini normallashtirish
        const box = new THREE.Box3().setFromObject(robot);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.1 / maxDim;
        robot.scale.setScalar(scale);

        const center = new THREE.Vector3();
        box.getCenter(center);
        robot.position.sub(center.multiplyScalar(scale));
        robot.position.y = 0;

        scene.add(robot);

        // Animatsiya bo'lsa (idle/walk) — birinchisini ijro etamiz
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(robot);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        setLoaded(true);
      },
      (xhr) => {
        if (xhr.total) setProgress(Math.round((xhr.loaded / xhr.total) * 100));
      },
      () => {
        setError(true);
      }
    );

    // ---- Resize ----
    const handleResize = (): void => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // ---- Animatsiya sikli ----
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = (): void => {
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      if (robot) {
        // yumshoq "floating" effekti
        robot.position.y = 0.06 * Math.sin(clock.elapsedTime * 1.4);
      }

      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [pathname]);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0B0E1A 0%, #10142A 100%)",
        overflow: "hidden",
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        color: "#F4F6FB",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');
        @keyframes izisolFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes izisolSpin {
          to { transform: rotate(360deg); }
        }
        .izisol-nav-link {
          position: relative;
          color: #C7CDDB;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .izisol-nav-link:hover { color: #F4F6FB; }
        .izisol-nav-link::after {
          content: "";
          position: absolute;
          left: 0; bottom: -4px;
          width: 0%; height: 1px;
          background: #F59E0B;
          transition: width 0.25s ease;
        }
        .izisol-nav-link:hover::after { width: 100%; }
        .izisol-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          background: #F59E0B;
          color: #0B0E1A;
          font-weight: 600;
          font-size: 14.5px;
          border-radius: 999px;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .izisol-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);
        }
        .izisol-spinner {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 2px solid rgba(244,246,251,0.15);
          border-top-color: #5EEAD4;
          animation: izisolSpin 0.8s linear infinite;
        }
      `}</style>

      {/* 3D canvas */}
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Yuklanish holati */}
      {!loaded && !error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            pointerEvents: "none",
          }}
        >
          <div className="izisol-spinner" />
          <span style={{ fontSize: 13, color: "#9AA3B8" }}>
            Model yuklanmoqda… {progress}%
          </span>
        </div>
      )}
      {error && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 5,
            fontSize: 13,
            color: "#F59E0B",
            textAlign: "center",
            maxWidth: 300,
          }}
        >
          Model topilmadi. "/public/models/robot.glb" fayli mavjudligini tekshiring.
        </div>
      )}

      {/* Nav */}
      <nav
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "26px 6vw",
        }}
      >
        <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em" }}>
          Izi<span style={{ color: "#F59E0B" }}>Sol</span>
        </div>
        <div style={{ display: "flex", gap: 34 }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="izisol-nav-link">
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Matn — chap tomonda, model o'ng tomonda ko'rinadigan bo'lishi uchun */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 560,
          padding: "12vh 6vw 0",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#5EEAD4",
            marginBottom: 22,
            animation: "izisolFadeUp 0.7s ease both",
          }}
        >
          IT yechimlar kompaniyasi
        </div>

        <h1
          style={{
            fontSize: "clamp(30px, 4.6vw, 50px)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 20px",
            animation: "izisolFadeUp 0.7s ease 0.1s both",
          }}
        >
          Aqlli yechimlar yaratamiz,
          <br />
          g'oyangizni ishga tushiramiz
        </h1>

        <p
          style={{
            fontSize: 16.5,
            lineHeight: 1.6,
            color: "#9AA3B8",
            fontFamily: "'Inter', system-ui, sans-serif",
            margin: "0 0 36px",
            maxWidth: 440,
            animation: "izisolFadeUp 0.7s ease 0.2s both",
          }}
        >
          Mobil, veb, backend va Telegram-bot yechimlari — bitta jamoada,
          boshidan oxirigacha.
        </p>

        <div style={{ animation: "izisolFadeUp 0.7s ease 0.3s both" }}>
          <a href="#contact" className="izisol-cta">
            Loyiha buyurtma qilish →
          </a>
        </div>
      </div>
    </section>
  );
}