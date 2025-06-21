export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  description: string[];
  highlights: string[];
  technologies: string[];
  website?: string;
  logo?: string;
}

export const experience: Experience[] = [
  {
    id: "evoke",
    company: "Evoke Technologies",
    role: "Data Science Intern (Capital Markets) – AI & Financial Research",
    period: "June 2025 – Present",
    duration: "3 months",
    location: "Dayton, Ohio",
    description: [
      "Develop scalable ETL pipelines to ingest and orchestrate OHLCV data, EPS, and revenue forecasts for 9,000+ global stocks and ETFs, incorporating a financial domain ontology to standardize & unify diverse data types across equities and derivatives",
      "Apply NLP techniques to extract and quantify sentiment signals from premium financial publications, integrating sentiment scores with structured alternative datasets to enhance alpha generation and signal modeling",
      "Develop predictive models to analyze option flow and detect directional trading signals, contributing to portfolio optimization, risk-adjusted returns, and data-driven strategy design"
    ],
    highlights: [
      "Enterprise ETL pipelines for 9,000+ global equities with financial ontology frameworks",
      "NLP sentiment extraction from premium publications for alpha signal enhancement",
      "Option flow analytics and directional signal detection for portfolio optimization"
    ],
    technologies: ["GCP", "Machine Learning", "Backtesting", "ETL/Data Engineering", "Real-time Streaming"],
    logo: "/images/evoke_technologies_logo.png"
  },
  {
    id: "argonne",
    company: "Argonne National Laboratory",
    role: "Capstone Researcher – Connected & Automated Vehicles (Part Time Capstone)",
    period: "April 2025 - Present",
    duration: "9 months",
    location: "Chicago, IL",
    description: [
      "Working with Argonne's Connected and Automated Vehicles (CAV) group on developing a monocular vision-based system to estimate lead vehicle distance, targeting a sub-10% error tolerance under varied real-world driving scenarios",
      "Aligning technical outcomes with project priorities focused on road safety, energy efficiency, and PII compliance to support future deployment in sensor-constrained environments"
    ],
    highlights: [
      "Monocular depth estimation for autonomous vehicles with sub-10% error rates",
      "Computer vision algorithms for safety-critical ADAS applications",
      "Research contributions to energy-efficient autonomous navigation systems"
    ],
    technologies: ["Computer Vision", "PyTorch", "OpenCV", "Deep Learning", "Autonomous Vehicles", "Research & Development"],
    logo: "/images/argonne_national_laboratory.png"
  },
  {
    id: "prodapt",
    company: "Prodapt Solutions",
    role: "Data Science Intern – Delivery",
    period: "Mar 2024 – July 2024",
    duration: "5 months",
    location: "Chennai, India",
    description: [
      "Built a real-time network anomaly detection pipeline processing 36K+ events/hour, combining Isolation Forest, DBSCAN, and Autoencoders to achieve 92% precision and 89% recall, significantly improving threat detection accuracy",
      "Design model monitoring pipelines with statistical performance tracking, KL-divergence for input drift, and confidence-based alerts to detect concept drift and initiate automated retraining",
      "Developed a dashboard to visualize anomalies and trigger real-time alerts, streamlining triage and improving response time"
    ],
    highlights: [
      "Real-time network anomaly detection with 92% precision and 89% recall",
      "Model monitoring pipelines with drift detection and automated retraining",
      "Real-time anomaly visualization dashboard for improved response time"
    ],
    technologies: ["Python", "Machine Learning", "Isolation Forest", "DBSCAN", "Autoencoders", "KL-divergence", "Real-time Monitoring"],
    logo: "/images/Prodapt-logo.png"
  },
  {
    id: "aspire",
    company: "Aspire Systems",
    role: "Data Scientist Intern – Delivery",
    period: "June 2022 – Sept 2022",
    duration: "4 months",
    location: "Chennai, India",
    description: [
      "Trained a YOLOv5-based deep learning model for shelf void detection using a manually curated and augmented image dataset, achieving high-precision identification of understocked zones in real-time retail environments",
      "Deployed a real-time monitoring system that alerts managers to low stock, improving on-shelf availability by 15%",
      "Implemented a data-driven product recommendation system using market basket analysis on 1M+ retail transactions, optimizing restocking strategies and boosting cross-category revenue by over 20%"
    ],
    highlights: [
      "YOLOv5-based shelf void detection for real-time retail monitoring",
      "Real-time stock monitoring system improving availability by 15%",
      "Market basket analysis on 1M+ transactions boosting revenue by 20%"
    ],
    technologies: ["YOLOv5", "Deep Learning", "Computer Vision", "Market Basket Analysis", "Real-time Monitoring", "Retail Analytics"],
    logo: "/images/aspire-logo.png"
  }
]; 