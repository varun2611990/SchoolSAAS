import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SchoolSaaS - Modern School Management",
  description: "Comprehensive school management SaaS platform for modern educational institutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
