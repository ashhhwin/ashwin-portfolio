export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  description: string;
  highlights: string[];
  technologies: string[];
  website?: string;
  logo?: string;
}

export const experience: Experience[] = [
  {
    id: "evoke",
    company: "Evoke Technologies",
    role: "Data Science Intern (Capital Markets)",
    period: "06/2025 – Present",
    duration: "6 months",
    description: "Building scalable data pipelines and ML models for capital markets, focusing on real-time stock analysis and option flow signals.",
    highlights: [
      "Scalable ETL for 9,000+ stocks & ETFs",
      "NLP sentiment fusion",
      "Option-flow signal models"
    ],
    technologies: ["Python", "AWS", "Apache Spark", "NLP", "Machine Learning", "ETL", "Real-time Processing"],
    website: "https://evoketechnologies.com",
    logo: "/logos/evoke_technologies_logo.jpeg"
  },
  {
    id: "argonne",
    company: "Argonne National Laboratory",
    role: "Capstone Researcher",
    period: "04/2025 – Present",
    duration: "8 months",
    description: "Researching computer vision solutions for connected autonomous vehicles, focusing on safety and energy efficiency.",
    highlights: [
      "Monocular vision CAV distance estimation with <10% error",
      "Safety/energy focus"
    ],
    technologies: ["Computer Vision", "Python", "OpenCV", "Deep Learning", "Autonomous Vehicles", "Research"],
    website: "https://www.anl.gov",
    logo: "/logos/argonne-logo.png"
  },
  {
    id: "prodapt",
    company: "Prodapt Solutions",
    role: "Data Science Intern",
    period: "03/2024 – 07/2024",
    duration: "4 months",
    description: "Developed real-time anomaly detection systems and monitoring dashboards for enterprise clients.",
    highlights: [
      "Real-time anomaly pipeline (36k events/hr)",
      "Drift monitoring",
      "Dashboard development"
    ],
    technologies: ["Python", "Real-time Processing", "Anomaly Detection", "Dashboard", "Monitoring", "ETL"],
    website: "https://prodapt.com",
    logo: "/logos/Prodapt-logo-scaled.jpg"
  },
  {
    id: "aspire",
    company: "Aspire Systems",
    role: "Data Scientist Intern",
    period: "06/2022 – 09/2022",
    duration: "3 months",
    description: "Implemented computer vision solutions for retail analytics using YOLOv5 for shelf monitoring.",
    highlights: [
      "YOLOv5 shelf-void detection",
      "Real-time alerting",
      "15% availability boost"
    ],
    technologies: ["Computer Vision", "YOLOv5", "Python", "Retail Analytics", "Real-time Alerting", "Deep Learning"],
    website: "https://aspiresys.com",
    logo: "/logos/aspire-logo.png"
  }
]; 