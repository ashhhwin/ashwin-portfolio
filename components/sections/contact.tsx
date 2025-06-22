"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, Linkedin, Github } from "lucide-react"
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

  return (
    <section id="contact" ref={ref} className="py-24 bg-transparent">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading with engaging subtext */}
          <motion.div 
            className="mb-12"
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Let's Connect
            </h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mt-6 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
            </p>
          </motion.div>

          {/* Contact links */}
          <motion.div 
            className="flex justify-center items-center gap-4 md:gap-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            {/* Email */}
            <motion.div variants={itemVariants}>
              <Button 
                asChild 
                size="lg"
                className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
              >
                <a href="mailto:ashwinram@uchicago.edu" className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email
                </a>
              </Button>
            </motion.div>

            {/* LinkedIn */}
            <motion.div variants={itemVariants}>
              <Button 
                asChild
                size="lg" 
                className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
              >
                <a 
                  href="https://www.linkedin.com/in/ashwinramv/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>
            </motion.div>

            {/* GitHub */}
            <motion.div variants={itemVariants}>
               <Button 
                asChild 
                size="lg"
                className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
              >
                <a 
                  href="https://github.com/ashwinramesh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 