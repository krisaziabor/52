export interface Project {
  id: number;
  name: string;
  description: string;
  photos: string[]; // Array of photo URLs
  videoCover?: {
    vimeoId: string;
    autoplay?: boolean;
    muted?: boolean;
  }; // Optional video cover
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
    name: "No Idea If This Is Bad Or Not",
    description:
      "Crafting a homemade font, website, and visual identity for my junior seminar's exhibition.",
    photos: ["/studies/03/01.jpg"],
    comingSoon: true,
  },
  {
    id: 4,
    name: "For Jasmine Ross & Beauty Plus",
    description:
      "Making a website for my friend Jasmine as a gift for her photo thesis show <3",
    photos: ["/studies/52/04/Cover5.jpg"],
  },
];
