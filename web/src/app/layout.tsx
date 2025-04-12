import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const semidiatype = localFont({
  src: "../../fonts/ABCDiatypeSemi-MonoEdu-Regular.otf",
  variable: "--font-semi-diatype",
  weight: "400",
});

const boldsemidiatype = localFont({
  src: "../../fonts/ABCDiatypeSemi-MonoEdu-Bold.otf",
  variable: "--font-bold-semi-diatype",
  weight: "700",
});

const boldfragment = localFont({
  src: "../../fonts/PPFragment-TextBold.otf",
  variable: "--font-bold-fragment",
  weight: "700",
});

const fragmentsans = localFont({
  src: "../../fonts/PPFragment-SansRegular.otf",
  variable: "--font-fragment-sans",
  weight: "400",
});

const italicfragmentsans = localFont({
  src: "../../fonts/PPFragment-SansRegularitalic.otf",
  variable: "--font-italic-fragment-sans",
  weight: "400",
});

const glare = localFont({
  src: "../../fonts/PPFragment-GlareRegular.otf",
  variable: "--font-glare",
  weight: "400",
});

const diatypemono = localFont({
  src: "../../fonts/ABCDiatypeMonoEdu-Regular.otf",
  variable: "--font-diatype-mono",
  weight: "400",
});

const diatypemonomedium = localFont({
  src: "../../fonts/ABCDiatypeMonoEdu-Medium.otf",
  variable: "--font-diatype-mono-medium",
  weight: "500",
});


export const metadata: Metadata = {
  metadataBase: new URL('https://krisaziabor.com'),
  title: "Kris Aziabor Loves Design",
  description:
    "Product design portfolio and 52-week project case studies.",
  icons: {
    icon: "icon.ico",
    apple: "/preview.jpg",
  },

  // This is where you can add your Open Graph details:
  openGraph: {
    title: "Kris Aziabor Loves Design",
    description:
    "Product design portfolio and 52-week project case studies.",
    url: "https://krisaziabor.com",
    siteName: "Kris Aziabor",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // And here are Twitter-specific tags (many platforms also read them):
  twitter: {
    card: "summary_large_image",
    title: "Kris Aziabor Loves Design",
    description:
      "Product design portfolio and 52-week project case studies.",
    images: ["/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body
        className={`${semidiatype.variable} ${diatypemonomedium.variable} ${diatypemono.variable} ${glare.variable} ${boldsemidiatype.variable} ${boldfragment.variable} ${fragmentsans.variable} ${italicfragmentsans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
