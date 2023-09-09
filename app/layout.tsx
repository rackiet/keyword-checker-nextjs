import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'APP KC',
  description: 'Pengecek Keyword dari list url',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-800 text-gray-100 "}>
      <div className="container mx-auto">
        {children}
      </div>
    </body>
    </html>
  )
}
