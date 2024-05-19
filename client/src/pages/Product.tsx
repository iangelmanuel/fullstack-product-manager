import { Link } from 'react-router-dom'

export default function ProductPage() {
  return (
    <div className="flex justify-between">
      <h2 className="text-4xl font-black text-slate-500">Productos</h2>

      <Link
        to="/product/create"
        className="bg-indigo-600 text-white px-4 shadow-sm hover:bg-indigo-500 rounded-md py-2"
      >
        Crear Producto
      </Link>
    </div>
  )
}
