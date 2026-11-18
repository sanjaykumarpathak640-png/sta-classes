import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
};

export const metadata: Metadata = {
  title: "STA Classes | Premium Tuition & Online Learning Platform (Class 4-12)",
  description:
    "Official learning portal for STA Classes, Barh (Bihar). Online and Offline batches for Class 4th to 12th with expert mentorship, interactive live sessions, daily study reports, and 24x7 AI doubts.",
  keywords: [
    "STA Classes",
    "STA Classes Barh",
    "Tuition in Barh",
    "Coaching Institute Barh",
    "Class 4 to 12 Tuition",
    "Class 10 Board Prep",
    "Class 12 Science Coaching",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="w-full max-w-full overflow-x-hidden">
      <body className={`${poppins.variable} font-sans antialiased min-h-screen w-full max-w-full overflow-x-hidden bg-background text-foreground transition-colors duration-300 relative`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
