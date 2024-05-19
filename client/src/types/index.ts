import { array, object, string, number, boolean, Output } from 'valibot'

export const DraftProductSchema = object({
  name: string(),
  price: number()
})

export const ProductShema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean()
})

export const ProductsSchema = array(ProductShema)
export type Product = Output<typeof ProductShema>
