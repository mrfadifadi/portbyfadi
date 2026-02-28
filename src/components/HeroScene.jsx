import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Center, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedCamera({ position, scale, speed }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={1.5}>
            <group ref={groupRef} position={position} scale={scale}>
                {/* Camera Body */}
                <RoundedBox args={[1.5, 1, 0.8]} radius={0.1} smoothness={4}>
                    <meshStandardMaterial color="#27272A" roughness={0.2} metalness={0.8} />
                </RoundedBox>
                {/* Camera Lens */}
                <mesh position={[0, 0, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                    <meshStandardMaterial color="#18181B" roughness={0.1} metalness={0.9} />
                </mesh>
                {/* Lens Inner Glass */}
                <mesh position={[0, 0, 0.66]}>
                    <circleGeometry args={[0.3, 32]} />
                    <meshStandardMaterial color="#000000" roughness={0} metalness={1} />
                </mesh>
                {/* Top flash/viewfinder */}
                <RoundedBox position={[0, 0.6, 0]} args={[0.6, 0.2, 0.4]} radius={0.05} smoothness={4}>
                    <meshStandardMaterial color="#3F3F46" roughness={0.3} metalness={0.7} />
                </RoundedBox>
                {/* Small red record button */}
                <mesh position={[0.5, 0.5, 0.2]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
                    <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.5} />
                </mesh>
            </group>
        </Float>
    );
}

function AnimatedPlayIcon({ position, scale, speed }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4;
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
        }
    });

    return (
        <Float speed={speed * 2} rotationIntensity={0.8} floatIntensity={2}>
            <group ref={meshRef} position={position} scale={scale}>
                {/* Outer Ring */}
                <mesh>
                    <torusGeometry args={[1, 0.15, 16, 64]} />
                    <meshStandardMaterial color="#3F3F46" roughness={0.1} metalness={0.9} />
                </mesh>
                {/* Inner Play Triangle */}
                <mesh position={[0.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                    <coneGeometry args={[0.5, 0.8, 3]} />
                    <meshStandardMaterial color="#18181B" roughness={0.2} metalness={0.8} />
                </mesh>
            </group>
        </Float>
    );
}

function Animated3DElement({ position, scale, speed }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
            groupRef.current.rotation.z = state.clock.elapsedTime * speed * 0.4;
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.5}>
            <group ref={groupRef} position={position} scale={scale}>
                {/* Solid Core */}
                <mesh>
                    <octahedronGeometry args={[0.8, 0]} />
                    <meshStandardMaterial color="#18181B" roughness={0.1} metalness={0.95} />
                </mesh>
                {/* Wireframe Outer */}
                <mesh>
                    <icosahedronGeometry args={[1.2, 1]} />
                    <meshStandardMaterial color="#52525B" wireframe={true} transparent opacity={0.3} />
                </mesh>
            </group>
        </Float>
    );
}

function ParticleField() {
    const count = 300;
    const particlesRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
            particlesRef.current.rotation.x = state.clock.elapsedTime * 0.015;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#A1A1AA"
                sizeAttenuation
                transparent
                opacity={0.5}
            />
        </points>
    );
}

export default function HeroScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <directionalLight position={[-5, -5, -5]} intensity={0.5} />
            <pointLight position={[0, 0, 3]} intensity={0.8} />

            <AnimatedCamera
                position={[-3, 1, -2]}
                scale={0.9}
                speed={0.7}
            />

            <AnimatedPlayIcon
                position={[3, -1.5, -1]}
                scale={0.8}
                speed={0.6}
            />

            <Animated3DElement
                position={[0, -2.5, 0]}
                scale={0.7}
                speed={0.5}
            />

            <AnimatedCamera
                position={[2.5, 2.5, -3]}
                scale={0.5}
                speed={0.9}
            />

            <ParticleField />

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.3}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 3}
            />
        </Canvas>
    );
}
