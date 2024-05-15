import Product from "../models/ProductModule"
import colors from "colors"
import type { Request, Response } from "express"

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
    })

    return res.status(200).json({ data: products })
  } catch (error) {
    console.log(colors.red.bold(`Error: ${error}`))
    return res.status(500).json(error)
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    return res.status(200).json({ data: product })
  } catch (error) {
    console.log(colors.red.bold(`Error: ${error}`))
    return res.status(500).json(error)
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body)

    return res.status(201).json({ data: product })
  } catch (error) {
    console.log(colors.red.bold(`Error: ${error}`))
    return res.status(500).json(error)
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    await product.update(req.body)
    await product.save()

    return res.status(200).json({ data: product })
  } catch (error) {
    console.log(colors.red.bold(`Error: ${error}`))
    return res.status(500).json(error)
  }
}

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    product.availability = !product.dataValues.availability
    await product.save()

    return res.status(200).json({ data: product })
  } catch (error) {
    console.log(colors.red.bold(`Error: ${error}`))
    return res.status(500).json(error)
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    await product.destroy()

    return res.status(200).json({
      data: product,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.log(colors.red.bold(`Error: ${error}`))
    return res.status(500).json(error)
  }
}
