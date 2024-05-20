import {
  Link,
  Form,
  ActionFunctionArgs,
  redirect,
  useFetcher,
} from 'react-router-dom'
import { deleteProduct } from '../services/product-service'
import type { Product } from '../types'
import { formatCurrency } from '../utils/formatCurrency'

type ProductDetailsProps = {
  product: Product
}

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id)
    return redirect('/')
  }
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const fetcher = useFetcher()
  const isAvailable = product.availability ? 'Available' : 'Not available'
  const checkAvailability = product.availability ? true : false
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>

      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>

      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${checkAvailability ? 'text-black' : 'text-red-500'} rounded-lg p-2 text-sm font-bold text-center w-full border border-black-100 cursor-pointer`}
          >
            {isAvailable}
          </button>
        </fetcher.Form>
      </td>

      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 items-center">
          <Link
            to={`/products/${product.id}/edit`}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Editar
          </Link>

          <Form
            method="POST"
            action={`products/${product.id}/delete`}
            className="w-full"
            onSubmit={(e) => {
              if (!confirm('¿Estás seguro de eliminar este producto?')) {
                e.preventDefault()
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            />
          </Form>
        </div>
      </td>
    </tr>
  )
}
