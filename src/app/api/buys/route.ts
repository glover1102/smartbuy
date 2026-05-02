import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { CreateBulkBuySchema } from "@/src/lib/zod-schemas";
import { BuyStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip");

  const buys = await prisma.bulkBuy.findMany({
    where: {
      status: { not: BuyStatus.CANCELLED },
      ...(zip ? { zipCode: zip } : {}),
    },
    include: {
      organizer: { select: { displayName: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(buys);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = CreateBulkBuySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation error", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const buy = await prisma.bulkBuy.create({
    data: {
      ...parsed.data,
      itemUrl: parsed.data.itemUrl || null,
      organizerId: session.user.id,
    },
  });

  return NextResponse.json(buy, { status: 201 });
}
