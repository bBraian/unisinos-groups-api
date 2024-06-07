import { createLinkBodySchema } from "src/link/@types.type";
import { z } from "zod";

export const createSubjectBodySchema = z.object({
  course: z.number(),
  title: z.string(),
  image: z.string(),
  whatsappLinks: z.array(createLinkBodySchema),
  driveLinks: z.array(createLinkBodySchema)
})

export type CreateSubjectBodySchema = z.infer<typeof createSubjectBodySchema>
