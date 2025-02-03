import React from 'react';
import { Text } from '@react-three/drei';

const ACB = ({ width = 0.5, height = 0.4 }) => {
  // Calculate relative sizes
  const buttonSize = height * 0.15;
  const labelFontSize = height * 0.05;

  return (
    <group>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, 0.1]} />
        <meshStandardMaterial color="#707780" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Red "Push OFF" Button */}
      <mesh position={[-width * 0.2, height * 0.15, 0.051]}>
        <cylinderGeometry args={[buttonSize * 0.5, buttonSize * 0.5, 0.02, 32]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      <Text
        position={[-width * 0.2, height * 0.15, 0.06]}
        fontSize={labelFontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Push OFF
      </Text>

      {/* Black "Push ON" Button */}
      <mesh position={[width * 0.2, height * 0.15, 0.051]}>
        <cylinderGeometry args={[buttonSize * 0.5, buttonSize * 0.5, 0.02, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <Text
        position={[width * 0.2, height * 0.15, 0.06]}
        fontSize={labelFontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Push ON
      </Text>

      {/* Status Indicator */}
      <mesh position={[0, height * 0.05, 0.051]}>
        <boxGeometry args={[width * 0.3, height * 0.1, 0.01]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
      <Text
        position={[0, height * 0.05, 0.06]}
        fontSize={labelFontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        ON
      </Text>

      {/* Schneider Electric Logo */}
      <Text
        position={[0, -height * 0.25, 0.06]}
        fontSize={labelFontSize}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Schneider Electric
      </Text>
    </group>
  );
};

export default ACB;
