import {
  Link,
  Form,
  redirect,
  useActionData,
  LoaderFunctionArgs,
  useLoaderData,
  type ActionFunctionArgs,
} from 'react-router-dom'
import { ErrorMessage } from '../components/ErrorMessage'
import { ProductForm } from '../components/ProductForm'
import { getProductByID, updateProduct } from '../services/product-service'
import { Product } from '../types'

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductByID(Number(params.id))

    if (!product) {
      return redirect('/')
    }

    return product
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  let error = ''

  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios'
  }

  if (error.length) {
    return error
  }

  if (params.id !== undefined) {
    await updateProduct(data, Number(params.id))
    return redirect('/')
  }
}

const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false },
]

export default function EditProduct() {
  const product = useLoaderData() as Product
  const error = useActionData() as string
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Editar Productos
        </h2>

        <Link
          to="/"
          className="bg-indigo-600 text-white px-4 shadow-sm hover:bg-indigo-500 rounded-md py-2"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        <ProductForm product={product} />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  )
}
