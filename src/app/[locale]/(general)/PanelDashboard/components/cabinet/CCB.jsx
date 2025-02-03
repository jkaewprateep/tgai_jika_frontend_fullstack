import React from "react";
import { Text } from "@react-three/drei";

const CB = ({ width = 0.3, height = 0.4 }) => {
  const bodyDepth = 0.05;
  const labelFontSize = height * 0.05;
  
  return (
    <group>
      {/* Main body - dark gray casing */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, bodyDepth]} />
        <meshStandardMaterial color="#333333" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Red top banner for ABB SACE A1 */}
      <mesh position={[0, height * 0.35, bodyDepth / 2 + 0.001]}>
        <boxGeometry args={[width, height * 0.08, 0.01]} />
        <meshStandardMaterial color="#FF0000" />
      </mesh>

      {/* Switch area background - slightly recessed */}
      <mesh position={[0, 0, bodyDepth / 2]}>
        <boxGeometry args={[width * 0.7, height * 0.5, 0.005]} />
        <meshStandardMaterial color="#2A2A2A" />
      </mesh>

      {/* Toggle switch - white/light gray */}
      <mesh position={[0, height * 0.05, bodyDepth / 2 + 0.01]}>
        <boxGeometry args={[width * 0.25, height * 0.25, 0.015]} />
        <meshStandardMaterial color="#EEEEEE" />
      </mesh>

      {/* Indicator strips */}
      {/* Red strip (top) */}
      <mesh position={[-width * 0.2, height * 0.15, bodyDepth / 2 + 0.006]}>
        <boxGeometry args={[width * 0.05, height * 0.1, 0.001]} />
        <meshStandardMaterial color="#FF0000" />
      </mesh>
      {/* Yellow strip (middle) */}
      <mesh position={[-width * 0.2, height * 0.05, bodyDepth / 2 + 0.006]}>
        <boxGeometry args={[width * 0.05, height * 0.1, 0.001]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      {/* Green strip (bottom) */}
      <mesh position={[-width * 0.2, -height * 0.05, bodyDepth / 2 + 0.006]}>
        <boxGeometry args={[width * 0.05, height * 0.1, 0.001]} />
        <meshStandardMaterial color="#00FF00" />
      </mesh>

      {/* Text Labels */}
      <Text
        position={[0, height * 0.35, bodyDepth / 2 + 0.015]}
        fontSize={labelFontSize}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        SACE A1
      </Text>

      <Text
        position={[width * 0.15, height * 0.15, bodyDepth / 2 + 0.015]}
        fontSize={labelFontSize * 0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        on
      </Text>

      <Text
        position={[width * 0.15, -height * 0.05, bodyDepth / 2 + 0.015]}
        fontSize={labelFontSize * 0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        off
      </Text>

      {/* Mounting screws */}
      <mesh position={[-width * 0.4, height * 0.4, bodyDepth / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.02, 16]} />
        <meshStandardMaterial color="#666666" metalness={0.8} />
      </mesh>
      <mesh position={[width * 0.4, height * 0.4, bodyDepth / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.02, 16]} />
        <meshStandardMaterial color="#666666" metalness={0.8} />
      </mesh>

      {/* Rating plate area */}
      <mesh position={[0, -height * 0.3, bodyDepth / 2 + 0.001]}>
        <boxGeometry args={[width * 0.9, height * 0.2, 0.001]} />
        <meshStandardMaterial color="#2A2A2A" />
      </mesh>
    </group>
  );
};

export default CB;