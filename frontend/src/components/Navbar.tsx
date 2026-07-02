'use client'

import Link from 'next/link'
import {
  UserButton,
  Show,
  SignInButton,
  SignUpButton,
  useUser,
} from '@clerk/nextjs'
import { Button } from './ui/button'
import { Bell } from 'lucide-react'

function Navbar() {
  const { isSignedIn } = useUser()

  const navItems = [
    // {
    //   name: 'Home',
    //   href: '/',
    // },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
        >
          TeamForge
        </Link>

        {/* <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div> */}

        <div className="flex items-center gap-3">
           <Link href="/browse">
           <Button>
            Browser Developers
          </Button>
          </Link>
          {isSignedIn && (
            <>
              <Link href="/manage-request">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="outline">
                  Dashboard
                </Button>
              </Link>
            </>
          )}

          <Show when="signed-in">
            <UserButton />
          </Show>

          <Show when="signed-out">
            <SignInButton>
              <Button className='cursor-pointer hover:text-white hover:bg-black'
              variant="secondary"
              >
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button 
               variant="secondary"
              className='cursor-pointer hover:bg-black hover:text-white'>
                Sign Up
              </Button>
            </SignUpButton>
          </Show>
         
         
        </div>
      </div>
    </nav>
  )
}

export default Navbar