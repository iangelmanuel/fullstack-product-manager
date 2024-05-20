import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom'
import { ProductDetails } from '../components/ProductDetails'
import {
  getProducts,
  toggleAvailability,
} from '../services/product-service'
import { Product } from '../types'

export async function loader() {
  const products = await getProducts()
  return products ?? []
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await toggleAvailability(+data.id)
  return null
}

export default function ProductPage() {
  const products = useLoaderData() as Product[]
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>

        <Link
          to="/products/create"
          className="bg-indigo-600 text-white px-4 shadow-sm hover:bg-indigo-500 rounded-md py-2"
        >
          Crear Producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
