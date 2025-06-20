"use client"

import { Button } from "@/components/ui/button"
import { Download, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { random, range } from "@/lib/utils"
import { useRandomInterval } from "@/lib/hooks"

const topics = [
  { title: "AI/ML", keywords: ["AI/ML", "Machine Learning", "GenAI", "Deep Learning", "NLP", "Forecasting", "Bayesian Statistics"] },
  { title: "Data Engineering", keywords: ["ETL", "Apache Spark", "Real-time Processing", "Data Pipelines"] },
  { title: "NLP", keywords: ["NLP", "Transformers", "Conversational AI"] },
  { title: "Computer Vision", keywords: ["Computer Vision", "OpenCV", "YOLOv5"] },
  { title: "Time Series", keywords: ["Time Series", "Forecasting", "Anomaly Detection"] },
  { title: "Cloud & DevOps", keywords: ["AWS", "CI/CD", "Docker"] }
];

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

const SkillPlexus = ({ setSelectedExpertise }: { setSelectedExpertise: (expertise: string | null) => void }) => {
  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState(() => {
    const seed = 12345;
    return topics.map((_, i) => {
      const x = 20 + ((seed + i * 7) % 60);
      const y = 20 + ((seed + i * 11) % 60);
      return {
        x, y,
        vx: ((seed + i * 13) % 10 - 5) * 0.1,
        vy: ((seed + i * 17) % 10 - 5) * 0.1,
      };
    });
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setPositions(prev => prev.map(pos => {
        let newX = pos.x + pos.vx;
        let newY = pos.y + pos.vy;
        let newVx = pos.vx;
        let newVy = pos.vy;

        if (newX < 10 || newX > 90) { newVx = -newVx; newX = newX < 10 ? 10 : 90; }
        if (newY < 10 || newY > 90) { newVy = -newVy; newY = newY < 10 ? 10 : 90; }

        return { x: newX, y: newY, vx: newVx, vy: newVy };
      }));
    }, 50);
    return () => clearInterval(interval);
  }, [mounted]);

  const handleTopicClick = (topicTitle: string) => {
    setSelectedExpertise(topicTitle);
    const element = document.getElementById("experience");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return <div className="relative w-full h-[600px] lg:h-[700px] overflow-hidden"><div className="absolute inset-0 bg-grid-pattern opacity-20"></div></div>;
  }

  return (
    <div className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {positions.map((pos1, i) =>
          positions.slice(i + 1).map((pos2, j) => {
            const distance = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
            if (distance < 45) { // Increased connection distance
              const opacity = Math.max(0.1, 1 - distance / 45);
              return (
                <line
                  key={`${i}-${j + i + 1}`}
                  x1={`${pos1.x}%`} y1={`${pos1.y}%`}
                  x2={`${pos2.x}%`} y2={`${pos2.y}%`}
                  stroke="url(#gradient)" strokeWidth="1" opacity={opacity}
                />
              );
            }
            return null;
          })
        )}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
      </svg>
      {positions.map((pos, index) => (
        <div
          key={topics[index].title}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 hover:z-10"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          onClick={() => handleTopicClick(topics[index].title)}
        >
          <div className="text-xl font-medium text-foreground/80 hover:text-primary transition-colors duration-300 px-3 py-1">
            {topics[index].title}
          </div>
        </div>
      ))}
    </div>
  );
};

export function Hero({ setSelectedExpertise }: { setSelectedExpertise: (expertise: string | null) => void }) {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStep(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {/* LED indicator */}
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-sm text-primary/90 font-medium tracking-wide">
                Open to opportunities
              </span>
            </motion.div>
            <motion.h1 
              className="text-5xl lg:text-7xl font-medium text-foreground tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hey, I'm Ashwin
            </motion.h1>
            <motion.p 
              className="text-xl lg:text-2xl text-muted-foreground font-light mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              GOOGLE AND IBM CERTIFIED DATA SCIENTIST AND AI ENGINEER.
            </motion.p>
            <motion.p 
              className="text-lg text-muted-foreground/80 font-light mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              MS in Applied Data Science at University of Chicago
            </motion.p>
          </motion.div>

          {/* Skill Plexus */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SkillPlexus setSelectedExpertise={setSelectedExpertise} />
          </motion.div>
        </div>
      </div>
    </section>
  )
} 