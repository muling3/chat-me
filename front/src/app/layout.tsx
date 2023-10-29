import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ weight: "500", subsets: ["latin", "devanagari"] });

export const metadata: Metadata = {
  title: "🎯️ ChatMe",
  description:
    "ChatMe is web application enabling users to connect from different locations seamlessly",
};subsets: ["latin", "devanagari"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
