import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { flattenFieldErrors, registerSchema } from "@/lib/validation-auth";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json(
      { message: "요청 형식이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const parsed = registerSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "입력값을 다시 확인해주세요.",
        fieldErrors: flattenFieldErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  const passwordHash = await hashPassword(parsed.data.password);

  try {
    const user = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          email,
          name: parsed.data.name.trim(),
          passwordHash,
        },
      });

      await tx.creditWallet.create({
        data: {
          userId: createdUser.id,
        },
      });

      return createdUser;
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { message: "이미 사용 중인 이메일입니다." },
        { status: 409 },
      );
    }

    console.error("Failed to register user", error);

    return NextResponse.json(
      { message: "회원가입 처리 중 문제가 발생했습니다." },
      { status: 500 },
    );
  }
}
