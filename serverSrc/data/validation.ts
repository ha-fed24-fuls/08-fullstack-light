import * as z from 'zod'

export const MovieWithoutIdSchema = z.object({
	title: z.string(),
	premiere: z.number().min(1900)
})

// MovieWithoutIdSchema.safeParse
