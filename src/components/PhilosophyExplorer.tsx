import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Float, 
  MeshDistortMaterial,
  Environment,
  Stars,
  Html
} from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";

import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/ui/text-reveal";
import { philosophyQuotes, type PhilosophyContent } from "@/utils/manifestoContent";

// Philosophy data with 3D properties
const philosophyData: Array<PhilosophyContent & { 
  position: [number, number, number];
  color: string;
  shape: "sphere" | "tetrahedron" | "torus" | "octahedron" | "icosahedron";
}> = [
  {
    id: "disruption-as-renewal",
    title: "Disruption as Renewal",
    summary: "Transformation through creative destruction",
    description: "True disruption is not violence against what came before, but devotional commitment to what could be. Like the phoenix, we honor the ashes while embracing the fire of rebirth.",
    metaphor: "Phoenix rising from sacred flames",
    historicalReference: "Renaissance masters who broke from tradition to birth new artistic languages",
    quote: philosophyQuotes["disruption-as-renewal"],
    position: [0, 2, 0],
    color: "#ff6b6b",
    shape: "sphere",
  },
  {
    id: "education-as-transformation",
    title: "Education as Transformation",
    summary: "Learning as alchemical process",
    description: "Education is not content delivery but the unlocking of human potential. We create spaces where curiosity becomes disciplined devotion and students become co-creators of knowledge.",
    metaphor: "Seed growing into cosmic tree",
    historicalReference: "Da Vinci's method of direct observation and questioning",
    quote: philosophyQuotes["education-as-transformation"],
    position: [-3, 0, -2],
    color: "#4ecdc4",
    shape: "tetrahedron",
  },
  {
    id: "continuous-improvisation",
    title: "Continuous Improvisation",
    summary: "Jazz-like adaptation and flow",
    description: "Like jazz musicians, we listen deeply, respond courageously, and evolve endlessly. Perfection is not the goal—authentic expression and continuous growth are.",
    metaphor: "Jazz ensemble in cosmic harmony",
    historicalReference: "Miles Davis constantly reinventing his sound",
    quote: philosophyQuotes["continuous-improvisation"],
    position: [3, -1, 1],
    color: "#45b7d1",
    shape: "torus",
  },
  {
    id: "holistic-knowledge",
    title: "Holistic Knowledge",
    summary: "Integration of all ways of knowing",
    description: "Knowledge is a living constellation—science, philosophy, art, and spirit in sacred dialogue. We dissolve artificial boundaries between disciplines.",
    metaphor: "Interconnected neural network of wisdom",
    historicalReference: "Renaissance polymaths like Leonardo integrating art and science",
    quote: philosophyQuotes["holistic-knowledge"],
    position: [-2, -2, 2],
    color: "#96ceb4",
    shape: "octahedron",
  },
  {
    id: "existential-responsibility",
    title: "Existential Responsibility",
    summary: "Custodianship of future generations",
    description: "We are custodians of tomorrow. Our choices ripple across generations yet unborn. This responsibility is not burden but sacred calling.",
    metaphor: "Guardian of cosmic balance",
    historicalReference: "Indigenous wisdom keepers considering seven generations ahead",
    quote: philosophyQuotes["existential-responsibility"],
    position: [2, 1, -3],
    color: "#feca57",
    shape: "icosahedron",
  },
];

// 3D Philosophy Object Component
const PhilosophyObject: React.FC<{
  philosophy: typeof philosophyData[0];
  isSelected: boolean;
  onSelect: () => void;
  onHover: (hovered: boolean) => void;
}> = ({ philosophy, isSelected, onSelect, onHover }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle rotation
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.01;
    
    // Scale based on selection/hover
    let targetScale = 1;
    if (isSelected) {
      targetScale = 1.3;
    } else if (hovered) {
      targetScale = 1.1;
    }
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });
  
  const handlePointerOver = () => {
    setHovered(true);
    onHover(true);
    document.body.style.cursor = "pointer";
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    onHover(false);
    document.body.style.cursor = "auto";
  };
  
  const renderGeometry = () => {
    const props = {
      ref: meshRef,
      position: philosophy.position,
      onClick: onSelect,
      onPointerOver: handlePointerOver,
      onPointerOut: handlePointerOut,
    };
    
    switch (philosophy.shape) {
      case "tetrahedron":
        return (
          <mesh {...props}>
            <tetrahedronGeometry args={[1]} />
            <MeshDistortMaterial
              color={philosophy.color}
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0.1}
              metalness={0.8}
              emissive={philosophy.color}
              emissiveIntensity={isSelected ? 0.3 : 0.1}
            />
          </mesh>
        );
      case "torus":
        return (
          <mesh {...props}>
            <torusGeometry args={[1, 0.4, 16, 100]} />
            <MeshDistortMaterial
              color={philosophy.color}
              attach="material"
              distort={0.2}
              speed={1.5}
              roughness={0.1}
              metalness={0.9}
              emissive={philosophy.color}
              emissiveIntensity={isSelected ? 0.3 : 0.1}
            />
          </mesh>
        );
      case "octahedron":
        return (
          <mesh {...props}>
            <octahedronGeometry args={[1]} />
            <MeshDistortMaterial
              color={philosophy.color}
              attach="material"
              distort={0.4}
              speed={1.8}
              roughness={0.1}
              metalness={0.7}
              emissive={philosophy.color}
              emissiveIntensity={isSelected ? 0.3 : 0.1}
            />
          </mesh>
        );
      case "icosahedron":
        return (
          <mesh {...props}>
            <icosahedronGeometry args={[1]} />
            <MeshDistortMaterial
              color={philosophy.color}
              attach="material"
              distort={0.3}
              speed={2.2}
              roughness={0.1}
              metalness={0.8}
              emissive={philosophy.color}
              emissiveIntensity={isSelected ? 0.3 : 0.1}
            />
          </mesh>
        );
      default: // sphere
        return (
          <mesh {...props}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshDistortMaterial
              color={philosophy.color}
              attach="material"
              distort={0.5}
              speed={2}
              roughness={0.1}
              metalness={0.8}
              emissive={philosophy.color}
              emissiveIntensity={isSelected ? 0.3 : 0.1}
            />
          </mesh>
        );
    }
  };
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      {renderGeometry()}
      
      {/* Philosophy Title */}
      {(hovered || isSelected) && (
        <Html distanceFactor={10}>
          <div className="pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-3 text-white text-sm max-w-48">
              <h4 className="font-semibold">{philosophy.title}</h4>
              <p className="text-xs text-white/70 mt-1">{philosophy.summary}</p>
            </div>
          </div>
        </Html>
      )}
    </Float>
  );
};

// Connection Lines Component
const PhilosophyConnections: React.FC<{ selectedPhilosophy: string | null }> = ({ 
  selectedPhilosophy 
}) => {
  const linesRef = React.useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y += 0.002;
  });
  
  if (!selectedPhilosophy) return null;
  
  const selectedIndex = philosophyData.findIndex(p => p.id === selectedPhilosophy);
  if (selectedIndex === -1) return null;
  
  const selectedPos = philosophyData[selectedIndex].position;
  
  return (
    <group ref={linesRef}>
      {philosophyData.map((philosophy, index) => {
        if (index === selectedIndex) return null;
        
        const points = [
          new THREE.Vector3(...selectedPos),
          new THREE.Vector3(...philosophy.position),
        ];
        
        return (
          <primitive key={philosophy.id} object={new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: "#60a5fa", transparent: true, opacity: 0.4 }))} />
        );
      })}
    </group>
  );
};

// Main 3D Scene Component
const PhilosophyScene: React.FC<{
  selectedPhilosophy: string | null;
  onPhilosophySelect: (id: string) => void;
  onPhilosophyHover: (id: string | null) => void;
}> = ({ selectedPhilosophy, onPhilosophySelect, onPhilosophyHover }) => {
  return (
    <>
      <Stars radius={120} depth={60} count={2000} factor={2} saturation={0} fade speed={0.5} />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
      
      {philosophyData.map((philosophy) => (
        <PhilosophyObject
          key={philosophy.id}
          philosophy={philosophy}
          isSelected={selectedPhilosophy === philosophy.id}
          onSelect={() => onPhilosophySelect(philosophy.id)}
          onHover={(hovered) => onPhilosophyHover(hovered ? philosophy.id : null)}
        />
      ))}
      
      <PhilosophyConnections selectedPhilosophy={selectedPhilosophy} />
      
      <Environment preset="night" />
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxDistance={15}
        minDistance={5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
};

// Main Component
interface PhilosophyExplorerProps {
  className?: string;
}

export const PhilosophyExplorer: React.FC<PhilosophyExplorerProps> = ({
  className,
}) => {
  const [selectedPhilosophy, setSelectedPhilosophy] = React.useState<string | null>(null);
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  
  const selectedData = selectedPhilosophy 
    ? philosophyData.find(p => p.id === selectedPhilosophy)
    : null;
  
  const handlePhilosophySelect = (id: string) => {
    setSelectedPhilosophy(selectedPhilosophy === id ? null : id);
  };
  
  const startGuidedJourney = () => {
    setSelectedPhilosophy(philosophyData[0].id);
    
    // Auto-advance through philosophies
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % philosophyData.length;
      setSelectedPhilosophy(philosophyData[currentIndex].id);
      
      if (currentIndex === 0) {
        clearInterval(interval);
        setSelectedPhilosophy(null);
      }
    }, 8000);
  };
  
  return (
    <div ref={containerRef} className={cn("relative min-h-screen", className)}>
      {/* Header */}
      <motion.div
        className="absolute top-8 left-8 right-8 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <TextReveal
              text="Philosophy Universe"
              className="text-2xl md:text-4xl font-philosophical text-gradient cosmic-glow"
            />
            <p className="text-sm text-white/70 mt-2 font-elegant">
              Explore the interconnected wisdom that guides The Inevitable
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={startGuidedJourney}
              className="px-4 py-2 bg-quantum-violet/20 border border-quantum-violet/40 rounded-full text-quantum-violet hover:bg-quantum-violet/30 transition-colors text-sm"
            >
              Guided Journey
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* 3D Canvas */}
      <motion.div
        className="h-screen"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <PhilosophyScene
            selectedPhilosophy={selectedPhilosophy}
            onPhilosophySelect={handlePhilosophySelect}
            onPhilosophyHover={() => {}}
          />
        </Canvas>
      </motion.div>
      
      {/* Philosophy Detail Panel */}
      {selectedData && (
        <motion.div
          className="absolute bottom-8 left-8 right-8 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-philosophical text-gradient mb-4">
                  {selectedData.title}
                </h3>
                <p className="text-white/80 leading-relaxed mb-4 font-elegant">
                  {selectedData.description}
                </p>
                <div className="text-sm text-white/60 font-mono">
                  <strong>Metaphor:</strong> {selectedData.metaphor}
                </div>
                <div className="text-sm text-white/60 mt-2 font-mono">
                  <strong>Historical Reference:</strong> {selectedData.historicalReference}
                </div>
              </div>
              
              <div>
                <blockquote className="border-l-4 border-quantum-violet/50 pl-6 py-4">
                  <p className="text-lg italic font-elegant text-quantum-violet mb-2">
                    "{selectedData.quote.text}"
                  </p>
                  {selectedData.quote.attribution && (
                    <cite className="text-sm text-white/60 font-mono">
                      — {selectedData.quote.attribution}
                    </cite>
                  )}
                </blockquote>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setSelectedPhilosophy(null)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors text-sm"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = philosophyData.findIndex(p => p.id === selectedPhilosophy);
                      const nextIndex = (currentIndex + 1) % philosophyData.length;
                      setSelectedPhilosophy(philosophyData[nextIndex].id);
                    }}
                    className="px-4 py-2 bg-quantum-violet/20 border border-quantum-violet/40 rounded-full text-quantum-violet hover:bg-quantum-violet/30 transition-colors text-sm"
                  >
                    Next Philosophy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Instructions */}
      {!selectedPhilosophy && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-center">
            <p className="text-sm text-white/70 font-mono">
              Click to explore • Drag to rotate • Scroll to zoom
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};