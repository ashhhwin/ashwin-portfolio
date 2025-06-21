export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
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
    duration: "3 months",
    location: "Dayton, OH",
    description: "Building scalable data pipelines and ML models for capital markets, focusing on real-time stock analysis and option flow signals.",
    highlights: [
      "Enterprise ETL pipelines for 9,000+ global equities with financial ontology frameworks",
      "NLP sentiment extraction from premium publications for alpha signal enhancement",
      "Option flow analytics and directional signal detection for portfolio optimization"
    ],
    technologies: ["GCP", "Machine Learning", "Backtesting", "ETL/Data Engineering", "Real-time Streaming"],
    website: "https://evoketechnologies.com",
    logo: "/logos/evoke_technologies_logo.jpeg"
  },
  {
    id: "argonne",
    company: "Argonne National Laboratory",
    role: "Capstone Researcher",
    period: "04/2025 – Present",
    duration: "9 months",
    location: "Chicago, IL",
    description: "Researching computer vision solutions for connected autonomous vehicles, focusing on safety and energy efficiency.",
    highlights: [
      "Monocular depth estimation for autonomous vehicles with sub-10% error rates",
      "Computer vision algorithms for safety-critical ADAS applications",
      "Research contributions to energy-efficient autonomous navigation systems"
    ],
    technologies: ["Computer Vision", "PyTorch", "OpenCV", "Deep Learning", "Autonomous Vehicles", "Research & Development"],
    website: "https://www.anl.gov",
    logo: "/logos/argonne_national_laboratory.jpg"
  },
  {
    id: "prodapt",
    company: "Prodapt Solutions",
    role: "Data Science Intern",
    period: "03/2024 – 07/2024",
    duration: "4 months",
    location: "Chennai, India",
    description: "Developed real-time anomaly detection systems and monitoring dashboards for enterprise clients.",
    highlights: [
      "Real-time anomaly detection pipeline processing 36k events/hour with drift monitoring",
      "ML model performance tracking and automated alerting systems",
      "Interactive dashboards for enterprise-scale operational intelligence"
    ],
    technologies: ["Python", "Real-time Processing", "Anomaly Detection", "MLOps", "Monitoring & Alerting", "Data Engineering"],
    website: "https://prodapt.com",
    logo: "/logos/Prodapt-logo.jpeg"
  },
  {
    id: "aspire",
    company: "Aspire Systems",
    role: "Data Scientist Intern",
    period: "06/2022 – 09/2022",
    duration: "4 months",
    location: "Chennai, India",
    description: "Implemented computer vision solutions for retail analytics using YOLOv5 for shelf monitoring.",
    highlights: [
      "YOLOv5-based shelf void detection with real-time alerting systems",
      "Computer vision pipeline for retail inventory optimization",
      "15% improvement in product availability through automated monitoring"
    ],
    technologies: ["Computer Vision", "YOLOv5", "Python", "Retail Analytics", "Real-time Alerting", "Deep Learning"],
    website: "https://aspiresys.com",
    logo: "/logos/aspire-logo.png"
  }
]; 