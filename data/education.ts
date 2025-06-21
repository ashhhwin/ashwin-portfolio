export interface Education {
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  location: string;
  logo?: string;
}

export const education: Education[] = [
  {
    degree: "MS Applied Data Science",
    institution: "University of Chicago",
    period: "Aug 2024 – Dec 2025",
    gpa: "3.90/4.00",
    location: "Chicago, IL",
    logo: "/uchicago-logo.svg"
  },
  {
    degree: "B.Tech Computer Science & Engineering (AI/ML)",
    institution: "SRM Institute of Science and Technology",
    period: "Aug 2020 – May 2024",
    gpa: "3.91/4.00",
    location: "Chennai, India"
  }
]; 