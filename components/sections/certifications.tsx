"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { certifications } from "@/data/certifications"
import { Award, ExternalLink } from "lucide-react"
import Image from "next/image"

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
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -5, boxShadow: "0px 8px 20px hsla(var(--primary), 0.2)" }}
                className={`group p-6 rounded-xl border border-primary/20 bg-primary/5 ${cert.url ? 'cursor-pointer' : ''}`}
                onClick={() => cert.url && window.open(cert.url, '_blank', 'noopener,noreferrer')}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {cert.logo ? (
                      <Image
                        src={cert.logo}
                        alt={`${cert.issuer} logo`}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                        <Award className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-foreground">
                      {cert.name}
                    </h3>
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