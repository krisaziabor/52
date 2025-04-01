import type { Metadata } from "next";
import Footer from "../../footer";

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
      {children}
      <Footer />
    </div>
  );
}