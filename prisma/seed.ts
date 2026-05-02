import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: { email: "alice@example.com", displayName: "Alice", zipCode: "10001" },
  });
  const user2 = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: { email: "bob@example.com", displayName: "Bob", zipCode: "94103" },
  });

  await prisma.bulkBuy.createMany({
    data: [
      {
        organizerId: user1.id,
        title: "Costco Organic Olive Oil 2L",
        description: "Extra virgin organic olive oil from Costco. 2-liter bottle, great quality.",
        store: "COSTCO",
        totalPrice: 19.99,
        totalQuantity: 4,
        unitLabel: "bottle",
        splitsNeeded: 4,
        pickupNotes: "UES Manhattan, available weekends",
        zipCode: "10001",
      },
      {
        organizerId: user2.id,
        title: "Sam's Club Paper Towels 30-pack",
        description: "Bounty Select-A-Size paper towels, 30 double rolls.",
        store: "SAMS_CLUB",
        totalPrice: 24.98,
        totalQuantity: 30,
        unitLabel: "roll",
        splitsNeeded: 3,
        pickupNotes: "SoMa SF, contact by email",
        zipCode: "94103",
      },
      {
        organizerId: user1.id,
        title: "Costco Parmigiano Reggiano 2lb",
        description: "Aged 24 months, imported. Costco bulk wheel portion.",
        store: "COSTCO",
        totalPrice: 21.99,
        totalQuantity: 2,
        unitLabel: "lb",
        splitsNeeded: 2,
        pickupNotes: "Midtown, weekday evenings",
        zipCode: "10001",
      },
      {
        organizerId: user2.id,
        title: "BJ's Kirkland Signature Coffee 3lb",
        description: "Dark roast whole bean coffee, 3 lb bag.",
        store: "BJS",
        totalPrice: 18.49,
        totalQuantity: 3,
        unitLabel: "lb",
        splitsNeeded: 3,
        pickupNotes: "Chicago Loop area",
        zipCode: "60601",
      },
    ],
  });

  console.log("Seed complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
