import { z } from "zod";

export const createLinkBodySchema = z.object({
  title: z.string().trim().min(1, { message: "Required" }),
  link: z.string().trim().min(1, { message: "Required" }),
  type: z.string().trim().min(1, { message: "Required" }),
  subjectId: z.number(),

})

export const createPrLinkBodySchema = z.object({
  title: z.string().trim().min(1, { message: "Required" }),
  link: z.string().trim().min(1, { message: "Required" }),
  type: z.string().trim().min(1, { message: "Required" }),
  subjectId: z.number(),
  linkId: z.number().nullable(),
  pullRequestId: z.number(),
})

export const createOnePrLinkBodySchema = z.object({
  title: z.string().trim().min(1, { message: "Required" }),
  link: z.string().trim().min(1, { message: "Required" }),
  type: z.string().trim().min(1, { message: "Required" }),
  subjectId: z.number(),
  linkId: z.number().nullable(),
})

export type CreateOnePrLinkBodySchema = z.infer<typeof createOnePrLinkBodySchema>

export type CreatePrLinkBodySchema = z.infer<typeof createPrLinkBodySchema>

export type CreateLinkBodySchema = z.infer<typeof createLinkBodySchema>
