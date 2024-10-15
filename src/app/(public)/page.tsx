import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Navbar from '@/components/layout/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Get great results in selection processes with our <span className="text-blue-500">Resumes</span>.
          </h1>
          <p className="text-xl mb-8">
            OptimizedApply is a resume platform that creates CVs to pass analyses carried out by AIs - writing, editing, formatting and optimization.
          </p>
          <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg">
            <Link href="/resumes/create">Get Started - It's free</Link>
          </Button>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Create your resume in seconds!</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Create an account', 'Fill in your details', 'Download'].map((step, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Step {index + 1}</h3>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Discover the full potential of OptimizedApply.</h2>
          <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg">
            <Link href="/resumes/create">Get Started - It's free</Link>
          </Button>
        </section>
      </main>
    </div>
  )
}