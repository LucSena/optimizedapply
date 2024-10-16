import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowRight, Users, Zap, Target, TrendingUp } from 'lucide-react'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <section className="text-center mb-16 sm:mb-24">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight lg:text-6xl mb-6">
              About OptimizedApply
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Empowering job seekers with AI-driven, ATS-optimized resumes to land their dream jobs.
            </p>
          </section>

          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
            <p className="text-lg text-center max-w-3xl mx-auto">
              At OptimizedApply, we're on a mission to revolutionize the job application process. 
              We believe that every qualified candidate deserves a fair chance to showcase their skills and experience. 
              By harnessing the power of AI, we're leveling the playing field and helping job seekers navigate the 
              complex world of Applicant Tracking Systems (ATS).
            </p>
          </section>

          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">Why We Started</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">The ATS Challenge</h3>
                <p className="text-muted-foreground">
                  We recognized that many qualified candidates were being filtered out by ATS before 
                  human eyes ever saw their resumes. This realization sparked our determination to create 
                  a solution that would help job seekers optimize their resumes for both ATS and human readers.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">AI-Powered Solution</h3>
                <p className="text-muted-foreground">
                  By combining our expertise in recruitment processes with cutting-edge AI technology, 
                  we developed OptimizedApply. Our platform ensures that your skills and experiences are 
                  presented in a way that resonates with both ATS algorithms and hiring managers.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">What Sets Us Apart</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Zap, title: "AI-Powered Optimization", description: "Our advanced AI analyzes and enhances your resume for maximum ATS compatibility." },
                { icon: Target, title: "Industry-Specific Tailoring", description: "Customized resume optimization for various industries and job roles." },
                { icon: Users, title: "Human Touch", description: "While AI-driven, our platform maintains the personal essence of your professional story." },
                { icon: TrendingUp, title: "Constant Improvement", description: "We continuously update our algorithms to stay ahead of ATS trends." },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">Our Commitment</h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-8">
              We're committed to continually improving our platform, staying ahead of industry trends, 
              and providing the best possible service to our users. Our team of experts in HR, technology, 
              and data science work tirelessly to ensure that OptimizedApply remains at the forefront of 
              resume optimization technology.
            </p>
            <p className="text-lg text-center max-w-3xl mx-auto">
              Whether you're a recent graduate, a seasoned professional, or changing careers, 
              OptimizedApply is here to help you put your best foot forward in your job search.
            </p>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Optimize Your Job Search?</h2>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/resumes/create">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}