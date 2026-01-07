import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ChatWidget } from "@/components/chat/chat-widget";
import { StickyHeader } from "@/components/ui/sticky-header";
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
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen antialiased`}
      >
        <StickyHeader />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
