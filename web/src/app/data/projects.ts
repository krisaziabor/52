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
    photos: ["/studies/01/01.jpg"],
  },
  {
    id: 2,
    name: "Introducing 52",
    description:
      "Can I build a site in only a weekend? Testing the trend of vibe coding while focusing on my product sense to create the best case study website.",
    photos: ["/studies/02/01.jpg"],
    comingSoon: true,
  },
  {
    id: 3,
    name: "Eagle",
    description:
      "Using the Eagle API to convert my visual inspiration archive into a publicly accessible database.",
    photos: ["/studies/01/01.jpg"], // Using an existing photo
    comingSoon: true,
  },
];
