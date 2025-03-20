"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => Promise<void>;
}

export function TaskItem({ task, onDelete }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <p className="flex-1 mr-4">{task.content}</p>
      <div className="flex items-center space-x-2">
        <Link href={`/edit/${task.id}`}>
          <Button size="icon" variant="outline">
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
        <Button
          size="icon"
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}