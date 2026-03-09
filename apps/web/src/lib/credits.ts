import { randomUUID } from "crypto";

import {
  CreditLedgerType,
  Prisma,
  ReferenceType,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

export class InsufficientCreditsError extends Error {
  constructor() {
    super("보유 크레딧이 부족합니다.");
    this.name = "InsufficientCreditsError";
  }
}

type CreditMutationInput = {
  userId: string;
  amount: number;
  reason: string;
  referenceId?: string | null;
  referenceType?: ReferenceType;
  idempotencyKey?: string;
  metadata?: Prisma.InputJsonValue;
};

function assertPositiveAmount(amount: number) {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error("크레딧 수량은 1 이상의 정수여야 합니다.");
  }
}

async function withCreditTransaction<T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>,
) {
  return prisma.$transaction(callback, {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  });
}

async function findExistingLedgerEntry(
  tx: Prisma.TransactionClient,
  idempotencyKey?: string,
) {
  if (!idempotencyKey) {
    return null;
  }

  return tx.creditLedger.findUnique({
    where: { idempotencyKey },
  });
}

async function getWalletOrThrow(tx: Prisma.TransactionClient, userId: string) {
  const wallet = await tx.creditWallet.findUnique({
    where: { userId },
  });

  if (!wallet) {
    throw new Error("크레딧 지갑을 찾을 수 없습니다.");
  }

  return wallet;
}

async function appendLedgerEntry(
  tx: Prisma.TransactionClient,
  wallet: {
    id: string;
    userId: string;
    balance: number;
    lockedBalance: number;
  },
  input: CreditMutationInput & {
    type: CreditLedgerType;
    amount: number;
  },
) {
  return tx.creditLedger.create({
    data: {
      walletId: wallet.id,
      userId: wallet.userId,
      type: input.type,
      amount: input.amount,
      balanceAfter: wallet.balance,
      lockedBalanceAfter: wallet.lockedBalance,
      reason: input.reason,
      referenceType: input.referenceType ?? ReferenceType.SYSTEM,
      referenceId: input.referenceId,
      idempotencyKey: input.idempotencyKey ?? randomUUID(),
      metadata: input.metadata,
    },
  });
}

export async function getWalletSummary(userId: string) {
  return prisma.creditWallet.findUnique({
    where: { userId },
    include: {
      entries: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });
}

export async function grantCredits(input: CreditMutationInput) {
  assertPositiveAmount(input.amount);

  return withCreditTransaction(async (tx) => {
    const existing = await findExistingLedgerEntry(tx, input.idempotencyKey);
    if (existing) {
      return existing;
    }

    const wallet = await getWalletOrThrow(tx, input.userId);
    const updatedWallet = await tx.creditWallet.update({
      where: { id: wallet.id },
      data: {
        balance: {
          increment: input.amount,
        },
      },
    });

    return appendLedgerEntry(tx, updatedWallet, {
      ...input,
      type: CreditLedgerType.CREDIT_GRANTED,
      amount: input.amount,
    });
  });
}

export async function reserveCredits(input: CreditMutationInput) {
  assertPositiveAmount(input.amount);

  return withCreditTransaction(async (tx) => {
    const existing = await findExistingLedgerEntry(tx, input.idempotencyKey);
    if (existing) {
      return existing;
    }

    const wallet = await getWalletOrThrow(tx, input.userId);

    if (wallet.balance < input.amount) {
      throw new InsufficientCreditsError();
    }

    const updatedWallet = await tx.creditWallet.update({
      where: { id: wallet.id },
      data: {
        balance: {
          decrement: input.amount,
        },
        lockedBalance: {
          increment: input.amount,
        },
      },
    });

    return appendLedgerEntry(tx, updatedWallet, {
      ...input,
      type: CreditLedgerType.CREDIT_RESERVED,
      amount: -input.amount,
    });
  });
}

export async function consumeReservedCredits(input: CreditMutationInput) {
  assertPositiveAmount(input.amount);

  return withCreditTransaction(async (tx) => {
    const existing = await findExistingLedgerEntry(tx, input.idempotencyKey);
    if (existing) {
      return existing;
    }

    const wallet = await getWalletOrThrow(tx, input.userId);

    if (wallet.lockedBalance < input.amount) {
      throw new Error("확정할 예약 크레딧이 부족합니다.");
    }

    const updatedWallet = await tx.creditWallet.update({
      where: { id: wallet.id },
      data: {
        lockedBalance: {
          decrement: input.amount,
        },
      },
    });

    return appendLedgerEntry(tx, updatedWallet, {
      ...input,
      type: CreditLedgerType.CREDIT_CONSUMED,
      amount: 0,
    });
  });
}

export async function releaseReservedCredits(input: CreditMutationInput) {
  assertPositiveAmount(input.amount);

  return withCreditTransaction(async (tx) => {
    const existing = await findExistingLedgerEntry(tx, input.idempotencyKey);
    if (existing) {
      return existing;
    }

    const wallet = await getWalletOrThrow(tx, input.userId);

    if (wallet.lockedBalance < input.amount) {
      throw new Error("복구할 예약 크레딧이 부족합니다.");
    }

    const updatedWallet = await tx.creditWallet.update({
      where: { id: wallet.id },
      data: {
        balance: {
          increment: input.amount,
        },
        lockedBalance: {
          decrement: input.amount,
        },
      },
    });

    return appendLedgerEntry(tx, updatedWallet, {
      ...input,
      type: CreditLedgerType.CREDIT_RELEASED,
      amount: input.amount,
    });
  });
}
