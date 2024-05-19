import { object, string, number } from 'valibot'

export const DraftProductSchema = object({
  name: string(),
  price: number()
})
