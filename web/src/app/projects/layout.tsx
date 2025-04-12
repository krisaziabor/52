import type { Metadata } from "next";
import { ContentProvider } from "../context/ContentContext";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Case Studies | Kris Aziabor",
  description: "Product design portfolio and 52-week project case studies.",
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContentProvider>
      <div className="min-h-screen">
        <div className="px-4 pt-8 sm:px-8 lg:px-20">
          <Navbar />
        </div>
        {children}
      </div>
    </ContentProvider>
  );
}