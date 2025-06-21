"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { skills } from "@/data/skills"
import { experience } from "@/data/experience"
import { projects } from "@/data/projects"

interface SkillNode {
  id: string
  name: string
  category: string
  x: number
  y: number
  size: number
  experience: string[]
  projects: string[]
}

export function SkillCloud() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [skillNodes, setSkillNodes] = useState<SkillNode[]>([])

  useEffect(() => {
    // Create skill nodes from all skills
    const allSkills: SkillNode[] = []
    
    // Define specific skill mappings for better matching
    const skillMappings: Record<string, string[]> = {
      'Bayesian Statistics': ['bayesian', 'bayes', 'statistics', 'uncertainty', 'mcdropout', 'monte carlo'],
      'Deep Learning': ['deep learning', 'neural', 'cnn', 'pytorch', 'tensorflow', 'machine learning'],
      'Machine Learning': ['machine learning', 'ml', 'xgboost', 'predictive', 'modeling'],
      'Computer Vision': ['computer vision', 'vision', 'opencv', 'monocular', 'autonomous'],
      'NLP': ['nlp', 'natural language', 'transformers', 'sentiment', 'conversational'],
      'Time Series': ['time series', 'forecasting', 'demand', 'real-time', 'event-driven'],
      'Healthcare': ['healthcare', 'clinical', 'medical', 'patient', 'diabetic', 'retinopathy'],
      'Python': ['python', 'pandas', 'numpy', 'scikit', 'mlflow'],
      'GCP': ['gcp', 'google cloud', 'cloud', 'bigquery'],
      'AWS': ['aws', 'amazon', 'cloud', 'emr'],
      'Docker': ['docker', 'containerization', 'deployment'],
      'SQL': ['sql', 'database', 'query', 'data'],
      'Spark': ['spark', 'apache spark', 'big data', 'distributed'],
      'Tableau': ['tableau', 'visualization', 'dashboard', 'bi'],
      'Power BI': ['power bi', 'bi', 'business intelligence', 'dashboard'],
      'A/B Testing': ['a/b testing', 'ab testing', 'experimentation', 'optimization'],
      'Causal Inference': ['causal', 'inference', 'uplift', 'impact'],
      'GANs': ['gan', 'generative', 'adversarial', 'diffusion'],
      'Transformers': ['transformer', 'attention', 'bert', 'gpt'],
      'XGBoost': ['xgboost', 'gradient boosting', 'ensemble'],
      'SHAP': ['shap', 'interpretability', 'explainability'],
      'Cox Proportional Hazards': ['cox', 'proportional hazards', 'survival analysis'],
      'Customer Analytics': ['customer', 'analytics', 'segmentation', 'retention'],
      'Real-time': ['real-time', 'realtime', 'streaming', 'live'],
      'Event-Driven': ['event-driven', 'event driven', 'events', 'streaming'],
      'Forecasting': ['forecasting', 'prediction', 'forecast', 'demand'],
      'Medical Imaging': ['medical imaging', 'imaging', 'medical', 'diabetic retinopathy'],
      'Diabetic Retinopathy': ['diabetic retinopathy', 'retinopathy', 'medical imaging', 'healthcare'],
      'Bayesian Deep Learning': ['bayesian deep learning', 'bayesian', 'deep learning', 'uncertainty'],
      'Monte Carlo': ['monte carlo', 'monte', 'carlo', 'simulation', 'uncertainty'],
      'MCDropout': ['mcdropout', 'monte carlo dropout', 'dropout', 'uncertainty'],
      'Blitz': ['blitz', 'bayesian', 'pytorch'],
      'Diffusion': ['diffusion', 'generative', 'gan'],
    }
    
    Object.entries(skills).forEach(([category, skillList]) => {
      skillList.forEach((skill, index) => {
        // Extract key terms from skill for matching - more comprehensive
        let skillTerms = skill.toLowerCase()
          .split(/[,\s()]+/)
          .filter(term => term.length > 2)
          .concat([
            // Add common variations and synonyms
            skill.toLowerCase().replace(/[^a-z]/g, ''), // Remove special chars
            ...skill.toLowerCase().split(' ').filter(word => word.length > 3), // Individual words
          ])
          .filter((term, index, arr) => arr.indexOf(term) === index) // Remove duplicates
        
        // Add specific mappings for this skill
        const specificMappings = skillMappings[skill] || []
        skillTerms = [...skillTerms, ...specificMappings]
        
        // Match experience with more flexible matching
        const matchingExperience = experience
          .filter(exp => {
            const expText = `${exp.role} ${exp.company} ${exp.highlights.join(' ')}`.toLowerCase()
            return skillTerms.some(term => expText.includes(term))
          })
          .map(exp => `${exp.role} at ${exp.company}`)
        
        // Match projects with more flexible matching
        const matchingProjects = projects
          .filter(project => {
            const projectText = `${project.title} ${project.description} ${project.technologies.join(' ')} ${project.category}`.toLowerCase()
            return skillTerms.some(term => projectText.includes(term))
          })
          .map(project => project.title)
        
        // Debug logging
        console.log(`Skill: ${skill}`)
        console.log(`  Terms: ${skillTerms.join(', ')}`)
        console.log(`  Experience matches: ${matchingExperience.length} - ${matchingExperience.join(', ')}`)
        console.log(`  Project matches: ${matchingProjects.length} - ${matchingProjects.join(', ')}`)
        
        const node: SkillNode = {
          id: `${category}-${index}`,
          name: skill,
          category,
          x: Math.random() * 80 + 10, // 10-90% of container
          y: Math.random() * 80 + 10,
          size: Math.random() * 20 + 20, // 20-40px
          experience: matchingExperience,
          projects: matchingProjects
        }
        allSkills.push(node)
      })
    })
    
    setSkillNodes(allSkills)
  }, [])

  const handleSkillClick = (skillId: string) => {
    const skill = skillNodes.find(node => node.id === skillId)
    if (skill && (skill.experience.length > 0 || skill.projects.length > 0)) {
      // Scroll to experience section if there's experience, otherwise to projects
      if (skill.experience.length > 0) {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
      } else if (skill.projects.length > 0) {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      }
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
          className={`skill-node relative ${node.experience.length > 0 || node.projects.length > 0 ? 'has-matches' : ''}`}
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
          
          {/* Visual indicator for matches */}
          {(node.experience.length > 0 || node.projects.length > 0) && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
          )}
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
          {(() => {
            const skill = skillNodes.find(n => n.id === hoveredSkill)
            if (!skill) return null
            
            return (
              <div>
                {skill.experience.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground mb-2">
                      Experience ({skill.experience.length}):
                    </p>
                    <ul className="text-xs space-y-1">
                      {skill.experience.slice(0, 2).map((exp, i) => (
                        <li key={i} className="text-muted-foreground">• {exp}</li>
                      ))}
                      {skill.experience.length > 2 && (
                        <li className="text-xs text-primary">+{skill.experience.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                )}
                
                {skill.projects.length > 0 && (
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Projects ({skill.projects.length}):
                    </p>
                    <ul className="text-xs space-y-1">
                      {skill.projects.slice(0, 2).map((project, i) => (
                        <li key={i} className="text-muted-foreground">• {project}</li>
                      ))}
                      {skill.projects.length > 2 && (
                        <li className="text-xs text-primary">+{skill.projects.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                )}
                
                {(skill.experience.length > 0 || skill.projects.length > 0) && (
                  <p className="text-xs text-primary mt-2 cursor-pointer">
                    Click to see more →
                  </p>
                )}
                
                {skill.experience.length === 0 && skill.projects.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Core skill in my toolkit
                  </p>
                )}
              </div>
            )
          })()}
        </motion.div>
      )}

      {/* Category labels */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-muted-foreground">
        <span>Programming & DB</span>
        <span>Cloud & Big Data</span>
        <span>Visualization</span>
        <span>AI/ML</span>
        <span>Healthcare</span>
        <span>Time Series</span>
        <span>Optimization</span>
      </div>
    </div>
  )
} 