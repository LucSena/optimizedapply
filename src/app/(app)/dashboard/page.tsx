import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Plus, Award, Zap } from 'lucide-react';

async function getResumeCount(userId: string) {
  return await prisma.resume.count({
    where: { userId },
  });
}

async function getRecentResumes(userId: string) {
  return await prisma.resume.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    take: 3,
    include: {
      personalInfo: true,
    },
  });
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/signin');
  }

  const userId = session.user.id;
  const resumeCount = await getResumeCount(userId);
  const recentResumes = await getRecentResumes(userId);
  const accountType = session.user.accountType;

  const maxResumes = accountType === 'FREE' ? 1 : Infinity;
  const resumeProgress = (resumeCount / maxResumes) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {session.user.name}!</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Resume Count</CardTitle>
            <CardDescription>Track your created resumes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{resumeCount}</div>
            <Progress value={resumeProgress} className="mt-2" />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {accountType === 'FREE' 
                ? `${resumeCount}/1 resumes created`
                : 'Unlimited resumes available'}
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Your current plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {accountType === 'PREMIUM' ? (
                <Award className="h-8 w-8 text-yellow-500 mr-2" />
              ) : (
                <FileText className="h-8 w-8 text-blue-500 mr-2" />
              )}
              <span className="text-2xl font-semibold">
                {accountType === 'PREMIUM' ? 'Premium' : 'Free'}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            {accountType === 'FREE' && (
              <Button asChild>
                <Link href="/pricing">Upgrade to Premium</Link>
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started quickly</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <Button asChild>
              <Link href="/resumes/create">
                <Plus className="mr-2 h-4 w-4" /> Create New Resume
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resumes">
                <FileText className="mr-2 h-4 w-4" /> View All Resumes
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Recent Resumes</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recentResumes.map((resume) => (
          <Card key={resume.id}>
            <CardHeader>
              <CardTitle>{resume.title}</CardTitle>
              <CardDescription>
                Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {resume.personalInfo?.fullName}
              </p>
              <p className="text-sm text-muted-foreground">
                {resume.personalInfo?.email}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/resumes/${resume.id}`}>
                  <Zap className="mr-2 h-4 w-4" /> Optimize
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        {recentResumes.length === 0 && (
          <Card>
            <CardContent className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">No resumes created yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}