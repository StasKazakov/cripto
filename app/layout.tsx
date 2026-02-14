import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const euclidCircularA = localFont({
  src: [
    {
      path: "../public/fonts/EuclidCircularA-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/EuclidCircularA-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/EuclidCircularA-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-euclid",
});

export const metadata: Metadata = {
  title: "Cripto App",
  description: "Test task project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${euclidCircularA.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
