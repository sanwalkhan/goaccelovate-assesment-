/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface Task {
  id: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export default function EditTask() {
  const params = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params?.id) {
      setError("Task ID is missing");
      setIsLoading(false);
      return;
    }

    const fetchTask = async () => {
      try {
        console.log("Fetching task with ID:", params.id);
        const response = await fetch(`/api/tasks/${params.id}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to fetch task");
        }

        const data = await response.json();
        setTask(data);
        setContent(data.content);
      } catch (error) {
        setError("An unexpected error occurred while fetching the task");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Task content cannot be empty");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/tasks/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update task");
      }

      router.push("/dashboard");
    } catch (error) {
      setError("An unexpected error occurred while updating the task");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Edit Task</h1>
        <p className="text-gray-600">Update your task details</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Task content" className="w-full" />
        </div>

        <div className="flex space-x-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Task"
            )}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
