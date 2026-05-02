import { z } from "zod";

export const CreateBulkBuySchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  store: z.enum(["COSTCO", "SAMS_CLUB", "BJS", "OTHER"]),
  itemUrl: z.string().url().optional().or(z.literal("")),
  totalPrice: z.coerce.number().positive(),
  totalQuantity: z.coerce.number().int().positive(),
  unitLabel: z.string().min(1).max(50),
  splitsNeeded: z.coerce.number().int().min(2).max(100),
  pickupNotes: z.string().min(5).max(500),
  zipCode: z.string().regex(/^\d{5}$/, "Must be a 5-digit ZIP code"),
});

export const ClaimSchema = z.object({
  quantity: z.coerce.number().int().min(1),
});

export const CommentSchema = z.object({
  body: z.string().min(1).max(1000),
});

export const StatusUpdateSchema = z.object({
  status: z.enum(["OPEN", "FULL", "PURCHASED", "COMPLETED", "CANCELLED"]),
});

export type CreateBulkBuyInput = z.infer<typeof CreateBulkBuySchema>;
export type ClaimInput = z.infer<typeof ClaimSchema>;
export type CommentInput = z.infer<typeof CommentSchema>;
export type StatusUpdateInput = z.infer<typeof StatusUpdateSchema>;
