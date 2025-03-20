"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Todo App</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-sm text-gray-600">
                Signed in as {session.user?.name}
              </span>
              <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-6">
        {children}
      </main>
    </div>
  );
}