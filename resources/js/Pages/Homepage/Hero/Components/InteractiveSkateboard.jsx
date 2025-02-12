import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

export function InteractiveSkateboard() {
    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Canvas
                className="min-h-[60rem] w-full"
                camera={{ position: [1.5, 1, 1.4], fov: 55 }}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}

function Scene() {
    return (
        <group>
            <OrbitControls />
            <Environment preset="forest" />
            <mesh>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
        </group>
    );
}
