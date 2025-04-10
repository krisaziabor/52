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
    photos: ["/studies/product/01/FidelityCover.jpg"],
    passwordProtected: true,
  },
  {
    id: 2,
    name: "Design at Yale (DAY)",
    description:
      "September 2024 – present. Leading Yale’s design studio and community.",
    photos: ["/studies/product/02/AlternateCover-DAY.jpg"], // Using an existing photo
  },
  {
    id: 3,
    name: "LinkUs",
    description: "A radically new way to browse the web and the world.",
    photos: ["/studies/product/03/Linkus-Cover.jpg"], // Using an existing photo
  },
  {
    id: 4,
    name: "cyclio: a retrospective",
    description: "cyclio attempted to revolutionize menstrual health with acupressure and yoga. While the startup's chapter came to an end last year, I want to reflect on & return to my past internship work & revamp the app interfaces to create the most frictionless and welcoming experience.",
    photos: ["/studies/01/01.jpg"], // Using an existing photo
    comingSoon: true,
  }
];
