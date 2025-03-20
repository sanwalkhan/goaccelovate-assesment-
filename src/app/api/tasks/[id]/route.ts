import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerSession(authOptions);
  
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const task = await prisma.task.findUnique({
        where: {
          id: params.id,
        },
      });
  
      if (!task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }
  
      if (task.userId !== session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      return NextResponse.json(task);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch task" },
        { status: 500 }
      );
    }
  }


// Update a task (PATCH)
export async function PATCH(req: Request, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = context.params?.id; // ✅ Correct way to access params
    if (!id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const { content } = await req.json();

    if (!content || content.trim() === "") {
      return NextResponse.json({ error: "Task content is required" }, { status: 400 });
    }

    const existingTask = await prisma.task.findUnique({ where: { id } });

    if (!existingTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (existingTask.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized to edit this task" }, { status: 403 });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { content },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// Delete a task (DELETE)
export async function DELETE(req: Request, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = context.params?.id; // ✅ Correct way to access params

    if (!id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (task.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized to delete this task" }, { status: 403 });
    }

    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
