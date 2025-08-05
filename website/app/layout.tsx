import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Great Blue Consulting - AI-Powered Business Solutions",
  description: "Transform your business operations with cutting-edge AI automation. We help small businesses leverage artificial intelligence to streamline workflows and drive growth.",
  icons: {
    icon: '/heron-logo.png',
    apple: '/heron-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}