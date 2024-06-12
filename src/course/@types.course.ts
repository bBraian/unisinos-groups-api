import { z } from "zod";

export const createCourseBodySchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
})

export type CreateCourseBodySchema = z.infer<typeof createCourseBodySchema>
