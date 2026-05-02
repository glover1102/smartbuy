import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const buy = await prisma.bulkBuy.findUnique({
    where: { id },
    include: {
      organizer: { select: { displayName: true, email: true } },
      claims: {
        include: { user: { select: { displayName: true, email: true } } },
        orderBy: { createdAt: "asc" },
      },
      comments: {
        include: { user: { select: { displayName: true, email: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!buy) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(buy);
}
