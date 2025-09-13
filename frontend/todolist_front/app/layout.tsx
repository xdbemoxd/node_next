import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavigationMenuDemo } from '../pages/menu/page';
import { DropdownMenuDemo } from "@/pages/dropmenu/page";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To Do List",
  description: "Write a to-do list.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Menú de Escritorio: visible solo en md y más grandes */}
        <div className="hidden md:flex justify-center py-6 bg-gradient-to-r from-slate-50 to-gray-100 border-b border-gray-200">
       
          <NavigationMenuDemo />
       
        </div>

        {/* Menú Móvil: visible solo en pantallas más pequeñas que md */}
        <div className="flex md:hidden py-4 bg-gradient-to-r from-slate-50 to-gray-100 border-b border-gray-200">
        
          <DropdownMenuDemo />
        
        </div>
        
        {children}
      </body>
    </html>
  );
}
