"use client"

import { Button } from "@/components/ui/button"
import { Briefcase, Download, FolderKanban, FolderOpen, Mail, Building2 } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { random, range } from "@/lib/utils"
import { useRandomInterval } from "@/lib/hooks"
import { projects } from "@/data/projects"
import { experience } from "@/data/experience"

const topics = [
  { title: "Machine Learning & Forecasting", keywords: ["Machine Learning", "Forecasting", "Time Series", "Predictive Modeling", "XGBoost", "TensorFlow", "Scikit-learn", "AI/ML"] },
  { title: "Finance & Signal Modeling", keywords: ["Finance", "Signal Processing", "Quantitative Analysis", "Algorithmic Trading", "Risk Management"] },
  { title: "Healthcare & Clinical AI", keywords: ["Healthcare", "Clinical AI", "Medical Imaging", "Genomics", "Predictive Diagnostics", "SHAP", "Cox Proportional Hazards"] },
  { title: "Retail & Consumer Intelligence", keywords: ["Retail", "Consumer Behavior", "Recommendation Engines", "Customer Segmentation", "Market Basket Analysis"] },
  { title: "NLP & Engagement AI", keywords: ["NLP", "Transformers", "Conversational AI", "Chatbots", "Sentiment Analysis"] },
  { title: "Computer Vision Systems", keywords: ["Computer Vision", "OpenCV", "YOLO", "Image Recognition", "Object Detection", "Autonomous Vehicles"] },
  { title: "Real-Time AI & Ops Monitoring", keywords: ["Real-Time AI", "Anomaly Detection", "Streaming Data", "Kafka", "Apache Spark", "CI/CD", "Docker", "Real-time Processing"] },
].map(topic => {
  const projectCount = projects.filter(p => 
    p.technologies.some(tech => topic.keywords.includes(tech)) || topic.keywords.includes(p.category)
  ).length;

  const experienceCount = experience.filter(e =>
    e.technologies.some(tech => topic.keywords.includes(tech))
  ).length;

  return { ...topic, projectCount, experienceCount };
});

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
      const x = 20 + ((seed + i * 7) % 60);
      const y = 20 + ((seed + i * 11) % 60);
      return {
        x, y,
        vx: ((seed + i * 13) % 10 - 5) * 0.08, // Increased speed to restore animation
        vy: ((seed + i * 17) % 10 - 5) * 0.08, // Increased speed to restore animation
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

          // Add a gentle gravitational pull towards the vertical center (50%)
          const verticalCenter = 50;
          const centeringStrength = 0.0001; // Reduced for a much subtler pull
          newVy += (verticalCenter - pos.y) * centeringStrength;

          if (newX < 20 || newX > 80) { newVx = -newVx; newX = newX < 20 ? 20 : 80; } // Increased horizontal margin
          if (newY < 10 || newY > 90) { newVy = -newVy; newY = newY < 10 ? 10 : 90; } // Increased top margin

          return { ...pos, x: newX, y: newY, vx: newVx, vy: newVy };
        });

        // Add repulsion logic to prevent node overlap
        for (let i = 0; i < newPositions.length; i++) {
          for (let j = i + 1; j < newPositions.length; j++) {
            const node1 = newPositions[i];
            const node2 = newPositions[j];
            const dx = node2.x - node1.x;
            const dy = node2.y - node1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = 40; // Increased repulsion distance

            if (distance < minDistance) {
              const overlap = minDistance - distance;
              const angle = Math.atan2(dy, dx);
              
              const moveX = Math.cos(angle) * overlap / 2;
              const moveY = Math.sin(angle) * overlap / 2;

              newPositions[i].x -= moveX;
              newPositions[i].y -= moveY;
              newPositions[j].x += moveX;
              newPositions[j].y += moveY;
            }
          }
        }
        
        return newPositions;
      });
    }, 70);
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
    return <div className="relative w-full h-[700px] lg:h-[800px] overflow-hidden"><div className="absolute inset-0 bg-grid-pattern opacity-20"></div></div>;
  }

  return (
    <div className="relative w-full h-[700px] lg:h-[800px] overflow-hidden">
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
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => handleTopicClick(topic.title)}
            onMouseEnter={() => setHoveredTopic(topic.title)}
            onMouseLeave={() => setHoveredTopic(null)}
          >
            <div className="text-center">
              <div className="text-base font-medium text-foreground/80 hover:text-primary transition-colors duration-300 px-3 py-1">
                {topic.title}
              </div>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex items-center gap-3 bg-background/90 backdrop-blur-sm border border-primary/20 rounded-lg px-3 py-2 shadow-lg"
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
              className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm"
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
              className="text-5xl lg:text-7xl font-heading font-light text-foreground tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hey, I'm <span className="font-semibold gradient-text">Ashwin</span>
            </motion.h1>
            
            <motion.div 
              className="space-y-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-3 text-lg text-muted-foreground">
                <GlowText text="Building depth estimation for ADAS" />
                <span className="hidden sm:inline text-muted-foreground/50">@</span>
                <span className="text-primary font-medium">Argonne National Laboratory</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-2 text-lg text-muted-foreground/80">
                <span className="font-medium">Certified in Data Science &amp; AI Engineering by{' '}
                  <span className="font-semibold">
                    <span style={{ color: '#4285F4' }}>G</span>
                    <span style={{ color: '#EA4335' }}>o</span>
                    <span style={{ color: '#FBBC05' }}>o</span>
                    <span style={{ color: '#4285F4' }}>g</span>
                    <span style={{ color: '#34A853' }}>l</span>
                    <span style={{ color: '#EA4335' }}>e</span>
                  </span>
                </span>
                <span className="font-light text-muted-foreground/80">&amp;</span>
                <span className="font-semibold" style={{ color: '#006699' }}>IBM</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-2 text-lg text-muted-foreground/80">
                <span className="font-medium">MS in Applied Data Science at</span>
                <span className="font-semibold" style={{ color: '#800000' }}>University of Chicago</span>
              </div>
            </motion.div>
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