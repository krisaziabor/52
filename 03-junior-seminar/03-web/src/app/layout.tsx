import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const elletwo = localFont({
  src: "../../fonts/Elle2-Regular.otf",
  variable: "--font-elle-two",
  weight: "400",
});

const centaur = localFont({
  src: "../../fonts/CentaurMTStdRegular.otf",
  variable: "--font-centaur",
  weight: "400",
});

const diatype = localFont({
  src: "../../fonts/ABCDiatypeEdu-Regular.otf",
  variable: "--font-diatype",
  weight: "400",
});

const diatypeBold = localFont({
  src: "../../fonts/ABCDiatypeEdu-Bold.otf",
  variable: "--font-diatype-bold",
  weight: "700",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://395.krisaziabor.com'),
  title: "4. No Idea if This is Bad or Not",
  description:
    "A microsite for Yale's Junior Seminar Spring 2025.",
  icons: {
    icon: "icon.ico",
    apple: "/preview.jpg",
  },

  // This is where you can add your Open Graph details:
  openGraph: {
    title: "4. No Idea if This is Bad or Not",
    description:
    "A microsite for Yale's Junior Seminar Spring 2025.",
    url: 'https://395.krisaziabor.com',
    siteName: "4. No Idea if This is Bad or Not",
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
    title: "4. No Idea if This is Bad or Not",
    description:
      "A microsite for Yale's Junior Seminar Spring 2025.",
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
        className={`${elletwo.variable} ${centaur.variable} ${diatype.variable} ${diatypeBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
