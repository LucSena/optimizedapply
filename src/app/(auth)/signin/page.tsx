'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FcGoogle } from 'react-icons/fc'
import { useRedirectAuth } from '@/hooks/useRedirectAuth'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { status } = useRedirectAuth()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'authenticated') {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/dashboard')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      console.error('Failed to sign in with Google', error)
      setError('Failed to sign in with Google. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in to OptimizedApply</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            <FcGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-sm text-center">
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot your password?
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}