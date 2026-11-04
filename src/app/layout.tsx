import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "STA Classes | Premium Coaching & Online Learning Platform",
  description:
    "Official online learning platform for STA Classes. Excellence in Class 9-12, Board Exams, and Competitive Entrance Preparation with expert mentorship, interactive live sessions, and curated notes.",
  keywords: [
    "STA Classes",
    "Coaching Institute",
    "Online Tuition",
    "Class 9 Coaching",
    "Class 10 Board Prep",
    "Class 11 Science",
    "Class 12 Board Prep",
    "JEE Foundation",
    "NEET Foundation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased min-h-screen bg-background text-foreground transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
