export interface Project {
  id: number;
  name: string;
  description: string;
  photos: string[]; // Array of photo URLs
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
    photos: ["/studies/02/01.jpg"]
  },
];
