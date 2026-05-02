import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { StatusUpdateSchema } from "@/src/lib/zod-schemas";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const buy = await prisma.bulkBuy.findUnique({ where: { id: params.id } });
  if (!buy) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (buy.organizerId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = StatusUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  const updated = await prisma.bulkBuy.update({
    where: { id: params.id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json(updated);
}
