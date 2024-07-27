import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBarComponent from "@/components/NavBar";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raghavendra's Portfolio",
  description: "Aesthetic Modren Portfolio ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex items-center justify-center m-5">
            <NavBarComponent />
          </div>
          <Toaster richColors position="top-right" closeButton/>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
