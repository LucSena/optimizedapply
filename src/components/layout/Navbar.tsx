import Link from 'next/link'
import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-500">OptimizedApply</Link>
        <div className="space-x-4">
          <Link href="/resumes" className="hover:text-blue-400">Resumes</Link>
          <Link href="/cover-letters" className="hover:text-blue-400">Cover Letters</Link>
          <Link href="/pricing" className="hover:text-blue-400">Pricing</Link>
          <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar