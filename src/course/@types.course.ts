import { z } from "zod";

export const createCourseBodySchema = z.object({
  name: z.string()
})

export type CreateCourseBodySchema = z.infer<typeof createCourseBodySchema>
