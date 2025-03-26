export interface Project {
  id: number;
  name: string;
  description: string;
  photos: string[]; // Array of photo URLs
  comingSoon?: boolean; // Optional flag to mark as coming soon
  passwordProtected?: boolean; // Optional flag to mark as password protected
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Fidelity Investments",
    description:
      "Ushering in a new era of secure file transferring as a full-stack engineering intern at Fidelity Investments.",
    photos: ["/studies/02/01.jpg"],
    passwordProtected: true,
  },
  {
    id: 2,
    name: "Design at Yale (DAY)",
    description:
      "September 2024 – present. Leading Yale’s design studio and community.",
    photos: ["/studies/01/01.jpg"], // Using an existing photo
  },
  {
    id: 3,
    name: "LinkUs",
    description: "A radically new way to browse the web and the world.",
    photos: ["/studies/01/01.jpg"], // Using an existing photo
  },
  {
    id: 4,
    name: "cyclio: a retrospective",
    description: "cyclio attempted to revolutionize menstrual health with acupressure and yoga. While it's chapter closed last year, I want to reflecting on my beautiful Berlin summer interning there & revamp the app interfaces to create the most frictionless experience for users.",
    photos: ["/studies/01/01.jpg"], // Using an existing photo
    comingSoon: true,
  }
];
