"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { experience } from "@/data/experience"
import { Calendar, MapPin, CheckCircle, Briefcase, Building2 } from "lucide-react"

// This needs to be kept in sync with the topics in hero.tsx
const topics = [
  { title: "AI/ML", keywords: ["AI/ML", "Machine Learning", "GenAI", "Deep Learning", "NLP", "Forecasting", "Bayesian Statistics", "XGBoost", "Transformers", "Scikit-learn", "TensorFlow"] },
  { title: "Data Engineering", keywords: ["ETL", "Apache Spark", "Real-time Processing", "Data Pipelines"] },
  { title: "NLP", keywords: ["NLP", "Transformers", "Conversational AI", "Sentiment Analysis"] },
  { title: "Computer Vision", keywords: ["Computer Vision", "OpenCV", "YOLO", "Deep Learning"] },
  { title: "Healthcare AI", keywords: ["Healthcare", "Clinical Trials", "Medical AI", "ROI Modeling"] },
  { title: "Finance & Trading", keywords: ["Finance", "Trading", "Capital Markets", "Backtesting", "Option Flow"] },
  { title: "Retail & Consumer", keywords: ["Retail", "Consumer Intelligence", "Customer Segmentation", "Demand Forecasting"] },
  { title: "Real-time Systems", keywords: ["Real-time", "Streaming", "Monitoring", "Anomaly Detection"] }
];

interface ExperienceProps {
  selectedExpertise: string | null;
}

const CompanyLogo = ({ logo, company }: { logo?: string; company: string }) => {
  const [imageError, setImageError] = useState(false);

  // Debug logging
  console.log(`CompanyLogo: ${company}, logo path: ${logo}`);

  if (!logo || imageError) {
    console.log(`CompanyLogo: Using fallback for ${company}`);
    return (
      <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Building2 className="w-6 h-6 text-primary" />
      </div>
    );
  }

  return (
    <motion.div 
      className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center overflow-hidden"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img
        src={logo}
        alt={`${company} logo`}
        className="w-full h-full object-contain"
        onError={(e) => {
          console.error(`Failed to load image for ${company}:`, logo, e);
          setImageError(true);
        }}
        onLoad={() => {
          console.log(`Successfully loaded image for ${company}:`, logo);
        }}
      />
    </motion.div>
  );
};

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
    <section id="experience" ref={ref} className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Professional Journey
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed mt-4 sm:mt-6 max-w-2xl mx-auto">
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
            <div className="absolute left-4 md:left-8 lg:left-1/2 top-0 h-full w-0.5 bg-border"></div>

            {filteredExperience.map((job, index) => (
              <motion.div 
                key={job.id} 
                className="mb-8 sm:mb-12 relative"
                variants={itemVariants}
              >
                <div className="flex md:items-center">
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex absolute top-5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <div className="md:hidden lg:hidden absolute top-0 left-0 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <div className="hidden md:flex lg:hidden absolute top-5 left-8 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>

                  {/* Content */}
                  <div className={`w-full pl-12 md:pl-16 lg:pl-0 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:float-left' : 'lg:float-right'}`}>
                      <div className={`flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        <CompanyLogo logo={job.logo} company={job.company} />
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-primary leading-tight">{job.role}</h3>
                          <div className="flex items-center gap-2">
                            {job.website ? (
                              <a
                                href={job.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base sm:text-lg font-medium text-foreground hover:text-primary transition-colors"
                              >
                                {job.company}
                              </a>
                            ) : (
                              <p className="text-base sm:text-lg font-medium text-foreground">{job.company}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                          <span className="flex items-center gap-1 sm:gap-2"><Calendar size={14} className="sm:w-4 sm:h-4"/> {job.duration}</span>
                          <span className="flex items-center gap-1 sm:gap-2"><MapPin size={14} className="sm:w-4 sm:h-4"/> {job.location}</span>
                      </div>
                      
                      <ul className="space-y-2 sm:space-y-3 text-left">
                        {job.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start text-muted-foreground text-sm sm:text-base">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className={`flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        {job.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 sm:px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
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