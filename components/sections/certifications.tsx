"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { certifications } from "@/data/certifications"
import { Award, ExternalLink } from "lucide-react"

export function Certifications() {
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

  return (
    <section id="certifications" ref={ref} className="py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Certifications
            </h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mt-6 max-w-2xl mx-auto">
              Professional certifications that validate my expertise.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
                className={`group p-6 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 ${cert.url ? 'cursor-pointer' : ''}`}
                onClick={() => cert.url && window.open(cert.url, '_blank', 'noopener,noreferrer')}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-background border border-border rounded-lg flex items-center justify-center overflow-hidden">
                    {cert.logo ? (
                      <img
                        src={cert.logo}
                        alt={`${cert.issuer} logo`}
                        className="object-contain w-8 h-8"
                      />
                    ) : (
                      <Award className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {cert.name}
                      </h3>
                      {cert.url && (
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 