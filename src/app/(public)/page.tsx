import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, CheckCircle, Download } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <section className="text-center mb-16 sm:mb-24">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight lg:text-6xl mb-6">
              Create ATS-Optimized Resumes in Minutes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              OptimizedApply uses AI to create, edit, and format resumes that pass
              ATS scans and impress hiring managers.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/resumes/create">
                Get Started - It's Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>

          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">Create Your Resume in 3 Simple Steps</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: FileText, title: "Create Your Profile", description: "Fill in your basic information and work history." },
                { icon: CheckCircle, title: "AI Optimization", description: "Our AI enhances your resume for ATS compatibility." },
                { icon: Download, title: "Download & Apply", description: "Get your polished resume ready for job applications." }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg">
                  <step.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose OptimizedApply?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "AI-powered resume optimization",
                "ATS-friendly templates",
                "Customizable for any industry",
                "Expert tips and suggestions",
                "Easy-to-use interface",
                "Constantly updated for current trends"
              ].map((feature, index) => (
                <div key={index} className="flex items-center p-4 bg-accent rounded-md">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}