export interface Project {
  id: number;
  name: string;
  description: string;
  photos: string[]; // Array of photo URLs
  comingSoon?: boolean; // Optional flag to mark as coming soon
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Spotify, play next",
    description: "Redesigning and coding a fix to my biggest Spotify pet peeve: the queue.",
    photos: ["/studies/01/01.jpg"]
  },
  {
    id: 2,
    name: "Introducing 52",
    description: "After creating the first of the 52 projects, I designated the week to designing & coding its home on the web.",
    photos: ["/studies/02/01.jpg"],
    comingSoon: true
  },
  {
    id: 3,
    name: "Eagle",
    description: "Using the Eagle API to convert my visual inspiration archive into a publicly accessible database.",
    photos: ["/studies/01/01.jpg"], // Using an existing photo
    comingSoon: true
  },
];
