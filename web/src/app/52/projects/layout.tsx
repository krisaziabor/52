import type { Metadata } from "next";
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: "52 | Kris Aziabor",
  description: "A new project every week for 52 weeks.",
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <div className="px-4 pt-8 sm:px-8 lg:px-20">
        <Navbar />
      </div>
      {children}
    </div>
  );
}