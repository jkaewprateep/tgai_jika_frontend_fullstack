import React from "react";

const LED = ({
  size = 0.02,
  color = "#00ff00",
  emissiveIntensity = 1,
  rimColor = "#333333",
}) => {
  const baseDepth = size * 0.15;
  const rimHeight = size * 0.1;

  return (
    <group rotation={[1.56, 0, 0]}> {/* Ensure no rotation */}
      {/* LED Base (Rim) */}
      <mesh position={[0, 0, -rimHeight / 2]}>
        <cylinderGeometry args={[size * 1.2, size * 1.2, rimHeight, 100]} />
        <meshStandardMaterial color={rimColor} metalness={0.5} roughness={0.6} />
      </mesh>

      {/* LED Light Dome */}
      <mesh position={[0, 0, rimHeight / 2]}>
        <sphereGeometry args={[size, 100, 100, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>

      {/* LED Inner Glow */}
      <mesh position={[0, 0, rimHeight]}>
        <cylinderGeometry args={[size * 0.7, size * 0.7, size * 0.05, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity * 1.2}
          roughness={0.1}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

export default LED;
