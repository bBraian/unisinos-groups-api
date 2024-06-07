import { z } from "zod";

export const createLinkBodySchema = z.object({
  title: z.string(),
  link: z.string(),
  type: z.string(),
  subjectId: z.number()
})

export type CreateLinkBodySchema = z.infer<typeof createLinkBodySchema>

export const updateLinkBodySchema = z.object({
  title: z.string(),
  link: z.string(),
  type: z.string(),
  subjectId: z.number()
})

export type UpdateLinkBodySchema = z.infer<typeof updateLinkBodySchema>
