import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OptimizedApply - ATS-Friendly Resume Builder',
  description: 'Create ATS-optimized resumes with AI assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  )
}