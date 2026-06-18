'use client'

import Link from 'next/link'
import {
  UserButton, Show, SignInButton,
  SignUpButton,
} from '@clerk/nextjs'
import { Button } from './ui/button'
import { useUser } from '@clerk/nextjs'
function Navbar() {
  const { isSignedIn, user, isLoaded } = useUser()
  const navItems = [
    {
      name: 'Home',
      href: '/',

    },
  ]


  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
        >
          Project X
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (

            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>)
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* <Link href="/dashboard">
            <Button variant="outline">
              Dashboard
            </Button>
          </Link> */}
          {isSignedIn && (
            <Link href="/dashboard">
              <Button variant="outline">
                Dashboard
              </Button>
            </Link>
          )}

          <Show when="signed-in">
            <UserButton />
          </Show>

          <Show when="signed-out">
            <SignInButton>
              <button className="h-10  px-5 rounded-full border border-border bg-background text-sm font-medium hover:bg-muted transition-all duration-200 cursor-pointer">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton>
              <button className="h-10 px-5 rounded-full bg-[#6c47ff] text-white text-sm font-medium shadow-md hover:bg-[#5b39e6] hover:shadow-lg transition-all duration-200 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
        </div>
      </div>
    </nav>
  )
}

export default Navbar