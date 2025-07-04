"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { education } from "@/data/education"
import { School, Calendar, MapPin, Award } from "lucide-react"

interface EducationProps {
  show?: boolean;
}

export function Education({ show = false }: EducationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      } 
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.1
      }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.section 
          id="education" 
          ref={ref} 
          className="py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                variants={headerVariants}
                className="text-center mb-12"
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                  Education
                </h2>
                <p className="text-xl text-muted-foreground font-light leading-relaxed mt-6 max-w-2xl mx-auto">
                  My academic journey and qualifications.
                </p>
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                className="space-y-8"
              >
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.institution}
                    variants={itemVariants}
                    whileHover={{ y: -5, boxShadow: "0px 8px 20px hsla(var(--primary), 0.2)" }}
                    className="group relative p-8 rounded-xl border border-primary/20 bg-primary/5"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                        {edu.logo ? (
                          <img
                            src={edu.logo}
                            alt={`${edu.institution} logo`}
                            className="object-contain w-10 h-10"
                          />
                        ) : (
                          <School className="w-8 h-8 text-primary" />
                        )}
                      </div>
                      <div className="flex-grow space-y-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
                          <h3 className="font-semibold text-2xl text-foreground group-hover:text-primary transition-colors">
                            {edu.degree}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{edu.period}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg text-muted-foreground font-medium">{edu.institution}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{edu.location}</span>
                          </div>
                          {edu.gpa && (
                            <div className="flex items-center gap-2 text-sm text-primary font-medium">
                              <Award className="w-4 h-4" />
                              <span>GPA: {edu.gpa}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
} 