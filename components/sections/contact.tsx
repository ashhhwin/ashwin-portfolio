"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, Linkedin, Github, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };

  const buttonVariants = {
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

  const socialVariants = {
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
    <section id="contact" ref={ref} className="py-16 sm:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading with engaging subtext */}
          <motion.div 
            className="mb-8 sm:mb-12"
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Let's Connect
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed mt-4 sm:mt-6 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
            </p>
          </motion.div>

          {/* Call-to-action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 sm:mt-12"
            variants={buttonVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <a
              href="mailto:ashwin.ram@uchicago.edu"
              className="group flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              Get In Touch
            </a>
            
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-border hover:border-primary bg-background/50 backdrop-blur-sm rounded-lg hover:bg-primary/5 transition-all duration-300 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              View Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div 
            className="flex justify-center items-center gap-6 sm:gap-8 mt-8 sm:mt-12"
            variants={socialVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <a
              href="https://github.com/ashhhwin"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 sm:p-4 bg-muted/50 hover:bg-primary/10 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            
            <a
              href="https://www.linkedin.com/in/ashwinramv/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 sm:p-4 bg-muted/50 hover:bg-primary/10 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 