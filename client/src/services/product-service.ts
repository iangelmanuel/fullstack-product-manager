import { DraftProductSchema } from '../types'
import { safeParse } from 'valibot'
import axios from 'axios'

type ProductData = {
  [k: string]: FormDataEntryValue
}

export const addProduct = async (product: ProductData) => {
  try {
    const res = safeParse(DraftProductSchema, {
      name: product.name,
      price: Number(product.price)
    })

    if (!res.success) {
      throw new Error('Invalid product data')
    }

    const url = `${import.meta.env.VITE_API_URL}/products`
    await axios.post(url, {
      name: res.output.name,
      price: res.output.price
    })
  } catch (error) {
    console.error(error)
  }
}
