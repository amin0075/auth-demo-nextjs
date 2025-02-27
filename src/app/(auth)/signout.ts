"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  (await cookies()).delete("authToken");
  redirect("/");
}
