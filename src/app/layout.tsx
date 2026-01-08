import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import { ChatWidget } from "@/components/chat/chat-widget";
import { StickyHeader } from "@/components/ui/sticky-header";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Highbee | Full-Stack Developer & AI Specialist",
  description:
    "I build AI-powered applications, full-stack web apps, and rapid prototypes. Specializing in Next.js, TypeScript, and Claude AI integration.",
  keywords: [
    "full-stack developer",
    "AI integration",
    "Next.js",
    "React",
    "Claude AI",
    "web development",
    "Nigeria",
  ],
  authors: [{ name: "Ibrahim Lawal" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/images/profile-favicon.png",
    apple: "/images/profile-favicon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Highbee",
  },
  openGraph: {
    title: "Highbee | Full-Stack Developer & AI Specialist",
    description: "Building the future with AI-powered applications",
    url: "https://highbee.dev",
    siteName: "Highbee",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Highbee | Full-Stack Developer",
    description: "Building AI-powered applications",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} min-h-screen antialiased`}
      >
        <CustomCursor />
        <ScrollProgress />
        <StickyHeader />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
