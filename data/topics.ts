import { projects } from "./projects";
import { experience } from "./experience";

interface Topic {
  title: string;
  keywords: string[];
  projectCount?: number;
  experienceCount?: number;
}

const topicsData: Topic[] = [
    { title: "Machine Learning & Forecasting", keywords: ["Machine Learning", "Forecasting", "Time Series", "XGBoost", "Deep Learning", "Predictive Modeling", "Data Science"] },
    { title: "Finance & Signal Modeling", keywords: ["Finance", "Signal Processing", "Quantitative Analysis", "Algorithmic Trading", "Risk Management"] },
    { title: "Healthcare & Clinical AI", keywords: ["Healthcare", "SHAP", "Cox Proportional Hazards", "Patient Engagement", "ROI Analysis", "Healthcare AI", "Medical Imaging", "Diabetic Retinopathy"] },
    { title: "Retail & Consumer Intelligence", keywords: ["Retail Analytics", "Customer Analytics", "Segmentation", "Retention", "Market Basket Analysis"] },
    { title: "NLP & Engagement AI", keywords: ["NLP", "Transformers", "GenAI", "Conversational AI", "Sentiment Analysis", "AI/ML"] },
    { title: "Computer Vision Systems", keywords: ["Computer Vision", "OpenCV", "YOLOv5", "Monocular Vision", "Autonomous Vehicles"] },
    { title: "Real-Time AI & Ops Monitoring", keywords: ["Real-time Processing", "Real-time", "Anomaly Detection", "Apache Spark", "ETL", "Monitoring", "Dashboard", "Time Series"] },
];

export const topics = topicsData.map(topic => {
  const projectCount = projects.filter(p => {
    const projectText = `${p.title} ${p.description} ${p.technologies.join(" ")} ${p.category}`.toLowerCase();
    return topic.keywords.some(keyword => projectText.includes(keyword.toLowerCase()));
  }).length;

  const experienceCount = experience.filter(e => {
    const experienceText = `${e.role} ${e.company} ${e.highlights.join(" ")} ${e.technologies.join(" ")}`.toLowerCase();
    return topic.keywords.some(keyword => experienceText.includes(keyword.toLowerCase()));
  }).length;

  return { ...topic, projectCount, experienceCount };
}); 