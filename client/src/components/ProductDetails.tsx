import type { Product } from '../types'
import { formatCurrency } from '../utils/formatCurrency'

type ProductDetailsProps = {
  product: Product
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const isAvailable = product.availability ? 'Disponible' : 'No disponible'
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>

      <td className="p-3 text-lg text-gray-800">{product.price}</td>

      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>

      <td className="p-3 text-lg text-gray-800">{isAvailable}</td>
    </tr>
  )
}
