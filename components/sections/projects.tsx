"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { projects, Project as ProjectType } from "@/data/projects"
import { experience } from "@/data/experience"
import { topics } from "@/data/topics"
import { ExternalLink, Github, ArrowUpRight, X, Building2, Folder } from "lucide-react"

interface ProjectsProps {
  selectedExpertise: string | null;
  onClearFilter: () => void;
}

export function Projects({ selectedExpertise, onClearFilter }: ProjectsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const filteredProjects = selectedExpertise
    ? projects.filter(project => {
        const matchingTopic = topics.find(t => t.title === selectedExpertise);
        if (!matchingTopic) return true;
        
        const projectText = `${project.title} ${project.description} ${project.technologies.join(" ")} ${project.category} ${project.highlights?.join(" ") || ""}`.toLowerCase();
        return matchingTopic.keywords.some(keyword => projectText.includes(keyword.toLowerCase()));
      })
    : projects;

  const relatedExperience = selectedExpertise
    ? experience.filter(exp => {
        const matchingTopic = topics.find(t => t.title === selectedExpertise);
        if (!matchingTopic) return false;
        
        const experienceText = `${exp.role} ${exp.company} ${exp.description} ${exp.highlights.join(" ")} ${exp.technologies.join(" ")}`.toLowerCase();
        return matchingTopic.keywords.some(keyword => experienceText.includes(keyword.toLowerCase()));
      })
    : [];
    
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
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
            {selectedExpertise && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
                <button
                  onClick={onClearFilter}
                  className="flex items-center gap-2 mx-auto px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Showing projects for: <strong>{selectedExpertise}</strong>. Clear filter?</span>
                </button>
                {relatedExperience.length > 0 && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4 text-blue-500" />
                    <span>Related work experience: {relatedExperience.map(exp => exp.company).join(", ")}</span>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0px 8px 20px hsla(var(--primary), 0.2)" }}
                className="group flex flex-col bg-primary/5 border border-primary/20 rounded-xl overflow-hidden"
              >
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Folder className="h-5 w-5 text-primary" />
                      <p className="text-primary font-medium">{project.category}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mt-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mt-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                        {tech}
                      </span>
                    ))}
                  </div>
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