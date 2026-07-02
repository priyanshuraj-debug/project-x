import type { Metadata } from 'next'
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import QueryProvider from '@/provider/query-provider'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})



const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Project X',
  description: 'University collaboration platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          signInForceRedirectUrl="/onboarding"
          signUpForceRedirectUrl="/onboarding"
        >

          <header>

          </header>
          <QueryProvider>
            <Navbar />
            <Toaster />
            <main className="pt-16">
              {children}
            </main>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}