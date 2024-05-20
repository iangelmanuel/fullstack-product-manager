import { DraftProductSchema, ProductsSchema, Product, ProductShema } from '../types'
import { coerce, number, parse, safeParse } from 'valibot'
import axios from 'axios'
import { toBoolean } from '../utils/toBoolean'

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

export const getProducts = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products`
    const { data } = await axios(url)
    const res = safeParse(ProductsSchema, data.data)

    if (!res.success) {
      throw new Error('Invalid products data')
    }

    return res.output
  } catch (error) {
    console.log(error)
  }
}

export const getProductByID = async (id: Product['id']) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/${id}`
    const { data } = await axios(url)
    const res = safeParse(ProductShema, data.data)

    if (!res.success) {
      throw new Error('Invalid products data')
    }

    return res.output
  } catch (error) {
    console.log(error)
  }
}

export const updateProduct = async (data: ProductData, id: Product['id']) => {
  try {
    const NumberSchema = coerce(number(), Number)

    const result = safeParse(ProductShema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString())
    })

    if (!result.success) {
      throw new Error('Invalid product data')
    }

    const url = `${import.meta.env.VITE_API_URL}/products/${id}`
    await axios.put(url, result.output)
  } catch (error) {
    console.log(error)
  }
}

export const deleteProduct = async (id: Product['id']) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/${id}`
    await axios.delete(url)
  } catch (error) {
    console.log(error)
  }
}

export const toggleAvailability = async (id: Product['id']) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/products/${id}`
    await axios.patch(url)
  } catch (error) {
    console.log(error)
  }
}
