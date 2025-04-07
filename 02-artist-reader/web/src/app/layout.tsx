import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ScriptProvider } from "./context/ScriptContext";
import "./globals.css";
import localFont from 'next/font/local';

// Local fonts from the fonts directory
const diatypeRegular = localFont({
  src: '../../fonts/ABCDiatypeEdu-Regular.otf',
  variable: '--font-diatype',
});

const diatypeBold = localFont({
  src: '../../fonts/ABCDiatypeEdu-Bold.otf',
  variable: '--font-diatype-bold',
});

const diatypeMono = localFont({
  src: '../../fonts/ABCDiatypeMonoEdu-Regular.otf',
  variable: '--font-diatype-mono',
});

const diatypeSemiMono = localFont({
  src: '../../fonts/ABCDiatypeSemi-MonoEdu-Regular.otf',
  variable: '--font-diatype-semi-mono',
});

const fragmentSans = localFont({
  src: '../../fonts/PPFragment-SansRegular.otf',
  variable: '--font-fragment-sans',
});

const fragmentGlare = localFont({
  src: '../../fonts/PPFragment-GlareRegular.otf',
  variable: '--font-fragment-glare',
});

// Google fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artist Reader",
  description: "A web reader for presenting text, images, and videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${diatypeRegular.variable}
          ${diatypeBold.variable}
          ${diatypeMono.variable} 
          ${diatypeSemiMono.variable}
          ${fragmentSans.variable}
          ${fragmentGlare.variable}
          antialiased
        `}
      >
        <ScriptProvider>
          {children}
        </ScriptProvider>
      </body>
    </html>
  );
}
