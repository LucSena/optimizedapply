import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

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
            <Button variant="default" asChild className="hidden md:inline-flex">
              <Link href="/signin">Sign In</Link>
            </Button>
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
                  <Button variant="default" asChild>
                    <Link href="/signin">Sign In</Link>
                  </Button>
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