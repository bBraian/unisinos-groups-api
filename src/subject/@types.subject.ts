import { z } from "zod";

export const createSubjectBodySchema = z.object({
  course: z.number(),
  title: z.string(),
  image: z.string()
})

export type CreateSubjectBodySchema = z.infer<typeof createSubjectBodySchema>
