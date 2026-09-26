"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { hero } from "@/content/copy";

/* Palette kept in step with the CSS tokens: brand blue roofs, clay crane, moss planting. */
const C = {
  ground: "#edf1f8",
  groundEdge: "#e2e8f3",
  road: "#d2daea",
  wall2: "#e4eaf5",
  car: "#315bd8",
  carWarm: "#c26a3c",
  wall: "#f4f7fc",
  wallWarm: "#e8edf7",
  roof: "#223c8b",
  roofSoft: "#2747b0",
  window: "#4a6ee5",
  windowLit: "#cfdcfb",
  slab: "#d6ddec",
  column: "#c3cbdf",
  crane: "#c26a3c",
  foliage: "#2f8f66",
  foliageSoft: "#3da077",
  trunk: "#8a7357",
  water: "#9db1f6",
};

type Vec = [number, number, number];

/** Rows of windows on one face of a block. */
function Windows({
  floors,
  perFloor,
  width,
  height,
  depth,
  lit = 0.3,
}: {
  floors: number;
  perFloor: number;
  width: number;
  height: number;
  depth: number;
  lit?: number;
}) {
  const panes = useMemo(() => {
    const out: { pos: Vec; on: boolean }[] = [];
    const floorH = height / floors;
    for (let f = 0; f < floors; f++) {
      for (let i = 0; i < perFloor; i++) {
        const x = -width / 2 + (width / (perFloor + 1)) * (i + 1);
        const y = -height / 2 + floorH * (f + 0.55);
        // Deterministic "is the light on" so the scene never flickers between renders.
        const on = ((f * 7 + i * 13) % 10) / 10 < lit;
        out.push({ pos: [x, y, depth / 2 + 0.01], on });
        out.push({ pos: [x, y, -depth / 2 - 0.01], on: !on });
      }
    }
    return out;
  }, [floors, perFloor, width, height, depth, lit]);

  return (
    <>
      {panes.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <planeGeometry args={[0.26, 0.34]} />
          <meshStandardMaterial
            color={p.on ? C.windowLit : C.window}
            roughness={0.35}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

/** The let apartment block. */
function ApartmentBlock(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <RoundedBox args={[2.6, 2.2, 1.8]} radius={0.06} smoothness={3} position={[0, 1.1, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={C.wall} roughness={0.9} />
      </RoundedBox>
      <group position={[0, 1.1, 0]}>
        <Windows floors={3} perFloor={4} width={2.6} height={2.2} depth={1.8} lit={0.35} />
      </group>
      {/* Parapet and a plant room, so the roof is not a bare lid. */}
      <RoundedBox args={[2.72, 0.12, 1.92]} radius={0.04} smoothness={3} position={[0, 2.24, 0]} castShadow>
        <meshStandardMaterial color={C.roof} roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.7, 0.36, 0.6]} radius={0.05} smoothness={3} position={[0.7, 2.44, -0.3]} castShadow>
        <meshStandardMaterial color={C.roofSoft} roughness={0.8} />
      </RoundedBox>
      {/* Water tanks: every block in Dar has them. */}
      {[-0.6, -0.2].map((x) => (
        <mesh key={x} position={[x, 2.45, 0.4]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.3, 16]} />
          <meshStandardMaterial color={C.water} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/** The lodge: lower, pitched roof, a veranda. */
function Lodge(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <RoundedBox args={[2.2, 0.95, 1.5]} radius={0.06} smoothness={3} position={[0, 0.48, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={C.wallWarm} roughness={0.92} />
      </RoundedBox>
      <group position={[0, 0.48, 0]}>
        <Windows floors={1} perFloor={4} width={2.2} height={0.95} depth={1.5} lit={0.6} />
      </group>
      {/* Pitched roof from a rotated box — cheaper than a cone and reads better. */}
      <mesh position={[0, 1.31, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <cylinderGeometry args={[0, 1.42, 0.78, 4]} />
        <meshStandardMaterial color={C.roof} roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.1, 1.05]} receiveShadow>
        <boxGeometry args={[2.2, 0.08, 0.7]} />
        <meshStandardMaterial color={C.slab} roughness={0.95} />
      </mesh>
      {[-0.9, 0.9].map((x) => (
        <mesh key={x} position={[x, 0.42, 1.34]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.75, 10]} />
          <meshStandardMaterial color={C.column} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/** The annex under construction: slab, columns, a crane that swings. */
function Project(props: ThreeElements["group"]) {
  const jib = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (jib.current) jib.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.5 + 0.4;
  });

  return (
    <group {...props}>
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <boxGeometry args={[2.1, 0.12, 1.7]} />
        <meshStandardMaterial color={C.slab} roughness={0.95} />
      </mesh>
      {/* Two finished floors, then open frame — the point of the whole feature. */}
      <RoundedBox args={[2.05, 0.85, 1.65]} radius={0.05} smoothness={3} position={[0, 0.54, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={C.wall} roughness={0.9} />
      </RoundedBox>
      <group position={[0, 0.54, 0]}>
        <Windows floors={1} perFloor={3} width={2.05} height={0.85} depth={1.65} lit={0.5} />
      </group>
      <mesh position={[0, 1, 0]} receiveShadow>
        <boxGeometry args={[2.1, 0.1, 1.7]} />
        <meshStandardMaterial color={C.slab} roughness={0.95} />
      </mesh>
      {[
        [-0.9, -0.7],
        [0.9, -0.7],
        [-0.9, 0.7],
        [0.9, 0.7],
        [0, 0],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.42, z]} castShadow>
          <boxGeometry args={[0.14, 0.84, 0.14]} />
          <meshStandardMaterial color={C.column} roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 1.88, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.1, 0.08, 1.7]} />
        <meshStandardMaterial color={C.slab} roughness={0.95} />
      </mesh>

      <group position={[1.5, 0, -1.1]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[0.1, 3, 0.1]} />
          <meshStandardMaterial color={C.crane} roughness={0.6} />
        </mesh>
        <group ref={jib} position={[0, 2.95, 0]}>
          <mesh position={[0.75, 0, 0]} castShadow>
            <boxGeometry args={[2.2, 0.09, 0.09]} />
            <meshStandardMaterial color={C.crane} roughness={0.6} />
          </mesh>
          <mesh position={[-0.42, 0, 0]} castShadow>
            <boxGeometry args={[0.7, 0.14, 0.14]} />
            <meshStandardMaterial color={C.crane} roughness={0.6} />
          </mesh>
          <mesh position={[1.45, -0.35, 0]}>
            <boxGeometry args={[0.015, 0.7, 0.015]} />
            <meshStandardMaterial color={C.roofSoft} />
          </mesh>
          <mesh position={[1.45, -0.78, 0]} castShadow>
            <boxGeometry args={[0.22, 0.16, 0.22]} />
            <meshStandardMaterial color={C.roofSoft} roughness={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Tree({ position, scale = 1, palm = false }: { position: Vec; scale?: number; palm?: boolean }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.6, 8]} />
        <meshStandardMaterial color={C.trunk} roughness={1} />
      </mesh>
      {palm ? (
        [0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[Math.cos((i / 5) * Math.PI * 2) * 0.22, 0.62, Math.sin((i / 5) * Math.PI * 2) * 0.22]}
            rotation={[0.9, (i / 5) * Math.PI * 2, 0]}
            castShadow
          >
            <coneGeometry args={[0.12, 0.5, 5]} />
            <meshStandardMaterial color={i % 2 ? C.foliage : C.foliageSoft} roughness={0.95} />
          </mesh>
        ))
      ) : (
        <mesh position={[0, 0.78, 0]} castShadow>
          <icosahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color={C.foliage} roughness={1} flatShading />
        </mesh>
      )}
    </group>
  );
}

/** Two parked cars, because a compound without one looks like an architect's model. */
function Car({ position, rotation = 0, warm = false }: { position: Vec; rotation?: number; warm?: boolean }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <RoundedBox args={[0.62, 0.2, 0.34]} radius={0.07} smoothness={3} position={[0, 0.12, 0]} castShadow>
        <meshStandardMaterial color={warm ? C.carWarm : C.car} roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[0.32, 0.16, 0.3]} radius={0.06} smoothness={3} position={[-0.04, 0.26, 0]} castShadow>
        <meshStandardMaterial color={C.windowLit} roughness={0.3} />
      </RoundedBox>
    </group>
  );
}

/** Compound wall and gate — the thing that makes a plot a boma. */
function Compound() {
  return (
    <group>
      <mesh position={[0, 0.26, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[4.55, 4.55, 0.52, 64, 1, true, 0.55, Math.PI * 1.75]} />
        <meshStandardMaterial color={C.wall2} roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      {/* Gate posts either side of the opening. */}
      {[
        [3.86, 2.4],
        [4.5, 0.6],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.34, z]} castShadow>
          <boxGeometry args={[0.22, 0.68, 0.22]} />
          <meshStandardMaterial color={C.roofSoft} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/** The plot itself: a soft slab with a road looping through it. */
function Ground({ dark }: { dark: boolean }) {
  const top = dark ? "#16203a" : C.ground;
  const edge = dark ? "#101831" : C.groundEdge;
  const road = dark ? "#1d284a" : C.road;
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[4.75, 64]} />
        <meshStandardMaterial color={top} roughness={1} />
      </mesh>
      <mesh position={[0, -0.12, 0]} receiveShadow>
        <cylinderGeometry args={[4.75, 4.62, 0.22, 64]} />
        <meshStandardMaterial color={edge} roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 1.2]} receiveShadow>
        <ringGeometry args={[2.9, 3.5, 64]} />
        <meshStandardMaterial color={road} roughness={1} />
      </mesh>
    </group>
  );
}

/** Slow drift plus a touch of pointer parallax; both stop for reduced motion. */
function Rig({ reduced, groupRef, dark }: { reduced: boolean; groupRef: React.RefObject<THREE.Group | null>; dark: boolean }) {
  useFrame(({ clock, pointer }) => {
    const g = groupRef.current;
    if (!g || reduced) return;
    const t = clock.elapsedTime;
    g.rotation.y = Math.sin(t * 0.12) * 0.09 + pointer.x * 0.06;
    g.position.y = Math.sin(t * 0.5) * 0.05;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.y * 0.035, 0.05);
  });
  return (
    <group ref={groupRef} scale={0.92} position={[0, -0.8, 0]}>
      <Ground dark={dark} />
      <Compound />
      <ApartmentBlock position={[-2.15, 0, -1.5]} rotation={[0, 0.26, 0]} />
      <Lodge position={[2.55, 0, 1.75]} rotation={[0, -0.55, 0]} />
      <Project position={[-1.35, 0, 2.15]} rotation={[0, -0.1, 0]} />
      <Tree position={[-3.9, 0, 1.4]} scale={1.05} />
      <Tree position={[3.8, 0, -1.2]} palm scale={1.15} />
      <Tree position={[1.2, 0, -2.7]} scale={0.9} />
      <Tree position={[-2.9, 0, 2.8]} palm scale={0.95} />
      <Tree position={[3.0, 0, 2.8]} scale={0.8} />
      <Car position={[0.85, 0, -2.4]} rotation={0.5} />
      <Car position={[1.75, 0, -1.9]} rotation={0.5} warm />

    </group>
  );
}

/** Anchor points on each building, in the rig's own coordinates. */
const ANCHORS: Vec[] = [
  [-2.15, 2.95, -1.5],
  [2.55, 2.25, 1.75],
  [-1.35, 2.7, 2.15],
];

/**
 * Projects each anchor to screen space every frame and writes it straight to the
 * badge's transform — no React state, no portal, and badges hide when a building
 * swings behind the camera.
 */
function LabelTracker({
  groupRef,
  nodes,
}: {
  groupRef: React.RefObject<THREE.Group | null>;
  nodes: React.RefObject<(HTMLDivElement | null)[]>;
}) {
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, size }) => {
    const group = groupRef.current;
    if (!group) return;
    ANCHORS.forEach((anchor, i) => {
      const el = nodes.current[i];
      if (!el) return;
      v.set(anchor[0], anchor[1], anchor[2]).applyMatrix4(group.matrixWorld).project(camera);
      const behind = v.z > 1;
      // Keep a badge inside its own canvas rather than letting it clip off the top or sides.
      const x = THREE.MathUtils.clamp((v.x * 0.5 + 0.5) * size.width, 74, size.width - 74);
      const y = THREE.MathUtils.clamp((-v.y * 0.5 + 0.5) * size.height, 52, size.height - 12);
      el.style.opacity = behind ? "0" : "1";
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -100%)`;
    });
  });
  return null;
}

export default function HeroScene({ reduced = false, dark = false }: { reduced?: boolean; dark?: boolean }) {
  // On a touch screen the canvas must not swallow the swipe, or the page cannot be
  // scrolled past the hero. Dragging to look around stays a pointer-device feature.
  const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="relative h-full w-full">
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [7.4, 4.9, 8.4], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
      aria-label={hero.sceneLabel}
      role="img"
      frameloop={reduced ? "demand" : "always"}
    >
      <hemisphereLight args={dark ? ["#dbe6ff", "#101a33", 0.85] : ["#ffffff", "#c3cee4", 1.25]} />
      <directionalLight
        position={[6, 9, 4]}
        intensity={dark ? 1.35 : 1.75}
        color={dark ? "#dce6ff" : "#fff6ea"}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Rig reduced={reduced} groupRef={groupRef} dark={dark} />
      <LabelTracker groupRef={groupRef} nodes={nodes} />
      <ContactShadows position={[0, 0, 0]} opacity={dark ? 0.5 : 0.3} scale={16} blur={2.8} far={6} />
      <OrbitControls
        target={[0, 0.45, 0]}
        enableRotate={!coarse}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.35}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.4}
      />
    </Canvas>

      {hero.markers.map((marker, i) => (
        <div
          key={marker.id}
          ref={(el) => {
            nodes.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 flex flex-col items-center gap-1 opacity-0 transition-opacity duration-(--duration-ui) will-change-transform"
        >
          <div className="whitespace-nowrap rounded-pill border border-line/70 bg-surface/95 px-3 py-1.5 text-center shadow-soft backdrop-blur">
            <p className="text-[0.72rem] font-semibold leading-tight tracking-tight text-ink">{marker.label}</p>
            <p className="text-[0.64rem] leading-tight text-ink-muted">{marker.note}</p>
          </div>
          <span className="h-3 w-px bg-line" />
        </div>
      ))}
    </div>
  );
}
