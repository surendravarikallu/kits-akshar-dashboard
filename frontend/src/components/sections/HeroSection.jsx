import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SPRING_REVEAL, SPRING_STAGGER, KINETIC_TEXT, SPRING_HOVER } from '../../utils/animations';
import * as THREE from 'three';

// Particle Field Component (Subtle 3D Background)
function ParticleField({ count = 2000 }) {
  const points = useRef();

  const [particlesPosition] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  });

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C9A84C"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function HeroSection({ data }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Immersive Parallax Scroll Effects
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Split text for kinetic typography effect
  const titleWords = (data?.title || "KITS Akshar").split(" ");

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-kits-black overflow-hidden flex items-center justify-center">
      {/* 3D Immersive Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ParticleField count={3000} />
        </Canvas>
      </div>

      {/* Hero Content with Parallax */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={SPRING_STAGGER(0.15)}
          className="flex flex-col items-center gap-6"
        >
          {data?.badge && (
            <motion.div variants={SPRING_REVEAL} className="px-4 py-1 rounded-full border border-kits-gold/30 bg-kits-gold/10 text-kits-gold text-sm font-medium tracking-widest uppercase">
              {data.badge}
            </motion.div>
          )}

          <div className="flex gap-4 overflow-hidden py-2">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={KINETIC_TEXT}
                className="text-6xl md:text-8xl lg:text-9xl font-bold font-clash text-white uppercase tracking-tight inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            variants={SPRING_REVEAL}
            className="text-xl md:text-2xl text-kits-white/80 max-w-2xl font-satoshi font-light"
          >
            {data?.subtitle || "A Fully Dynamic Visual Content Operating System"}
          </motion.p>

          {data?.primaryCta && (
            <motion.div variants={SPRING_REVEAL} className="flex gap-6 mt-8">
              <motion.button
                whileHover={SPRING_HOVER}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-kits-gold text-kits-black font-semibold rounded-sm transition-colors duration-300 hover:bg-white"
              >
                {data.primaryCta}
              </motion.button>
              {data?.secondaryCta && (
                <motion.button
                  whileHover={SPRING_HOVER}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-white/20 text-white font-semibold rounded-sm hover:bg-white/10 transition-colors duration-300 glass"
                >
                  {data.secondaryCta}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-kits-black to-transparent z-10" />
    </section>
  );
}
