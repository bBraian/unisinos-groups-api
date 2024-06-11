import { z } from "zod";

const createLinkBodySchema = z.object({
  title: z.string(),
  link: z.string(),
  type: z.string(),
})

export const createSubjectBodySchema = z.object({
  course: z.number(),
  title: z.string(),
  image: z.string(),
  whatsappLinks: z.array(createLinkBodySchema),
  driveLinks: z.array(createLinkBodySchema)
})

export type CreateSubjectBodySchema = z.infer<typeof createSubjectBodySchema>
