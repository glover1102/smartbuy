import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { ClaimSchema } from "@/src/lib/zod-schemas";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = ClaimSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  const { id } = await params;
  const buy = await prisma.bulkBuy.findUnique({ where: { id } });
  if (!buy || buy.status !== "OPEN") {
    return NextResponse.json({ error: "Buy not available" }, { status: 400 });
  }

  const claim = await prisma.claim.upsert({
    where: { bulkBuyId_userId: { bulkBuyId: id, userId: session.user.id } },
    create: { bulkBuyId: id, userId: session.user.id, quantity: parsed.data.quantity },
    update: { quantity: parsed.data.quantity },
  });

  const claimCount = await prisma.claim.count({ where: { bulkBuyId: id } });
  const newStatus = claimCount >= buy.splitsNeeded ? "FULL" : "OPEN";
  await prisma.bulkBuy.update({
    where: { id },
    data: { splitsClaimed: claimCount, status: newStatus },
  });

  return NextResponse.json(claim, { status: 201 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.claim.delete({
    where: { bulkBuyId_userId: { bulkBuyId: id, userId: session.user.id } },
  });

  const claimCount = await prisma.claim.count({ where: { bulkBuyId: id } });
  await prisma.bulkBuy.update({
    where: { id },
    data: { splitsClaimed: claimCount, status: "OPEN" },
  });

  return new NextResponse(null, { status: 204 });
}
