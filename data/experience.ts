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
    logo: "/images/evoke_technologies_logo.png"
  },
  {
    id: "prodapt",
    company: "Prodapt",
    role: "Data Science Intern",
    period: "01/2025 – 05/2025",
    duration: "5 months",
    location: "Chennai, India",
    description: "Developed machine learning models for customer segmentation and retention analysis, improving business insights and decision-making processes.",
    highlights: [
      "Built predictive models for customer churn analysis with 85% accuracy",
      "Implemented automated data pipelines reducing processing time by 60%",
      "Created interactive dashboards for real-time business intelligence"
    ],
    technologies: ["Python", "Machine Learning", "Data Analysis", "SQL", "Tableau"],
    logo: "/images/Prodapt-logo.png"
  },
  {
    id: "aspire",
    company: "Aspire Systems",
    role: "Data Scientist Intern",
    period: "06/2024 – 12/2024",
    duration: "6 months",
    location: "Chennai, India",
    description: "Focused on retail analytics and consumer behavior modeling, developing solutions for customer segmentation and market trend analysis.",
    highlights: [
      "Developed customer segmentation models using clustering algorithms",
      "Analyzed market trends and consumer behavior patterns",
      "Created automated reporting systems for business stakeholders"
    ],
    technologies: ["Python", "R", "Machine Learning", "Statistical Analysis", "Power BI"],
    logo: "/images/aspire-logo.png"
  },
  {
    id: "argonne",
    company: "Argonne National Laboratory",
    role: "Capstone Researcher",
    period: "01/2024 – 05/2024",
    duration: "5 months",
    location: "Chicago, IL",
    description: "Conducted research on computer vision applications for autonomous vehicle systems, focusing on monocular depth estimation and object detection.",
    highlights: [
      "Implemented monocular vehicle distance estimation using deep learning",
      "Achieved 92% accuracy in vehicle detection and distance prediction",
      "Published research findings in computer vision applications"
    ],
    technologies: ["Computer Vision", "Deep Learning", "Python", "OpenCV", "PyTorch"],
    logo: "/images/argonne_national_laboratory.png"
  }
]; 