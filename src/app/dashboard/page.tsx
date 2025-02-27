import type { Metadata } from "next";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { UserNav } from "@/components/user-nav";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User dashboard",
};

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

async function getUserInfo() {
  const token = (await cookies()).get("authToken")?.value;

  if (!token) return null;

  try {
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(token, secretKey);
    const fetchedUser = await db.query.users.findFirst({
      where: eq(users.id, (payload as unknown as User).id),
    });
    return fetchedUser as Omit<User, "password">;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export default async function DashboardPage() {
  const user = await getUserInfo();

  if (!user) {
    return null; // This should never happen due to middleware
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <UserNav
            user={{
              name: user.name as string,
              email: user.email as string,
            }}
          />
        </div>
      </header>
      <main className="container flex-1 py-10">
        <div className="grid gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your account today.
            </p>
          </div>
          {/* Add your dashboard content here */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">Card Title</h3>
              <p className="text-sm text-muted-foreground">
                Card content goes here.
              </p>
            </div>
            {/* Add more cards as needed */}
          </div>
        </div>
      </main>
    </div>
  );
}
