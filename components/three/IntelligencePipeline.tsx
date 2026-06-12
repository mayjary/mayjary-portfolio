"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAGES = ["Data", "Learning", "Reasoning", "Decision", "Impact"];
const STAGE_COUNT = STAGES.length;

interface IntelligencePipelineProps {
  progress: number;
}

function PipelineNodes({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const nodePositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let stage = 0; stage < STAGE_COUNT; stage++) {
      const stageX = (stage - 2) * 1.8;
      const nodesInStage = 4 + stage * 2;
      for (let n = 0; n < nodesInStage; n++) {
        const angle = (n / nodesInStage) * Math.PI * 2;
        const radius = 0.4 + stage * 0.15;
        positions.push(
          new THREE.Vector3(
            stageX + Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            (Math.random() - 0.5) * 0.5
          )
        );
      }
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!nodesRef.current || !groupRef.current) return;
    const t = state.clock.elapsedTime;
    const activeStage = Math.floor(progress * STAGE_COUNT);

    nodePositions.forEach((pos, i) => {
      const stage = Math.floor(i / 6);
      const isActive = stage <= activeStage;
      const pulse = isActive
        ? 1 + Math.sin(t * 2 + i * 0.5) * 0.2
        : 0.5 + Math.sin(t + i) * 0.05;

      dummy.position.set(
        pos.x,
        pos.y + Math.sin(t * 0.8 + i * 0.3) * 0.05,
        pos.z
      );
      dummy.scale.setScalar(0.035 * pulse * (isActive ? 1.2 : 0.6));
      dummy.updateMatrix();
      nodesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;

    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.1;
  });

  const connections = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 1.2) {
          positions.push(
            nodePositions[i].x,
            nodePositions[i].y,
            nodePositions[i].z,
            nodePositions[j].x,
            nodePositions[j].y,
            nodePositions[j].z
          );
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geo;
  }, [nodePositions]);

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, nodePositions.length]}
      >
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.85} />
      </instancedMesh>
      <lineSegments geometry={connections}>
        <lineBasicMaterial
          color="#10b981"
          transparent
          opacity={0.15 + progress * 0.35}
        />
      </lineSegments>
    </group>
  );
}

export function IntelligencePipelineScene({ progress }: IntelligencePipelineProps) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <PipelineNodes progress={progress} />
    </>
  );
}
