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

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "KiroiX Ecosystem",
  description: "Advanced centralized control panel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let activeTheme = "minimalist"; // default theme

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from('users')
        .select('active_theme')
        .eq('id', user.id)
        .single();
      
      if (profile?.active_theme) {
        activeTheme = profile.active_theme;
      }
    }
  } catch (error) {
    console.error("Failed to load user theme", error);
  }

  return (
    <html
      lang="en"
      data-theme={activeTheme}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
