import { z } from "zod";

export const createLinkBodySchema = z.object({
  title: z.string().trim().min(1, { message: "Required" }),
  link: z.string().trim().min(1, { message: "Required" }),
  type: z.string().trim().min(1, { message: "Required" }),
  subjectId: z.number()
})

export type CreateLinkBodySchema = z.infer<typeof createLinkBodySchema>

export const updateLinkBodySchema = z.object({
  title: z.string().trim().min(1, { message: "Required" }),
  link: z.string().trim().min(1, { message: "Required" }),
  type: z.string().trim().min(1, { message: "Required" }),
  subjectId: z.number()
})

export type UpdateLinkBodySchema = z.infer<typeof updateLinkBodySchema>
