"use client"

import { Button } from "@/components/ui/button"
import { Briefcase, Download, FolderKanban, FolderOpen, Mail, Building2 } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { random, range } from "@/lib/utils"
import { useRandomInterval } from "@/lib/hooks"
import { projects } from "@/data/projects"
import { experience } from "@/data/experience"
import { topics } from "@/data/topics"

const generateSparkle = (title: string) => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    title,
    size: random(15, 25), // Slightly larger sparkles
    style: {
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
      zIndex: 2,
    },
  };
};

const Sparkle = ({ size, style, title }: { size: number, style: any, title: string }) => {
  return (
    <span className="sparkle-wrapper" style={style}>
      <div className="text-lg font-medium text-foreground/80 hover:text-primary sparkle">
        {title}
      </div>
    </span>
  );
};

const GlowText = ({ text }: { text: string }) => {
  return (
    <motion.span 
      className="font-medium"
      animate={{ 
        textShadow: [
          "0 0 0px rgba(139, 92, 246, 0), 0 0 0px rgba(139, 92, 246, 0)",
          "0 0 20px rgba(139, 92, 246, 1), 0 0 40px rgba(139, 92, 246, 0.8)",
          "0 0 0px rgba(139, 92, 246, 0), 0 0 0px rgba(139, 92, 246, 0)"
        ]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {text}
    </motion.span>
  );
};

const SkillPlexus = ({ setSelectedExpertise }: { setSelectedExpertise: (expertise: string | null) => void }) => {
  const [mounted, setMounted] = useState(false);
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const [positions, setPositions] = useState(() => {
    const seed = 12345;
    return topics.map((_, i) => {
      const x = 15 + ((seed + i * 7) % 70); // Add more padding
      const y = 15 + ((seed + i * 11) % 70); // Add more padding
      return {
        x, y,
        vx: ((seed + i * 13) % 6 - 3) * 0.05,
        vy: ((seed + i * 17) % 6 - 3) * 0.05,
      };
    });
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setPositions(prev => {
        let newPositions = prev.map(pos => {
          let newX = pos.x + pos.vx;
          let newY = pos.y + pos.vy;
          let newVx = pos.vx;
          let newVy = pos.vy;

          // Add a gentle gravitational pull towards the center (50%)
          const centerX = 50;
          const centerY = 50;
          const centeringStrength = 0.0005; // Reduced for more stable movement
          newVx += (centerX - pos.x) * centeringStrength;
          newVy += (centerY - pos.y) * centeringStrength;

          // Clamp velocities to prevent runaway speeds
          const maxVelocity = 0.3;
          newVx = Math.max(-maxVelocity, Math.min(maxVelocity, newVx));
          newVy = Math.max(-maxVelocity, Math.min(maxVelocity, newVy));

          // Bounce off boundaries with wider margins
          if (newX < 15 || newX > 85) { 
            newVx = -newVx * 0.8;
            newX = newX < 15 ? 15 : 85; 
          }
          if (newY < 15 || newY > 85) { 
            newVy = -newVy * 0.8;
            newY = newY < 15 ? 15 : 85; 
          }

          return { ...pos, x: newX, y: newY, vx: newVx, vy: newVy };
        });

        // Add repulsion logic to prevent node overlap with improved stability
        for (let i = 0; i < newPositions.length; i++) {
          for (let j = i + 1; j < newPositions.length; j++) {
            const node1 = newPositions[i];
            const node2 = newPositions[j];
            const dx = node2.x - node1.x;
            const dy = node2.y - node1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = 35; // Slightly reduced repulsion distance

            if (distance < minDistance && distance > 0) {
              const overlap = minDistance - distance;
              const angle = Math.atan2(dy, dx);
              
              const moveX = Math.cos(angle) * overlap / 3; // Reduced movement strength
              const moveY = Math.sin(angle) * overlap / 3; // Reduced movement strength

              newPositions[i].x -= moveX;
              newPositions[i].y -= moveY;
              newPositions[j].x += moveX;
              newPositions[j].y += moveY;
            }
          }
        }
        
        return newPositions;
      });
    }, 100); // Increased interval for more stable animation
    return () => clearInterval(interval);
  }, [mounted]);

  const handleTopicClick = (topicTitle: string) => {
    setSelectedExpertise(topicTitle);
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"><div className="absolute inset-0 bg-grid-pattern opacity-20"></div></div>;
  }

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {positions.map((pos1, i) =>
          positions.slice(i + 1).map((pos2, j) => {
            const distance = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
            const maxDistance = 75; // Lines fade out completely at this distance
            const opacity = Math.max(0, 1 - distance / maxDistance);
            
            return (
              <line
                key={`${i}-${j + i + 1}`}
                x1={`${pos1.x}%`} y1={`${pos1.y}%`}
                x2={`${pos2.x}%`} y2={`${pos2.y}%`}
                stroke="url(#gradient)" 
                strokeWidth="1.5" 
                opacity={opacity * opacity} // Squared for a smoother, more pronounced fade-in
              />
            );
          })
        )}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
      </svg>
      {positions.map((pos, index) => {
        const topic = topics[index];
        const isHovered = hoveredTopic === topic.title;

        return (
          <div
            key={topic.title}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 hover:z-10"
            style={{ 
              left: `${pos.x}%`, 
              top: `${pos.y}%`,
              maxWidth: '200px', // Prevent text from getting too wide
              minWidth: '120px'  // Ensure minimum width for readability
            }}
            onClick={() => handleTopicClick(topic.title)}
            onMouseEnter={() => setHoveredTopic(topic.title)}
            onMouseLeave={() => setHoveredTopic(null)}
          >
            <div className="text-center">
              <div className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 px-2 py-1 break-words">
                {topic.title}
              </div>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex items-center gap-3 bg-background/90 backdrop-blur-sm border border-primary/20 rounded-lg px-3 py-2 shadow-lg z-20"
                  style={{ minWidth: 'max-content' }} // Ensure tooltip doesn't get clipped
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <Building2 className="h-3 w-3 text-blue-500" />
                    <span className="text-muted-foreground">{topic.experienceCount}</span>
                  </div>
                  <div className="w-px h-3 bg-border"></div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <FolderOpen className="h-3 w-3 text-green-500" />
                    <span className="text-muted-foreground">{topic.projectCount}</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export function Hero({ setSelectedExpertise }: { setSelectedExpertise: (expertise: string | null) => void }) {
  const [animationStep, setAnimationStep] = useState(0);
  const [sparkles, setSparkles] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStep(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useRandomInterval(
    () => {
      const now = Date.now();
      const newSparkle = generateSparkle("New opportunity!");
      const nextSparkles = sparkles.filter(sp => now - sp.createdAt < 1000);
      nextSparkles.push(newSparkle);
      setSparkles(nextSparkles);
    },
    2000, 3500
  );

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left order-1 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* LED indicator */}
                <div className="w-2 h-2 rounded-full animate-pulse ring-2 ring-green-200/50" style={{ backgroundColor: '#00FF00', boxShadow: '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00' }}></div>
              </motion.div>
              <span className="text-xs sm:text-sm text-primary font-semibold tracking-wide">
                Open to opportunities
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-light text-foreground tracking-tight mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hey, I'm <span className="font-semibold gradient-text">Ashwin</span>
            </motion.h1>
            
            <motion.div 
              className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="flex flex-wrap items-baseline justify-center lg:justify-start gap-x-1 sm:gap-x-2 text-sm sm:text-lg text-muted-foreground">
                <GlowText text="Building depth estimation for ADAS" />
                <span className="text-primary font-medium inline-flex items-baseline gap-1 sm:gap-2">
                  <span className="text-muted-foreground/50">@</span>
                  <span>Argonne National Laboratory</span>
                </span>
              </p>
              
              <p className="flex flex-wrap items-baseline justify-center lg:justify-start gap-x-1 sm:gap-x-2 text-sm sm:text-lg text-muted-foreground/80">
                <span className="font-medium">Certified in Data Science &amp; AI Engineering by</span>
                <span className="inline-flex items-baseline gap-1 sm:gap-2">
                  <span className="font-semibold">
                    <span style={{ color: '#4285F4' }}>G</span>
                    <span style={{ color: '#EA4335' }}>o</span>
                    <span style={{ color: '#FBBC05' }}>o</span>
                    <span style={{ color: '#4285F4' }}>g</span>
                    <span style={{ color: '#34A853' }}>l</span>
                    <span style={{ color: '#EA4335' }}>e</span>
                  </span>
                  <span className="font-light text-muted-foreground/80">&amp;</span>
                  <span className="font-semibold" style={{ color: '#006699' }}>IBM</span>
                </span>
              </p>
              
              <p className="flex flex-wrap items-baseline justify-center lg:justify-start gap-x-1 sm:gap-x-2 text-sm sm:text-lg text-muted-foreground/80">
                <span className="font-medium">MS in Applied Data Science at</span>
                <span className="font-semibold" style={{ color: '#800000' }}>University of Chicago</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Skill Plexus */}
          <motion.div
            className="relative order-2 lg:order-2 flex flex-col items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SkillPlexus setSelectedExpertise={setSelectedExpertise} />
            {/* Subtle instruction line */}
            <div className="mt-4">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.p 
                  className="text-xs sm:text-sm font-medium tracking-wide relative z-10"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(139, 92, 246, 0), 0 0 0px rgba(139, 92, 246, 0)",
                      "0 0 8px rgba(139, 92, 246, 0.6), 0 0 16px rgba(139, 92, 246, 0.4)",
                      "0 0 0px rgba(139, 92, 246, 0), 0 0 0px rgba(139, 92, 246, 0)"
                    ],
                    scale: [1, 1.02, 1],
                    y: [0, -2, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-primary/70">Filter portfolio by <span className="font-semibold text-primary">Expertise</span></span>
                </motion.p>
                {/* Glow effect behind text */}
                <motion.div 
                  className="absolute inset-0 blur-sm"
                  animate={{ 
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full"></div>
                </motion.div>
                {/* Additional floating particles */}
                <motion.div
                  className="absolute -top-2 -left-2 w-1 h-1 bg-primary/40 rounded-full"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <motion.div
                  className="absolute -top-1 -right-2 w-1 h-1 bg-secondary/40 rounded-full"
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 