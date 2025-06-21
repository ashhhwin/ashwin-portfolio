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
    technologies: ["GenAI", "Bayesian Statistics", "A/B Testing", "Multi-agent Systems"],
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
    category: "Healthcare AI",
    technologies: ["XGBoost", "Cox Proportional Hazards", "SHAP", "Healthcare"],
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
    technologies: ["Time Series", "Event-Driven", "Forecasting", "Real-time"],
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
    technologies: ["Transformers", "NLP", "Causal Inference", "Customer Analytics"],
    highlights: [
      "Implemented transformer-based sentiment analysis",
      "Applied causal inference for impact measurement",
      "Identified 20% improvement opportunities"
    ],
    github: "https://github.com/ashhhwin/conversational-analyzer"
  },
  {
    id: "customer-segmentation",
    title: "Customer Segmentation & Retention Insights Platform",
    description: "Advanced customer segmentation and retention prediction using machine learning and behavioral analytics.",
    category: "Data Science",
    technologies: ["Machine Learning", "Customer Analytics", "Segmentation", "Retention"],
    highlights: [
      "Developed customer segmentation models",
      "Built retention prediction algorithms",
      "Improved customer lifetime value by 35%"
    ]
  },
  {
    id: "healthcare-outreach",
    title: "Healthcare Outreach ROI Model",
    description: "Causal inference model for healthcare outreach effectiveness and patient engagement optimization.",
    category: "Healthcare AI",
    technologies: ["Causal Inference", "Healthcare", "ROI Analysis", "Patient Engagement"],
    highlights: [
      "Applied causal inference for outreach effectiveness",
      "Optimized patient engagement strategies",
      "Increased outreach ROI by 45%"
    ]
  },
  {
    id: "argonne-capstone",
    title: "Argonne National Lab Capstone – Monocular Vehicle Distance Estimation",
    description: "Computer vision system for monocular depth estimation in autonomous vehicle applications.",
    category: "Computer Vision",
    technologies: ["Computer Vision", "Monocular Vision", "Deep Learning"],
    highlights: [
      "Developed monocular depth estimation model",
      "Applied computer vision for autonomous systems",
      "Achieved state-of-the-art accuracy in distance estimation"
    ]
  },
  {
    id: "diabetic-retinopathy",
    title: "Bayesian Deep Learning for Diabetic Retinopathy",
    description: "Bayesian CNN to classify retinal images with uncertainty-aware predictions. The model uses Monte Carlo Dropout to generate multiple predictions per image, allowing for uncertainty estimation.",
    category: "Healthcare AI",
    technologies: ["CNN", "Blitz", "GANs", "MCDropout", "Bayesian Deep Learning"],
    highlights: [
      "Implemented Bayesian CNN with uncertainty quantification",
      "Applied Monte Carlo Dropout for robust predictions",
      "Developed uncertainty-aware medical image classification"
    ]
  }
]; 