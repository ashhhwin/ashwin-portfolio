export interface Certification {
  name: string;
  issuer: string;
  year: string;
  logo?: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    name: "Google Advanced Data Analytics",
    issuer: "Google",
    year: "2024"
  },
  {
    name: "IBM AI Engineering",
    issuer: "IBM",
    year: "2024"
  },
  {
    name: "NVIDIA Deep Learning",
    issuer: "NVIDIA",
    year: "2023"
  },
  {
    name: "Microsoft Azure Data Fundamentals",
    issuer: "Microsoft",
    year: "2023"
  }
]; 