import { Router } from 'express'
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from '../handlers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware'

const router: Router = Router()

router.get('/', getProducts)

router.get('/:id',
  param('id')
    .isInt().withMessage('ID must be a number'),

  handleInputErrors,
  getProductById
)

router.post('/',
  body('name')
    .notEmpty().withMessage('Name is required'),

  body('price')
    .notEmpty().withMessage('Name is required')
    .isNumeric().withMessage('Price must be a number')
    .custom((value) => value > 0).withMessage('Price must be greater than 0'),

  handleInputErrors,
  createProduct
)

router.put('/:id',
  param('id')
    .isInt().withMessage('ID must be a number'),

  body('name')
    .notEmpty().withMessage('Name is required'),

  body('price')
    .notEmpty().withMessage('Name is required')
    .isNumeric().withMessage('Price must be a number')
    .custom((value) => value > 0).withMessage('Price must be greater than 0'),

  body('availability')
    .isBoolean().withMessage('Availability must be a boolean'),

  handleInputErrors,
  updateProduct
)

router.patch('/:id',
  param('id')
    .isInt().withMessage('ID must be a number'),

  body('availability')
    .isBoolean().withMessage('Availability must be a boolean'),

  handleInputErrors,
  updateProduct
)

router.delete('/:id',
  param('id')
    .isInt().withMessage('ID must be a number'),

  handleInputErrors,
  deleteProduct
)

export default router
