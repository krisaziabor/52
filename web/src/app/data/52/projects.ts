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
      "Can I build a site in only a weekend? Testing the trend of vibe coding while focusing on my product sense to create the best case study website.",
    photos: ["/studies/02/01.jpg"],
    comingSoon: true,
  },
  {
    id: 3,
    name: "Artist Readers",
    description:
      "A project for my Junior Seminar, where I make a collection of inspirations. I am loving this run of constantly making websites, and I am taking the project to the web as well as producing a physical text.",
    photos: ["/studies/03/01.jpg"],
    comingSoon: true,
  },
];
