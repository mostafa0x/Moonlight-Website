/**
 * Tripadvisor Trophies Data
 * Static structured dataset for high-performance server-side rendering
 * Zero client bundle impact.
 */

export interface TripadvisorTrophy {
  id: string;
  year: string;
  title: string;
  icon: string;
}

export const TRIPADVISOR_TROPHIES: TripadvisorTrophy[] = [
  {
    id: "tc-2025",
    year: "2025",
    title: "Travelers' Choice",
    icon: "/icons/tripadvisor-travelers-choice.svg"
  },
  {
    id: "tc-2024",
    year: "2024",
    title: "Travelers' Choice",
    icon: "/icons/tripadvisor-travelers-choice.svg"
  },
  {
    id: "coe-2023",
    year: "2023",
    title: "Certificate of Excellence",
    icon: "/icons/certificate-of-excellence.svg"
  },
  {
    id: "coe-2022",
    year: "2022",
    title: "Certificate of Excellence",
    icon: "/icons/top-rated-award.svg"
  }
];

