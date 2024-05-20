import {
  Link,
  Form,
  useActionData,
  redirect,
  type ActionFunctionArgs,
} from 'react-router-dom'
import { ErrorMessage } from '../components/ErrorMessage'
import { ProductForm } from '../components/ProductForm'
import { addProduct } from '../services/product-service'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  let error = ''

  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios'
  }

  if (error.length) {
    return error
  }

  await addProduct(data)

  return redirect('/')
}

export default function NewProductPage() {
  const error = useActionData() as string
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>

        <Link
          to="/"
          className="bg-indigo-600 text-white px-4 shadow-sm hover:bg-indigo-500 rounded-md py-2"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        <ProductForm />

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  )
}
