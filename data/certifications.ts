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
    year: "2025",
    logo: "/logos/google-logo.svg.webp",
    url: "https://www.coursera.org/account/accomplishments/certificate/example"
  },
  {
    name: "IBM AI Engineering",
    issuer: "IBM",
    year: "2025",
    logo: "/logos/ibm-logo.png",
    url: "https://www.coursera.org/account/accomplishments/certificate/example"
  },
  {
    name: "NVIDIA Deep Learning",
    issuer: "NVIDIA",
    year: "2023",
    logo: "/logos/nvidia-logo.png",
    url: "https://courses.nvidia.com/certificates/example"
  },
  {
    name: "Microsoft Azure Data Fundamentals",
    issuer: "Microsoft",
    year: "2023",
    logo: "/logos/microsoft-logo.svg",
    url: "https://www.credly.com/badges/example"
  }
]; 