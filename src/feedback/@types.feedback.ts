import { z } from "zod";

export const createFeedbackBodySchema = z.object({
  user_name: z.string(),
  feedback: z.string(),
})

export type CreateFeedbackBodySchema = z.infer<typeof createFeedbackBodySchema>
