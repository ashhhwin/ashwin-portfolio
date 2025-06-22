"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X, Download, Eye } from "lucide-react"
import { Button } from "./ui/button"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
]

interface NavigationProps {
  onShowEducation?: () => void;
}

export function Navigation({ onShowEducation }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const handleEducationClick = () => {
    // Dispatch custom event to show education
    window.dispatchEvent(new CustomEvent('showEducation'));
    if (onShowEducation) {
      onShowEducation()
    }
    scrollToSection("#education")
  }

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Ashwin_Ram_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleResumeView = () => {
    window.open('/resume.pdf', '_blank');
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/20 dark:bg-black/20 backdrop-blur-sm border-b border-white/10 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Left Side */}
          <div className="flex-1 flex items-center">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <a href="#home" className="text-xl font-bold gradient-text">
                  AR
                </a>
              </motion.div>
              
              <div className="hidden sm:flex items-center">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 font-medium text-sm text-primary shadow-sm hover:bg-primary/20 transition-colors duration-200"
                  style={{ fontSize: '0.95rem' }}
                >
                  <Download className="w-4 h-4" />
                  Resume
                </a>
              </div>
            </div>
          </div>

          {/* Centered Desktop Navigation */}
          <div className="flex-1 justify-center hidden md:flex">
            <div className="flex items-baseline md:space-x-2 lg:space-x-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => 
                    item.name === "Education" 
                      ? handleEducationClick() 
                      : scrollToSection(item.href)
                  }
                  className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Side: Theme Toggle & Mobile Menu */}
          <div className="flex-1 flex justify-end items-center">
            <div className="hidden md:block">
                <ThemeToggle />
            </div>
            
            <div className="md:hidden flex items-center space-x-2">
                <ThemeToggle />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Mobile Resume Button */}
              <div className="flex px-3 py-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 font-medium text-sm text-primary shadow-sm hover:bg-primary/20 transition-colors duration-200 w-full justify-center"
                  style={{ fontSize: '0.95rem' }}
                >
                  <Download className="w-4 h-4" />
                  Resume
                </a>
              </div>
              
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => 
                    item.name === "Education" 
                      ? handleEducationClick() 
                      : scrollToSection(item.href)
                  }
                  className="text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 