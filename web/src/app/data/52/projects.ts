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
    name: "Spotify, play next",
    description:
      "Redesigning and coding a fix to my biggest Spotify pet peeve: the queue.",
    photos: ["/studies/52/01/Cover.jpg"],
  },
  {
    id: 2,
    name: "Introducing Product & 52",
    description:
      "Testing the trend of vibe coding while focusing on my product sense to create the best case study website.",
    photos: ["/studies/02/01.jpg"],
    comingSoon: true,
  },
  {
    id: 3,
    name: "Junior Seminar",
    description:
      "Crafting a homemade font, website, and visual identity for my junior seminar's exhibition.",
    photos: ["/studies/03/01.jpg"],
    comingSoon: true,
  },
];
