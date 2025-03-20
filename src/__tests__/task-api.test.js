import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextResponse } from 'next/server';

// Mock the PrismaClient
vi.mock('@prisma/client', () => {
  const mockPrisma = {
    task: {
      findMany: vi.fn(),
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };
  return {
    PrismaClient: vi.fn(() => mockPrisma),
  };
});

// Mock next-auth
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

// Import our API routes
import { GET, POST } from '../app/api/tasks/route';
import { GET as GET_TASK, PATCH, DELETE } from '../app/api/tasks/[id]/route';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Tasks API', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // Mock session
    getServerSession.mockResolvedValue({
      user: { id: 'user123', name: 'Test User', email: 'test@example.com' },
    });
  });

  describe('GET /api/tasks', () => {
    it('should return tasks for the authenticated user', async () => {
      const mockTasks = [
        { 
          id: 'task1', 
          content: 'Test task 1', 
          completed: false, 
          userId: 'user123',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ];

      prisma.task.findMany.mockResolvedValue(mockTasks);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockTasks);
      expect(prisma.task.findMany).toHaveBeenCalledWith({
        where: { userId: 'user123' },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return 401 if user is not authenticated', async () => {
      getServerSession.mockResolvedValue(null);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data).toEqual({ error: 'Unauthorized' });
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const newTask = {
        id: 'newtask1',
        content: 'New task',
        completed: false,
        userId: 'user123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.task.create.mockResolvedValue(newTask);

      const request = new Request('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: 'New task' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toEqual(newTask);
      expect(prisma.task.create).toHaveBeenCalledWith({
        data: {
          content: 'New task',
          userId: 'user123',
        },
      });
    });
  });

  describe('GET /api/tasks/[id]', () => {
    it('should return a specific task', async () => {
      const mockTask = {
        id: 'task1',
        content: 'Test task',
        completed: false,
        userId: 'user123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.task.findUnique.mockResolvedValue(mockTask);

      const response = await GET_TASK(
        new Request('http://localhost:3000/api/tasks/task1'),
        { params: { id: 'task1' } }
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockTask);
    });
  });

  describe('PATCH /api/tasks/[id]', () => {
    it('should update a task', async () => {
      const existingTask = {
        id: 'task1',
        content: 'Original content',
        completed: false,
        userId: 'user123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedTask = {
        ...existingTask,
        content: 'Updated content',
      };

      prisma.task.findUnique.mockResolvedValue(existingTask);
      prisma.task.update.mockResolvedValue(updatedTask);

      const request = new Request('http://localhost:3000/api/tasks/task1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: 'Updated content' }),
      });

      const response = await PATCH(request, { params: { id: 'task1' } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(updatedTask);
    });
  });

  describe('DELETE /api/tasks/[id]', () => {
    it('should delete a task', async () => {
      const existingTask = {
        id: 'task1',
        content: 'Test task',
        completed: false,
        userId: 'user123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.task.findUnique.mockResolvedValue(existingTask);

      const response = await DELETE(
        new Request('http://localhost:3000/api/tasks/task1'),
        { params: { id: 'task1' } }
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ message: 'Task deleted successfully' });
      expect(prisma.task.delete).toHaveBeenCalledWith({
        where: { id: 'task1' },
      });
    });
  });
});