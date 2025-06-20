"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Github, Send, Check } from "lucide-react"

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/ashwinramv",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      url: "https://github.com/ashhhwin",
      icon: Github,
    },
    {
      name: "Email",
      url: "mailto:ashwin.ram@uchicago.edu",
      icon: Mail,
    }
  ]

  return (
    <section id="contact" ref={ref} className="py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Let's Connect
            </h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mt-6 max-w-2xl mx-auto">
              Ready to collaborate? Let's discuss how we can work together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all" required />
                    <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all" required />
                  </div>
                  <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all" required />
                  <textarea placeholder="Message" rows={5} className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" required />
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4 py-12">
                  <motion.div initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} className="w-20 h-20 mx-auto rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <Check className="h-10 w-10 text-primary" />
                  </motion.div>
                  <h4 className="text-2xl font-semibold text-foreground">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    I'll get back to you as soon as possible.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
                <h3 className="text-2xl font-semibold text-foreground">Get in Touch</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm always open to discussing new opportunities or collaborating on interesting projects. Feel free to reach out.
                </p>
                <div className="space-y-3">
                  <p className="flex items-center gap-3 font-medium text-foreground"><Mail className="text-primary"/> ashwin.ram@uchicago.edu</p>
                  <p className="flex items-center gap-3 font-medium text-foreground"><Linkedin className="text-primary"/> /in/ashwinramv</p>
                  <p className="flex items-center gap-3 font-medium text-foreground"><Github className="text-primary"/> /ashhhwin</p>
                </div>
                <div className="flex space-x-4 pt-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-primary/10 border border-primary/20 text-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                    >
                      <link.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 