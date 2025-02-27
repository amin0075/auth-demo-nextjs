"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

export async function loginUser(email: string, password: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = await argon2.verify(user.password, password);
  if (!isValid) {
    throw new Error("Invalid password");
  }

  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);

  (await cookies()).set("authToken", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === "production",
  });

  return { message: "Login successful" };
}
