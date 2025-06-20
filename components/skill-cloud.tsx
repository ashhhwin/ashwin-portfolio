"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { skills } from "@/data/skills"
import { experience } from "@/data/experience"

interface SkillNode {
  id: string
  name: string
  category: string
  x: number
  y: number
  size: number
  experience: string[]
}

export function SkillCloud() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [skillNodes, setSkillNodes] = useState<SkillNode[]>([])

  useEffect(() => {
    // Create skill nodes from all skills
    const allSkills: SkillNode[] = []
    
    Object.entries(skills).forEach(([category, skillList]) => {
      skillList.forEach((skill, index) => {
        const node: SkillNode = {
          id: `${category}-${index}`,
          name: skill,
          category,
          x: Math.random() * 80 + 10, // 10-90% of container
          y: Math.random() * 80 + 10,
          size: Math.random() * 20 + 20, // 20-40px
          experience: experience
            .filter(exp => exp.highlights.some(h => h.toLowerCase().includes(skill.toLowerCase().split(' ')[0])))
            .map(exp => `${exp.role} at ${exp.company}`)
        }
        allSkills.push(node)
      })
    })
    
    setSkillNodes(allSkills)
  }, [])

  const handleSkillClick = (skillId: string) => {
    const skill = skillNodes.find(node => node.id === skillId)
    if (skill && skill.experience.length > 0) {
      // Scroll to experience section
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full h-96 skill-cloud-bg rounded-3xl overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Skill nodes */}
      {skillNodes.map((node) => (
        <motion.div
          key={node.id}
          className="skill-node"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            fontSize: `${Math.max(10, node.size * 0.3)}px`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: [0, -5, 0],
          }}
          transition={{
            duration: 0.5,
            delay: Math.random() * 0.5,
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
          onHoverStart={() => setHoveredSkill(node.id)}
          onHoverEnd={() => setHoveredSkill(null)}
          onClick={() => handleSkillClick(node.id)}
          whileHover={{ 
            scale: 1.2,
            zIndex: 10,
          }}
        >
          <div className="flex items-center justify-center w-full h-full text-center leading-tight">
            {node.name.split(' ')[0]}
          </div>
        </motion.div>
      ))}

      {/* Hover tooltip */}
      {hoveredSkill && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute z-20 bg-card border border-border rounded-xl p-4 shadow-xl max-w-xs"
          style={{
            left: `${skillNodes.find(n => n.id === hoveredSkill)?.x || 50}%`,
            top: `${(skillNodes.find(n => n.id === hoveredSkill)?.y || 50) - 10}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <h4 className="font-semibold text-primary mb-2">
            {skillNodes.find(n => n.id === hoveredSkill)?.name}
          </h4>
          {skillNodes.find(n => n.id === hoveredSkill)?.experience.length ? (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Experience:</p>
              <ul className="text-xs space-y-1">
                {skillNodes.find(n => n.id === hoveredSkill)?.experience.slice(0, 2).map((exp, i) => (
                  <li key={i} className="text-muted-foreground">• {exp}</li>
                ))}
              </ul>
              <p className="text-xs text-primary mt-2 cursor-pointer">
                Click to see more →
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Core skill in my toolkit
            </p>
          )}
        </motion.div>
      )}

      {/* Category labels */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-muted-foreground">
        <span>Programming & DB</span>
        <span>Cloud & Big Data</span>
        <span>Visualization</span>
        <span>Optimization</span>
      </div>
    </div>
  )
} 