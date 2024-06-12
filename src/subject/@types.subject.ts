import { z } from "zod";

const createLinkBodySchema = z.object({
  title: z.string().trim().min(1, { message: "Required" }),
  link: z.string().trim().min(1, { message: "Required" }),
  type: z.string().trim().min(1, { message: "Required" })
})

export const createSubjectBodySchema = z.object({
  course: z.number().min(1, { message: "Required" }),
  title: z.string().trim().min(1, { message: "Required" }),
  image: z.string().optional(),
  whatsappLinks: z.array(createLinkBodySchema),
  driveLinks: z.array(createLinkBodySchema)
})

export type CreateSubjectBodySchema = z.infer<typeof createSubjectBodySchema>
