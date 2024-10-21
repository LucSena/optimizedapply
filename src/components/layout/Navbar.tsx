'use client'

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, User } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NavItems = () => (
  <>
    <Link href="/resumes" className="text-sm font-medium transition-colors hover:text-primary">
      Resumes
    </Link>
    <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
      Pricing
    </Link>
    <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
      About
    </Link>
  </>
)

const Navbar = () => {
  const { data: session, status } = useSession()

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={session?.user?.image || ''} />
          <AvatarFallback>{session?.user?.name?.[0] || <User />}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/account">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/api/auth/signout">Sign Out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">OptimizedApply</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <NavItems />
          </nav>
          <div className="flex items-center space-x-4">
            {status === 'authenticated' ? (
              <UserMenu />
            ) : (
              <Button variant="default" asChild className="hidden md:inline-flex">
                <Link href="/signin">Sign In</Link>
              </Button>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-6">
                  <NavItems />
                  {status === 'authenticated' ? (
                    <>
                      <Link href="/account" className="text-sm font-medium transition-colors hover:text-primary">
                        Account
                      </Link>
                      <Link href="/api/auth/signout" className="text-sm font-medium transition-colors hover:text-primary">
                        Sign Out
                      </Link>
                    </>
                  ) : (
                    <Button variant="default" asChild>
                      <Link href="/signin">Sign In</Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar