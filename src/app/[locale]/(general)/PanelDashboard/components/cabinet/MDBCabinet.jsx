import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text } from "@react-three/drei";
import PowerMeter from "./PowerMeter";
import ACB from "./ACB";
import LED from "./LED";
import CCB from "./CCB";

const DoorSection = ({ width, height, position, color }) => (
    <RoundedBox
        args={[width, height, 0.01]}
        radius={0.018}
        smoothness={10}
        position={position}
        castShadow
        receiveShadow
    >
        <meshStandardMaterial
            color={color}
            metalness={0.2}
            roughness={0.5}
        />
    </RoundedBox>
);

const MDBCabinet = () => {
    const cabinetWidth = 5;
    const cabinetHeight = 2.2;
    const doorWidth = 0.9;
    const numSlots = 5;
    const doorSpacing = cabinetWidth / numSlots;

    const getYFromTop = (topOffset, height) => {
        const topY = cabinetHeight;
        return topY - topOffset - height / 2;
    };

    const slotConfigs = [
        {
            id: 0,
            type: 2,
            label: "Incoming",
            color: "#F0F0F0",
            powerMeters: [
                {
                    position: { x: 0, y: 0.49, z: 0.52 },
                    size: { width: 0.2, height: 0.15 },
                    label: "Meter 1"
                }

            ],
            ACBs: [
                {
                    position: { x: 0, y: 1.2, z: 0.5 },
                    size: { width: 0.28, height: 0.35 },
                    label: "ACB 1"
                }

            ],

            LEDs: [
                {
                    position: { x: -0.2, y: 0.89, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#00ff00"
                },
                {
                    position: { x: 0, y: 0.89, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ff0000"
                },
                {
                    position: { x: 0.2, y: 0.89, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ffff00"
                },
                {
                    position: { x: -0.2, y: 0.8, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#00ff00"
                },
                {
                    position: { x: 0, y: 0.8, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ff0000"
                },
                {
                    position: { x: 0.2, y: 0.8, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ffff00"
                },
                {
                    position: { x: -0.1, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#00ff00"
                },
                {
                    position: { x: 0, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ff0000"
                },
                {
                    position: { x: 0.1, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ffff00"
                }
            ],
            sections: [
                { height: 0.3, topOffset: 0.05 },
                { height: 1.65, topOffset: 0.38 }
            ]
        },
        {
            id: 1,
            type: 2,
            label: "Main Distribution",
            color: "#F0F0F0",
            powerMeters: [
                {
                    position: { x: 0, y: 0.49, z: 0.52 },
                    size: { width: 0.2, height: 0.15 },
                    label: "Meter 1"
                }

            ],
            ACBs: [
                {
                    position: { x: 0, y: 1.2, z: 0.5 },
                    size: { width: 0.28, height: 0.35 },
                    label: "ACB 1"
                }

            ],

            LEDs: [
                {
                    position: { x: -0.2, y: 0.89, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#00ff00"
                },
                {
                    position: { x: 0, y: 0.89, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ff0000"
                },
                {
                    position: { x: 0.2, y: 0.89, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ffff00"
                },
                {
                    position: { x: -0.2, y: 0.8, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#00ff00"
                },
                {
                    position: { x: 0, y: 0.8, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ff0000"
                },
                {
                    position: { x: 0.2, y: 0.8, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ffff00"
                },
                {
                    position: { x: -0.1, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#00ff00"
                },
                {
                    position: { x: 0, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ff0000"
                },
                {
                    position: { x: 0.1, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ffff00"
                }
            ],
            sections: [
                { height: 0.3, topOffset: 0.05 },
                { height: 1.65, topOffset: 0.38 }
            ]
        },
        {
            id: 2,
            type: 3,
            label: "Sub Distribution 1",
            color: "#F0F0F0",
            powerMeters: [
                {
                    position: { x: 0, y: 0.49, z: 0.52 },
                    size: { width: 0.2, height: 0.15 },
                    label: "Sub Meter 1"
                },
                {
                    position: { x: 0, y: 1.35, z: 0.52 },
                    size: { width: 0.2, height: 0.15 },
                    label: "Sub Meter 2"
                },
            ],
            CCBs: [
                {
                    position: { x: 0, y: 0.8, z: 0.5 },
                    size: { width: 0.15, height: 0.2 },
                    label: "CCB1"
                },
                {
                    position: { x: 0, y: 1.65, z: 0.5 },
                    size: { width: 0.15, height: 0.2 },
                    label: "CCB2"
                },

            ],
            LEDs: [
                {
                    position: { x: -0.1, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#00ff00"
                },
                {
                    position: { x: 0, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ff0000"
                },
                {
                    position: { x: 0.1, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ffff00"
                }
            ],
            sections: [
                { height: 0.3, topOffset: 0.05 },
                { height: 0.8, topOffset: 0.38 },
                { height: 0.8, topOffset: 1.23 }
            ]
        },
        {
            id: 3,
            type: 3,
            label: "Sub Distribution 2",
            color: "#F0F0F0",
            powerMeters: [
                {
                    position: { x: 0, y: 0.49, z: 0.52 },
                    size: { width: 0.2, height: 0.15 },
                    label: "Sub Meter 1"
                },
                {
                    position: { x: 0, y: 1.35, z: 0.52 },
                    size: { width: 0.2, height: 0.15 },
                    label: "Sub Meter 2"
                },
            ],
            CCBs: [
                {
                    position: { x: 0, y: 0.8, z: 0.5 },
                    size: { width: 0.15, height: 0.2 },
                    label: "CCB1"
                },
                {
                    position: { x: 0, y: 1.65, z: 0.5 },
                    size: { width: 0.15, height: 0.2 },
                    label: "CCB2"
                },

            ],
            LEDs: [
                {
                    position: { x: -0.1, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#00ff00"
                },
                {
                    position: { x: 0, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ff0000"
                },
                {
                    position: { x: 0.1, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ffff00"
                }
            ],
            sections: [
                { height: 0.3, topOffset: 0.05 },
                { height: 0.8, topOffset: 0.38 },
                { height: 0.8, topOffset: 1.23 }
            ]
        },
        {
            id: 4,
            type: 3,
            label: "Sub Distribution 3",
            color: "#F0F0F0",
            powerMeters: [
                {
                    position: { x: 0, y: 0.49, z: 0.52 },
                    size: { width: 0.2, height: 0.15 },
                    label: "Sub Meter 1"
                },
                {
                    position: { x: 0, y: 1.35, z: 0.52 },
                    size: { width: 0.2, height: 0.15 },
                    label: "Sub Meter 2"
                },
            ],
            CCBs: [
                {
                    position: { x: 0, y: 0.8, z: 0.5 },
                    size: { width: 0.15, height: 0.2 },
                    label: "CCB1"
                },
                {
                    position: { x: 0, y: 1.65, z: 0.5 },
                    size: { width: 0.15, height: 0.2 },
                    label: "CCB2"
                },

            ],
            LEDs: [
                {
                    position: { x: -0.1, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#00ff00"
                },
                {
                    position: { x: 0, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ff0000"
                },
                {
                    position: { x: 0.1, y: 0.16, z: 0.52 },
                    size: { width: 0.1, height: 0.1 },
                    color: "#ffff00"
                }
            ],
            sections: [
                { height: 0.3, topOffset: 0.05 },
                { height: 0.8, topOffset: 0.38 },
                { height: 0.8, topOffset: 1.23 }
            ]
        }
    ];

    return (
        <Canvas style={{ height: "1200px", width: "100%" }} shadows>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
            <spotLight position={[10, 10, 10]} angle={0.2} intensity={1} castShadow />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

            <group>
                {/* Main Cabinet */}
                <RoundedBox
                    args={[cabinetWidth, cabinetHeight, 1]}
                    radius={0.01}
                    smoothness={10}
                    position={[0, cabinetHeight / 2, 0]}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial color="#E0E0E0" metalness={0.3} roughness={0.6} />
                </RoundedBox>

                {/* Cabinet Slots */}
                {slotConfigs.map((slot, index) => {
                    const doorX = -cabinetWidth / 2 + doorSpacing * index + doorSpacing / 2;

                    return (
                        <group key={`slot-${slot.id}`}>
                            {/* Slot Label */}
                            <Text
                                position={[doorX, getYFromTop(-0.1, 0), 0.52]}
                                fontSize={0.08}
                                color="black"
                                anchorX="center"
                                anchorY="middle"
                            >
                                {slot.label}
                            </Text>

                            {/* Multiple Power Meters */}
                            {slot.powerMeters && slot.powerMeters.map((meter, meterIndex) => (
                                <group
                                    key={`meter-${slot.id}-${meterIndex}`}
                                    position={[
                                        doorX + meter.position.x,
                                        getYFromTop(meter.position.y, meter.size.height),
                                        meter.position.z
                                    ]}
                                >
                                    <PowerMeter
                                        width={meter.size.width}
                                        height={meter.size.height}
                                        label={meter.label}
                                    />
                                </group>
                            ))}

                            {/* Multiple ACBs */}
                            {slot.ACBs && slot.ACBs.map((acb, acbIndex) => (
                                <group
                                    key={`acb-${slot.id}-${acbIndex}`}
                                    position={[
                                        doorX + acb.position.x,
                                        getYFromTop(acb.position.y, acb.size.height),
                                        acb.position.z
                                    ]}
                                >
                                    <ACB
                                        width={acb.size.width}
                                        height={acb.size.height}
                                        label={acb.label}
                                    />
                                </group>
                            ))}

                            {/* Multiple CCBs */}
                            {slot.CCBs && slot.CCBs.map((ccb, ccbIndex) => (
                                <group
                                    key={`ccb-${slot.id}-${ccbIndex}`}
                                    position={[
                                        doorX + ccb.position.x,
                                        getYFromTop(ccb.position.y, ccb.size.height),
                                        ccb.position.z
                                    ]}
                                >
                                    <CCB
                                        width={ccb.size.width}
                                        height={ccb.size.height}
                                        label={ccb.label}
                                    />
                                </group>
                            ))}

                            {/* Multiple LEDs */}
                            {slot.LEDs && slot.LEDs.map((led, ledIndex) => (
                                <group
                                    key={`led-${slot.id}-${ledIndex}`}
                                    position={[
                                        doorX + led.position.x,
                                        getYFromTop(led.position.y, led.size.height),
                                        led.position.z
                                    ]}
                                >
                                    <LED
                                        width={led.size.width}
                                        height={led.size.height}
                                        color={led.color}
                                    />
                                </group>
                            ))}

                            {/* Door Sections */}
                            {slot.sections.map((section, sectionIndex) => (
                                <DoorSection
                                    key={`door-section-${slot.id}-${sectionIndex}`}
                                    width={doorWidth}
                                    height={section.height}
                                    position={[doorX, getYFromTop(section.topOffset, section.height), 0.51]}
                                    color={slot.color}
                                />
                            ))}
                        </group>
                    );
                })}
            </group>
        </Canvas>
    );
};

export default MDBCabinet;