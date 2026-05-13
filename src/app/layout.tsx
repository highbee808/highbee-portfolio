import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import { ChatWidget } from "@/components/chat/chat-widget";
import { StickyHeader } from "@/components/ui/sticky-header";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SafariInit } from "@/components/SafariInit";
import { DEFAULT_OG_IMAGE, PERSON_NAME, SITE_NAME, SITE_URL } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Highbee | Full-Stack Developer & AI Integration Specialist",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Ibrahim Lawal builds AI-powered products, full-stack web applications, and rapid prototypes with Next.js, TypeScript, Supabase, and Claude AI.",
  keywords: [
    "Ibrahim Lawal",
    "Highbee",
    "full-stack developer Nigeria",
    "AI integration specialist",
    "Next.js developer",
    "Claude AI developer",
    "TypeScript developer",
    "web application developer",
  ],
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  alternates: {
    canonical: "/",
  },
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
    title: "Highbee | Full-Stack Developer & AI Integration Specialist",
    description:
      "AI integration, full-stack development, and rapid prototyping by Ibrahim Lawal.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 1200,
        alt: "Ibrahim Lawal, Highbee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Highbee | Full-Stack Developer & AI Integration Specialist",
    description:
      "AI-powered products, full-stack apps, and rapid prototypes by Ibrahim Lawal.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var ua=navigator.userAgent;var isIOS=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);var isSafari=/Safari/.test(ua)&&!/Chrome/.test(ua)&&!/CriOS/.test(ua);if(isIOS)document.documentElement.classList.add('is-ios');if(isSafari)document.documentElement.classList.add('is-safari');})();`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} min-h-screen antialiased`}
      >
        <SafariInit />
        <CustomCursor />
        <ScrollProgress />
        <StickyHeader />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
