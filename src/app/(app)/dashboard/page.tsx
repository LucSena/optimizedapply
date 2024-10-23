import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  PlusCircle, 
  FileText, 
  Clock,
  Crown,
  ArrowUpRight,
  Briefcase
} from 'lucide-react'

async function getResumeStats(userId: string) {
  const resumes = await prisma.resume.findMany({
    where: { userId },
    include: {
      workExperiences: true,
      skills: true,
      _count: {
        select: {
          workExperiences: true,
          educations: true,
          skills: true,
          projects: true,
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  })

  const totalResumes = await prisma.resume.count({
    where: { userId }
  })

  return { resumes, totalResumes }
}

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect('/signin')
  }

  const { resumes, totalResumes } = await getResumeStats(session.user.id)
  const isNewUser = totalResumes === 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome back, {session.user.name}</h1>
          <Badge variant={session.user.accountType === 'PREMIUM' ? "default" : "secondary"}>
            <Crown className="w-4 h-4 mr-1" />
            {session.user.accountType} Account
          </Badge>
        </div>
        <p className="text-muted-foreground">
          {isNewUser 
            ? "Get started by creating your first ATS-optimized resume"
            : "Manage and optimize your professional resumes"}
        </p>
      </div>

      {isNewUser ? (
        <Card className="mb-8 border-dashed">
          <CardHeader>
            <CardTitle>Create Your First Resume</CardTitle>
            <CardDescription>
              Start your journey to better job applications with an ATS-optimized resume.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/resumes/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Resume
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalResumes}</div>
              {session.user.accountType === 'FREE' && (
                <p className="text-xs text-muted-foreground mt-1">
                  {totalResumes}/1 resumes (Free plan limit)
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Update</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {resumes[0] 
                  ? new Date(resumes[0].updatedAt).toLocaleDateString()
                  : "No resumes yet"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Status</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{session.user.accountType}</div>
              {session.user.accountType === 'FREE' && (
                <Button variant="link" asChild className="p-0">
                  <Link href="/upgrade" className="text-primary text-sm">
                    Upgrade to Premium <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {!isNewUser && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Resumes</h2>
            <Button asChild>
              <Link href="/resumes/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Resume
              </Link>
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resumes.map((resume) => (
                  <TableRow key={resume.id}>
                    <TableCell className="font-medium">{resume.title}</TableCell>
                    <TableCell>{new Date(resume.updatedAt).toLocaleDateString()}</TableCell>
                    <TableCell>{resume._count.workExperiences} positions</TableCell>
                    <TableCell>{resume._count.skills} skills</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" asChild>
                        <Link href={`/resumes/${resume.id}`}>
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {totalResumes > 5 && (
            <div className="text-center mt-4">
              <Button variant="outline" asChild>
                <Link href="/resumes">
                  View All Resumes
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}

      {session.user.accountType === 'FREE' && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Unlock Premium Features
            </CardTitle>
            <CardDescription>
              Upgrade to Premium to create unlimited resumes and access all features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-semibold">Premium Benefits:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Create unlimited resumes
                  </li>
                  <li className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Access to premium templates
                  </li>
                  <li className="flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    Priority support
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <Button asChild size="lg">
                  <Link href="/upgrade">
                    Upgrade to Premium
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}