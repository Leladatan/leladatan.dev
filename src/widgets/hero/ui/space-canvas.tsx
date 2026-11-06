"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  type Group,
  type Points,
  SRGBColorSpace,
} from "three";

function radialTexture(stops: Array<[number, string]>) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  if (!context) return texture;
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  for (const [offset, color] of stops) gradient.addColorStop(offset, color);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  texture.needsUpdate = true;
  return texture;
}

function fillSphere(
  count: number,
  radius: number,
  colors: string[],
  spread = 1,
) {
  const positions = new Float32Array(count * 3);
  const color = new Float32Array(count * 3);
  const palette = colors.map((value) => new Color(value));

  for (let index = 0; index < count; index += 1) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const distance = radius * (0.35 + Math.random() * 0.65) * spread;
    positions[index * 3] = distance * Math.sin(phi) * Math.cos(theta);
    positions[index * 3 + 1] =
      distance * Math.sin(phi) * Math.sin(theta) * 0.72;
    positions[index * 3 + 2] = distance * Math.cos(phi);
    const tint = palette[index % palette.length];
    color[index * 3] = tint.r;
    color[index * 3 + 1] = tint.g;
    color[index * 3 + 2] = tint.b;
  }

  return { positions, color };
}

function Cosmos({
  scroll,
  reduced,
  rich,
}: {
  scroll: RefObject<number>;
  reduced: boolean;
  rich: boolean;
}) {
  const group = useRef<Group>(null);
  const dust = useRef<Points>(null);
  const glow = useMemo(
    () =>
      radialTexture([
        [0, "rgba(255,255,255,1)"],
        [0.12, "rgba(255,255,255,0.9)"],
        [0.4, "rgba(255,255,255,0.12)"],
        [1, "rgba(255,255,255,0)"],
      ]),
    [],
  );
  const cloud = useMemo(
    () =>
      radialTexture([
        [0, "rgba(255,255,255,0.75)"],
        [0.42, "rgba(255,255,255,0.16)"],
        [1, "rgba(255,255,255,0)"],
      ]),
    [],
  );
  const far = useMemo(
    () => fillSphere(rich ? 5200 : 1600, 46, ["#f7f7fb", "#d5def8", "#c4b5fd"]),
    [rich],
  );
  const near = useMemo(
    () =>
      fillSphere(rich ? 650 : 200, 20, ["#ffffff", "#b9ccff", "#e9d5ff"], 0.5),
    [rich],
  );

  useEffect(
    () => () => {
      glow.dispose();
      cloud.dispose();
    },
    [glow, cloud],
  );

  useFrame((state) => {
    const root = group.current;
    if (!root || reduced) return;
    const drift = state.clock.elapsedTime;
    root.rotation.y = drift * 0.016 + state.pointer.x * 0.22;
    root.rotation.x = state.pointer.y * 0.1;
    root.position.z = -scroll.current * 6;
    if (dust.current) dust.current.rotation.y = -drift * 0.02;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[far.positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[far.color, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={glow}
          size={0.045}
          sizeAttenuation
          vertexColors
          blending={AdditiveBlending}
          depthWrite={false}
          transparent
        />
      </points>
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[near.positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[near.color, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={glow}
          size={0.07}
          sizeAttenuation
          vertexColors
          blending={AdditiveBlending}
          depthWrite={false}
          transparent
        />
      </points>
      <sprite position={[3.2, 1.4, -2]} scale={[9, 6.5, 1]}>
        <spriteMaterial
          map={cloud}
          color="#6d4dff"
          blending={AdditiveBlending}
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </sprite>
      <sprite position={[-3.6, 0.6, -3]} scale={[8, 5.5, 1]}>
        <spriteMaterial
          map={cloud}
          color="#3d7dff"
          blending={AdditiveBlending}
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </sprite>
      <sprite position={[0.4, 2.2, -4]} scale={[11, 7, 1]}>
        <spriteMaterial
          map={cloud}
          color="#24124f"
          blending={AdditiveBlending}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </sprite>
    </group>
  );
}

export function SpaceCanvas({ scroll }: { scroll: RefObject<number> }) {
  const holder = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [rich, setRich] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 960px)");
    const fine = window.matchMedia("(pointer: fine)");
    const sync = () => {
      setReduced(motion.matches);
      setRich(wide.matches && fine.matches && !motion.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const node = holder.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={holder} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.2, 7], fov: 55 }}
        dpr={[1, 1.5]}
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
        style={{ touchAction: "pan-y" }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl, invalidate }) => {
          gl.setClearColor("#07060b");
          if (reduced) invalidate();
        }}
      >
        <Cosmos scroll={scroll} reduced={reduced} rich={rich} />
        {rich ? (
          <EffectComposer>
            <Bloom intensity={0.35} luminanceThreshold={0.2} mipmapBlur />
          </EffectComposer>
        ) : null}
      </Canvas>
    </div>
  );
}
