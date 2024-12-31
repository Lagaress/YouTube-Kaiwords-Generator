import { NotificationManager } from '@/components/Notification';
import { KeywordsProvider } from '@/contexts/KeywordsContext';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YouTube K(AI)words Generator",
  description: "Generate YouTube keywords with AI",
  icons: {
    icon: '/icons/favicon/favicon.ico',
    apple: '/icons/favicon/apple-touch-icon.png',
    other: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/icons/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/icons/favicon/favicon-16x16.png' },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationManager>
          <KeywordsProvider>
            {children}
          </KeywordsProvider>
        </NotificationManager>
        <Analytics />
      </body>
    </html>
  );
}
