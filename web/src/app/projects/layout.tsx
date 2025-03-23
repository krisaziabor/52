import type { Metadata } from "next";
import Footer from "../footer";

export const metadata: Metadata = {
  title: "52 | KAKA",
  description: "A new project every week.",
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