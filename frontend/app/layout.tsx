import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/navbar/Footer";
import Navbar from "@/components/navbar/Navbar";
import ReduxProvider from "./redux/Provider";
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BazzarConnect",
  description: "A responsive e-commerce platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <Navbar />
          <div className="flex flex-col min-h-screen">
            {/* Main Content */}
            <main className="flex-grow px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
              {children}
            </main>
            <Toaster/>
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
