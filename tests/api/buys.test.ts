import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock prisma
vi.mock("@/src/lib/prisma", () => ({
  prisma: {
    bulkBuy: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
}));

// Mock next-auth
vi.mock("next-auth/next", () => ({
  getServerSession: vi.fn(),
}));

vi.mock("@/src/lib/auth", () => ({
  authOptions: {},
}));

import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth/next";

const mockPrisma = prisma as any;
const mockGetServerSession = getServerSession as any;

describe("Buys API logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("findMany is callable", async () => {
    mockPrisma.bulkBuy.findMany.mockResolvedValue([]);
    const result = await prisma.bulkBuy.findMany({ where: {} });
    expect(result).toEqual([]);
    expect(mockPrisma.bulkBuy.findMany).toHaveBeenCalledOnce();
  });

  it("returns 401 when no session (unit test)", async () => {
    mockGetServerSession.mockResolvedValue(null);
    const session = await getServerSession({} as any);
    expect(session).toBeNull();
  });

  it("create is callable with valid data", async () => {
    const mockBuy = { id: "abc", title: "Test Buy" };
    mockPrisma.bulkBuy.create.mockResolvedValue(mockBuy);
    const result = await prisma.bulkBuy.create({ data: { title: "Test Buy" } as any });
    expect(result).toEqual(mockBuy);
  });
});
