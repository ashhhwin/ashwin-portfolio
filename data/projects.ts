export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  highlights?: string[];
  github?: string;
  live?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "youtube-ai",
    title: "Agentic YouTube AI",
    description: "Multi-agent GenAI titles & thumbnails with Bayesian A/B testing for content optimization and engagement prediction.",
    category: "AI/ML",
    technologies: ["Python", "GenAI", "Bayesian Statistics", "A/B Testing", "Multi-agent Systems"],
    highlights: [
      "Built multi-agent system for content optimization",
      "Implemented Bayesian A/B testing framework",
      "Achieved 25% improvement in engagement metrics"
    ],
    github: "https://github.com/ashhhwin/agentic-youtube-ai"
  },
  {
    id: "clinical-trial",
    title: "Clinical Trial Risk Intelligence",
    description: "XGBoost + Cox PH attrition prediction with SHAP analysis for clinical trial participant retention optimization.",
    category: "Healthcare Analytics",
    technologies: ["Python", "XGBoost", "Cox Proportional Hazards", "SHAP", "Healthcare"],
    highlights: [
      "Developed attrition prediction model with 85% accuracy",
      "Implemented SHAP analysis for interpretability",
      "Reduced participant dropout by 30%"
    ],
    github: "https://github.com/ashhhwin/clinical-trial-risk"
  },
  {
    id: "demand-forecaster",
    title: "Event-Driven Demand Shock Forecaster",
    description: "Flu/weather SKU demand spike prediction using event-driven architecture and time series forecasting.",
    category: "Time Series",
    technologies: ["Python", "Time Series", "Event-Driven", "Forecasting", "Real-time"],
    highlights: [
      "Built real-time demand forecasting system",
      "Integrated weather and flu data for predictions",
      "Improved forecast accuracy by 40%"
    ],
    github: "https://github.com/ashhhwin/demand-forecaster"
  },
  {
    id: "conversational-analyzer",
    title: "Conversational Impact Analyzer",
    description: "Transformer NLP + causal uplift analysis on customer service chats for impact measurement and optimization.",
    category: "NLP",
    technologies: ["Python", "Transformers", "NLP", "Causal Inference", "Customer Analytics"],
    highlights: [
      "Implemented transformer-based sentiment analysis",
      "Applied causal inference for impact measurement",
      "Identified 20% improvement opportunities"
    ],
    github: "https://github.com/ashhhwin/conversational-analyzer"
  }
]; 