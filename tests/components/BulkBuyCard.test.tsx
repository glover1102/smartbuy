import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BulkBuyCard } from "@/src/components/BulkBuyCard";

const mockBuy = {
  id: "test-id",
  title: "Costco Olive Oil",
  store: "COSTCO",
  totalPrice: "19.99",
  splitsNeeded: 4,
  splitsClaimed: 2,
  unitLabel: "bottle",
  zipCode: "10001",
  status: "OPEN",
  organizer: { displayName: "Alice" },
};

describe("BulkBuyCard", () => {
  it("renders the title", () => {
    render(<BulkBuyCard buy={mockBuy} />);
    expect(screen.getByText("Costco Olive Oil")).toBeInTheDocument();
  });

  it("renders the store badge", () => {
    render(<BulkBuyCard buy={mockBuy} />);
    expect(screen.getByText("Costco")).toBeInTheDocument();
  });

  it("renders the per-person price", () => {
    render(<BulkBuyCard buy={mockBuy} />);
    expect(screen.getByText("$5.00")).toBeInTheDocument();
  });

  it("renders the ZIP code", () => {
    render(<BulkBuyCard buy={mockBuy} />);
    expect(screen.getByText(/10001/)).toBeInTheDocument();
  });

  it("renders organizer name", () => {
    render(<BulkBuyCard buy={mockBuy} />);
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
  });

  it("renders progress bar", () => {
    render(<BulkBuyCard buy={mockBuy} />);
    expect(screen.getByText(/2 \/ 4 splits claimed/)).toBeInTheDocument();
  });
});
