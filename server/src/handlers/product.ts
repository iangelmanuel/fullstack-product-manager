import Product from "../models/ProductModule"
import type { Request, Response } from "express"

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [['createdAt', 'DESC']],
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })

  return res.status(200).json({ data: products })
}

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findByPk(id)

  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }

  return res.status(200).json({ data: product })
}

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body)

  return res.status(201).json({ data: product })
}

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findByPk(id)

  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }

  await product.update(req.body)
  await product.save()

  return res.status(200).json({ data: product })
}

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findByPk(id)

  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }

  product.availability = !product.dataValues.availability
  await product.save()

  return res.status(200).json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findByPk(id)

  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }

  await product.destroy()

  return res.status(200).json({
    data: product,
    message: 'Product deleted successfully'
  })
}
