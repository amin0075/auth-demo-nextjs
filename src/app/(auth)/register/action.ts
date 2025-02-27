"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const hashedPassword = await argon2.hash(password);
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  await db.insert(users).values({ name, email, password: hashedPassword });
  redirect("/login");
  return { message: "User registered successfully" };
}
