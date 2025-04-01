import type { Metadata } from "next";
import Footer from "../footer";
import { ContentProvider } from "../context/ContentContext";

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
        {children}
        <Footer />
      </div>
    </ContentProvider>
  );
}