import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";

export async function requireUserSession() {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return session;
}

export async function requireAdminSession() {
  const session = await requireUserSession();

  if (session.user.role !== Role.ADMIN) {
    redirect("/dashboard");
  }

  return session;
}
