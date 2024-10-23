import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { name, email } = body

    if (!name || !email) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Verify email uniqueness (excluding current user)
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: session.user.id
        }
      }
    })

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        name,
        email,
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("[USER_UPDATE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}