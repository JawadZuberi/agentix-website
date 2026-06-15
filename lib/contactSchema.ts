import { z } from "zod";

/** Shared by the client form and the API route so validation stays in sync. */
export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Tell us a little more (10+ characters)."),
  // Honeypot — humans never see this field. If it's filled, the API route
  // silently accepts and drops the request (no 422, so bots learn nothing).
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const budgets = [
  "Not sure yet",
  "< $10k",
  "$10k–$25k",
  "$25k–$50k",
  "$50k+",
] as const;
