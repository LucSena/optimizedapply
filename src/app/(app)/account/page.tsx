import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { AccountForm } from '@/components/forms/AccountForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Crown, CreditCard } from 'lucide-react'

export default async function AccountPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/signin')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <Badge variant={session.user.accountType === 'PREMIUM' ? "default" : "secondary"}>
            <Crown className="w-4 h-4 mr-1" />
            {session.user.accountType} Account
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your profile information and email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccountForm user={session.user} />
          </CardContent>
        </Card>

        {session.user.accountType === 'FREE' && (
          <Card>
            <CardHeader>
              <CardTitle>Upgrade Your Account</CardTitle>
              <CardDescription>
                Upgrade to Premium to unlock all features and create unlimited resumes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Premium Benefits</h3>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    <li>• Unlimited ATS-Optimized Resumes</li>
                    <li>• 20+ Premium Templates</li>
                    <li>• Advanced AI Optimization</li>
                    <li>• Cover Letter Creation</li>
                    <li>• Priority Support</li>
                  </ul>
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/upgrade">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {session.user.accountType === 'PREMIUM' && (
          <Card>
            <CardHeader>
              <CardTitle>Premium Account</CardTitle>
              <CardDescription>
                You are currently on a Premium plan. Enjoy all the premium features!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Your Premium Benefits</h3>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    <li>• Unlimited ATS-Optimized Resumes</li>
                    <li>• Access to All Premium Templates</li>
                    <li>• Priority Support Access</li>
                    <li>• Advanced Features Enabled</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}