/**
 * Tripadvisor Trophies Data
 * Static structured dataset for high-performance server-side rendering
 * Zero client bundle impact.
 */

export interface TripadvisorTrophy {
  id: string;
  year: string;
  title: string;
  description: string;
  stars: number;
  rating: string;
  icon: string;
}

export const TRIPADVISOR_TROPHIES: TripadvisorTrophy[] = [
  {
    id: "tc-2025",
    year: "2025",
    title: "Travelers' Choice",
    description: "Top 10% worldwide",
    stars: 5,
    rating: "5.0",
    icon: "/icons/tripadvisor-travelers-choice.svg"
  },
  {
    id: "tc-2024",
    year: "2024",
    title: "Travelers' Choice",
    description: "Consistently excellent",
    stars: 5,
    rating: "5.0",
    icon: "/icons/tripadvisor-travelers-choice.svg"
  },
  {
    id: "coe-2023",
    year: "2023",
    title: "Certificate of Excellence",
    description: "Superior service",
    stars: 5,
    rating: "4.95",
    icon: "/icons/certificate-of-excellence.svg"
  },
  {
    id: "coe-2022",
    year: "2022",
    title: "Certificate of Excellence",
    description: "Top Rated Tours",
    stars: 5,
    rating: "4.93",
    icon: "/icons/top-rated-award.svg"
  }
];

