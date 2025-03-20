import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Todo App</h1>
        <p className="text-gray-600 text-center mb-8">
          Application to manage your daily tasks
        </p>
        <div className="space-y-4">
          <Link href="/signin" className="w-full block">
            <Button className="w-full">Sign In</Button>
          </Link>
          <Link href="/register" className="w-full block">
            <Button variant="outline" className="w-full">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}