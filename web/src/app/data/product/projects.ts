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
      "Ushering in a new era of secure file transferring as a full-stack engineering intern.",
    photos: ["/studies/product/01/FidelityCover.jpg"],
    passwordProtected: true,
  },
  {
    id: 2,
    name: "Design at Yale",
    description:
      "Leading Yale’s undergrad design studio and community.",
    photos: ["/studies/product/02/DAYCover1.jpg"], // Using an existing photo
  },
  {
    id: 3,
    name: "LinkUs",
    description: "Introducing a radically visual way to browse media, the web, and the world.",
    photos: ["/studies/product/03/Linkus-Cover-2.jpg"], // Using an existing photo
  },
  {
    id: 4,
    name: "cyclio: a retrospective",
    description: "Revamping the design of a startup that dreamed of revolutionizing menstrual health with acupressure and yoga.",
    photos: ["/studies/01/01.jpg"], // Using an existing photo
    comingSoon: true,
  }
];
