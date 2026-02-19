import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forest Whisper — Mental Coach",
  description: "Your supportive mental coach, grounded in nature",
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
