import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ weight: "500", subsets: ["latin", "devanagari"] });

export const metadata: Metadata = {
  title: "🎯️ ChatMe",
  description:
    "ChatMe is web application enabling users to connect from different locations seamlessly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
