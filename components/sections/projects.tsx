"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { projects, Project as ProjectType } from "@/data/projects"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"

// This needs to be kept in sync with the topics in hero.tsx
const topics = [
  { title: "AI/ML", keywords: ["AI/ML", "Machine Learning", "GenAI", "Deep Learning", "NLP", "Forecasting", "Bayesian Statistics", "XGBoost", "Transformers", "Scikit-learn", "TensorFlow"] },
  { title: "Data Engineering", keywords: ["ETL", "Apache Spark", "Real-time Processing", "Data Pipelines"] },
  { title: "NLP", keywords: ["NLP", "Transformers", "Conversational AI"] },
  { title: "Computer Vision", keywords: ["Computer Vision", "OpenCV", "YOLOv5", "Autonomous Vehicles"] },
  { title: "Time Series", keywords: ["Time Series", "Forecasting", "Anomaly Detection"] },
  { title: "Cloud & DevOps", keywords: ["AWS", "CI/CD", "Docker"] }
];

interface ProjectsProps {
  selectedExpertise: string | null;
}

export function Projects({ selectedExpertise }: ProjectsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const filteredProjects = selectedExpertise
    ? projects.filter(project => {
        const matchingTopic = topics.find(t => t.title === selectedExpertise);
        if (!matchingTopic) return true;
        // Check if any of the project's technologies or category match the topic's keywords
        return project.technologies.some(tech => matchingTopic.keywords.includes(tech)) || matchingTopic.keywords.includes(project.category);
      })
    : projects;
    
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
    <section id="projects" ref={ref} className="py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mt-6 max-w-2xl mx-auto">
              A showcase of my technical expertise and problem-solving approach.
            </p>
          </motion.div>

          <motion.div 
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group grid md:grid-cols-12 gap-8 items-center"
              >
                {/* Text Content */}
                <div className="md:col-span-7 space-y-4">
                  <p className="text-primary font-medium">{project.category}</p>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="md:col-span-5 flex md:justify-end space-x-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-primary/10"
                    >
                      <Github className="h-5 w-5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-primary/10"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center mt-16"
          >
            <a
              href="https://github.com/ashwinramv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 text-primary hover:text-primary/80 font-medium transition-colors text-lg"
            >
              <span>View more on GitHub</span>
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 