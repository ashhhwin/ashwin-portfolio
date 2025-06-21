import { projects } from "./projects";
import { experience } from "./experience";

interface Topic {
  title: string;
  keywords: string[];
  projectCount?: number;
  experienceCount?: number;
}

const topicsData: Topic[] = [
    { 
      title: "Machine Learning & Forecasting", 
      keywords: ["Machine Learning", "XGBoost", "Deep Learning", "Predictive Modeling", "Forecasting", "Time Series", "Segmentation", "Retention"] 
    },
    { 
      title: "Finance & Signal Modeling", 
      keywords: ["Capital Markets", "Financial", "Option Flow", "Alpha Signal", "Backtesting", "Stock Analysis"] 
    },
    { 
      title: "Healthcare & Clinical AI", 
      keywords: ["Healthcare", "SHAP", "Cox Proportional Hazards", "Patient Engagement", "ROI Analysis", "Diabetic Retinopathy", "Clinical Trial", "Medical Imaging"] 
    },
    { 
      title: "Retail & Consumer Intelligence", 
      keywords: ["Customer Analytics", "Segmentation", "Retention", "Market Basket", "Demand Shock", "SKU", "Retail"] 
    },
    { 
      title: "NLP & Engagement AI", 
      keywords: ["NLP", "Transformers", "GenAI", "Conversational AI", "Sentiment Analysis", "Multi-agent", "Bayesian Statistics"] 
    },
    { 
      title: "Computer Vision Systems", 
      keywords: ["Computer Vision", "Monocular Vision", "Depth Estimation", "OpenCV", "Autonomous Vehicles", "ADAS"] 
    },
    { 
      title: "Real-Time AI & Ops Monitoring", 
      keywords: ["Real-time", "Event-Driven", "ETL", "Data Engineering", "Streaming", "Monitoring", "Dashboard"] 
    },
];

export const topics = topicsData.map(topic => {
  const projectCount = projects.filter(p => {
    const projectText = `${p.title} ${p.description} ${p.technologies.join(" ")} ${p.category} ${p.highlights?.join(" ") || ""}`.toLowerCase();
    return topic.keywords.some(keyword => projectText.includes(keyword.toLowerCase()));
  }).length;

  const experienceCount = experience.filter(e => {
    const experienceText = `${e.role} ${e.company} ${e.description} ${e.highlights.join(" ")} ${e.technologies.join(" ")}`.toLowerCase();
    return topic.keywords.some(keyword => experienceText.includes(keyword.toLowerCase()));
  }).length;

  return { ...topic, projectCount, experienceCount };
}); 