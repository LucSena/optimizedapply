'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

const PricingCard = ({ title, price, description, features, buttonText, isPro = false }: { 
    title: any, 
    price: any, 
    description: any, 
    features: any[], 
    buttonText: any, 
    isPro?: any 
}) => (
  <Card className={`w-full max-w-sm mx-auto ${isPro ? 'border-primary' : ''}`}>
    <CardHeader>
      <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="mb-4">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="h-5 w-5 text-primary mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button asChild className="w-full" variant={isPro ? "default" : "outline"}>
        <Link href="/signup">{buttonText}</Link>
      </Button>
    </CardFooter>
  </Card>
)

const ComparisonTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-muted">
          <th className="p-2 text-left">Feature</th>
          <th className="p-2 text-center">Free</th>
          <th className="p-2 text-center">Premium</th>
        </tr>
      </thead>
      <tbody>
        {[
          { feature: "ATS-Optimized Resumes", free: true, premium: true },
          { feature: "AI-Powered Suggestions", free: true, premium: true },
          { feature: "Templates", free: "3 Basic", premium: "20+ Premium" },
          { feature: "Resume Versions", free: "1", premium: "Unlimited" },
          { feature: "Cover Letter Creation", free: false, premium: true },
          { feature: "LinkedIn Profile Optimization", free: false, premium: true },
          { feature: "Priority Support", free: false, premium: true },
          { feature: "Ad-Free Experience", free: false, premium: true },
        ].map((row, index) => (
          <tr key={index} className="border-b">
            <td className="p-2">{row.feature}</td>
            <td className="p-2 text-center">
              {typeof row.free === 'boolean' ? (
                row.free ? <CheckCircle className="inline h-5 w-5 text-primary" /> : <XCircle className="inline h-5 w-5 text-muted-foreground" />
              ) : (
                row.free
              )}
            </td>
            <td className="p-2 text-center">
              {typeof row.premium === 'boolean' ? (
                row.premium ? <CheckCircle className="inline h-5 w-5 text-primary" /> : <XCircle className="inline h-5 w-5 text-muted-foreground" />
              ) : (
                row.premium
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <section className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight lg:text-6xl mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Unlock the full potential of your job applications with our premium features.
            </p>
            <div className="flex items-center justify-center mb-8">
              <span className={`mr-2 ${isAnnual ? 'text-muted-foreground' : ''}`}>Monthly</span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                disabled
              />
              <span className={`ml-2 ${!isAnnual ? 'text-muted-foreground' : ''}`}>
                Annual
                <Badge variant="secondary" className="ml-2">Coming Soon</Badge>
              </span>
            </div>
          </section>

          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <PricingCard
                title="Free"
                price="0"
                description="Get started with basic resume optimization"
                features={[
                  "1 ATS-Optimized Resume",
                  "3 Basic Templates",
                  "AI-Powered Suggestions",
                  "Limited Resume Versions"
                ]}
                buttonText="Sign Up Free"
              />
              <PricingCard
                title="Premium"
                price={isAnnual ? "12" : "15"}
                description="Unlock full potential for your job search"
                features={[
                  "Unlimited ATS-Optimized Resumes",
                  "20+ Premium Templates",
                  "Advanced AI Optimization",
                  "Cover Letter Creation",
                  "LinkedIn Profile Optimization",
                  "Priority Support"
                ]}
                buttonText="Go Premium"
                isPro={true}
              />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Compare Plans</h2>
            <ComparisonTable />
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto">
              {[
                {
                  question: "What's included in the free plan?",
                  answer: "The free plan includes basic ATS optimization for one resume, access to 3 basic templates, and limited AI-powered suggestions to improve your resume."
                },
                {
                  question: "Can I upgrade or downgrade my plan at any time?",
                  answer: "Yes, you can upgrade to the Premium plan at any time. Downgrades will take effect at the end of your current billing cycle."
                },
                {
                  question: "Is there a limit to how many resumes I can create with the Premium plan?",
                  answer: "No, with the Premium plan you can create unlimited ATS-optimized resumes and versions to tailor for different job applications."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "We offer a 14-day money-back guarantee for our Premium plan. If you're not satisfied, contact our support team within 14 days of your purchase for a full refund."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Supercharge Your Job Search?</h2>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/signup">Get Started with Premium</Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}