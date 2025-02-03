import React from 'react';
import { Text } from '@react-three/drei';

const PowerMeter = ({ width = 0.3, height = 0.2 }) => {
  // Calculate relative sizes
  const screenWidth = width * 0.83;
  const screenHeight = height * 0.75;
  const fontSize = height * 0.1;

  return (
    <group>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial color="#707780" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Display screen */}
      <mesh position={[0, 0, 0.011]}>
        <planeGeometry args={[screenWidth, screenHeight]} />
        <meshStandardMaterial color="#e8e8e8" metalness={0.1} roughness={0.3} />
      </mesh>

      {/* Header text */}
      <Text
        position={[0, height * 0.3, 0.015]}
        fontSize={fontSize}
        color="#333333"
        anchorX="center"
        anchorY="middle"
      >
        Schneider Electric
      </Text>

      {/* Model number */}
      <Text
        position={[0, height * 0.15, 0.015]}
        fontSize={fontSize * 0.75}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        PM2200
      </Text>

      {/* Value display */}
      <Text
        position={[0, -height * 0.1, 0.015]}
        fontSize={fontSize * 1.25}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        120.0 V
      </Text>

      {/* Bottom buttons */}
      {[-0.267, -0.09, 0.09, 0.267].map((xRatio, index) => (
        <mesh key={index} position={[width * xRatio, -height * 0.35, 0.011]}>
          <cylinderGeometry args={[width * 0.033, width * 0.033, 0.01, 16]} />
          <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.2} />
        </mesh>
      ))}

      {/* Status LEDs */}
      <mesh position={[width * 0.267, -height * 0.425, 0.011]}>
        <sphereGeometry args={[width * 0.017]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[width * 0.317, -height * 0.425, 0.011]}>
        <sphereGeometry args={[width * 0.017]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

export default PowerMeter;