"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { experience } from "@/data/experience"
import { Calendar, MapPin, CheckCircle, Briefcase } from "lucide-react"

// This needs to be kept in sync with the topics in hero.tsx
const topics = [
  { title: "AI/ML", keywords: ["AI/ML", "Machine Learning", "GenAI", "Deep Learning", "NLP", "Forecasting", "Bayesian Statistics", "XGBoost", "Transformers", "Scikit-learn", "TensorFlow"] },
  { title: "Data Engineering", keywords: ["ETL", "Apache Spark", "Real-time Processing", "Data Pipelines"] },
  { title: "NLP", keywords: ["NLP", "Transformers", "Conversational AI"] },
  { title: "Computer Vision", keywords: ["Computer Vision", "OpenCV", "YOLOv5", "Autonomous Vehicles"] },
  { title: "Time Series", keywords: ["Time Series", "Forecasting", "Anomaly Detection"] },
  { title: "Cloud & DevOps", keywords: ["AWS", "CI/CD", "Docker"] }
];

interface ExperienceProps {
  selectedExpertise: string | null;
}

export function Experience({ selectedExpertise }: ExperienceProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const filteredExperience = selectedExpertise
    ? experience.filter(exp => {
        const matchingTopic = topics.find(t => t.title === selectedExpertise);
        if (!matchingTopic) return true; // Should not happen
        // Check if any of the experience's technologies are in the topic's keywords
        return exp.technologies.some(tech => matchingTopic.keywords.includes(tech));
      })
    : experience;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.1,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      } 
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.1
      }
    }
  };

  return (
    <section id="experience" ref={ref} className="py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Professional Journey
            </h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mt-6 max-w-2xl mx-auto">
              My journey across different industries and challenges.
            </p>
          </motion.div>

          <motion.div 
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* The timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border"></div>

            {filteredExperience.map((job, index) => (
              <motion.div 
                key={job.id} 
                className="mb-12 relative"
                variants={itemVariants}
              >
                <div className="flex md:items-center">
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute top-5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <div className="md:hidden absolute top-0 left-0 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>

                  {/* Content */}
                  <div className={`w-full pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:float-left' : 'md:float-right'}`}>
                      <h3 className="text-2xl font-semibold text-primary mb-2">{job.role}</h3>
                      <p className="text-lg font-medium text-foreground mb-2">{job.company}</p>
                      <div className={`flex items-center gap-4 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                          <span className="flex items-center gap-2"><Calendar size={16}/> {job.duration}</span>
                          <span className="flex items-center gap-2"><MapPin size={16}/> Remote</span>
                      </div>
                      
                      <ul className="space-y-3 text-left">
                        {job.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start text-muted-foreground">
                            <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        {job.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 