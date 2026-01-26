import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MovementRx - Home Physical Therapy Assessment",
  description: "Assess your movement quality and get personalized corrective exercises to prevent chronic pain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
