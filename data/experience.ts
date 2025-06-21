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
    logo: "/images/evoke_technologies_logo.png"
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
    logo: "/images/argonne_national_laboratory.png"
  },
  {
    id: "prodapt",
    company: "Prodapt",
    role: "Data Scientist Intern",
    period: "01/2025 – 05/2025",
    duration: "5 months",
    location: "Chennai, India",
    description: "Developed conversational AI solutions and customer segmentation models for enterprise clients.",
    highlights: [
      "Built conversational impact analyzer with 85% accuracy for customer sentiment analysis",
      "Implemented customer segmentation model improving retention by 23%",
      "Created automated reporting dashboards reducing manual work by 60%"
    ],
    technologies: ["Python", "Machine Learning", "NLP", "SQL", "Tableau"],
    logo: "/images/Prodapt-logo.png"
  },
  {
    id: "aspire",
    company: "Aspire Systems",
    role: "Data Science Intern",
    period: "05/2024 – 08/2024",
    duration: "4 months",
    location: "Chennai, India",
    description: "Developed healthcare AI models and demand forecasting solutions for retail clients.",
    highlights: [
      "Built healthcare outreach ROI model with 92% prediction accuracy",
      "Developed event-driven demand shock forecaster for retail optimization",
      "Created automated data pipelines processing 10M+ records daily"
    ],
    technologies: ["Python", "Machine Learning", "Time Series", "ETL", "Power BI"],
    logo: "/images/aspire-logo.png"
  }
]; 