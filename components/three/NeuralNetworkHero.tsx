"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useNormalizedMouse } from "@/lib/hooks/useMousePosition";
import { CanvasWrapper } from "./CanvasWrapper";

const NODE_COUNT = 48;
const CONNECTION_DISTANCE = 1.8;

function generateNodes(count: number) {
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.2 + Math.random() * 1.5;
    nodes.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
    );
  }
  return nodes;
}

function NeuralNodes({
  nodes,
  mouse,
}: {
  nodes: THREE.Vector3[];
  mouse: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    nodes.forEach((node, i) => {
      const offset = i * 0.3;
      const pulse = 1 + Math.sin(t * 1.5 + offset) * 0.15;
      const mouseInfluence = 0.08;
      dummy.position.set(
        node.x + mouse.x * mouseInfluence * (1 + i * 0.02),
        node.y + mouse.y * mouseInfluence * (1 + i * 0.02),
        node.z + Math.sin(t * 0.5 + offset) * 0.1
      );
      dummy.scale.setScalar(0.04 * pulse);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, nodes.length]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#7cb4ff" transparent opacity={0.95} />
    </instancedMesh>
  );
}

function NeuralConnections({
  nodes,
  mouse,
}: {
  nodes: THREE.Vector3[];
  mouse: { x: number; y: number };
}) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const mouseInfluence = 0.08;

  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECTION_DISTANCE) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          positions.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geo;
  }, [nodes]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.elapsedTime;
    const positions = lineRef.current.geometry.attributes.position
      .array as Float32Array;

    let idx = 0;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECTION_DISTANCE) {
          const offsetI = i * 0.3;
          const offsetJ = j * 0.3;
          positions[idx] =
            nodes[i].x +
            mouse.x * mouseInfluence +
            Math.sin(t * 0.5 + offsetI) * 0.05;
          positions[idx + 1] =
            nodes[i].y +
            mouse.y * mouseInfluence +
            Math.sin(t * 0.5 + offsetI) * 0.05;
          positions[idx + 2] = nodes[i].z;
          positions[idx + 3] =
            nodes[j].x + mouse.x * mouseInfluence * 0.8;
          positions[idx + 4] =
            nodes[j].y + mouse.y * mouseInfluence * 0.8;
          positions[idx + 5] = nodes[j].z;
          idx += 6;
        }
      }
    }
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#5b9cf6" transparent opacity={0.35} />
    </lineSegments>
  );
}

export function NeuralNetworkScene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useNormalizedMouse();
  const nodes = useMemo(() => generateNodes(NODE_COUNT), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.1) * 0.1 + mouse.y * 0.1;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <NeuralNodes nodes={nodes} mouse={mouse} />
      <NeuralConnections nodes={nodes} mouse={mouse} />
    </group>
  );
}

export function NeuralNetworkHeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <CanvasWrapper
        className="w-full h-full"
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
      >
        <NeuralNetworkScene />
      </CanvasWrapper>
    </div>
  );
}
