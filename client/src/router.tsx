import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layouts/Layout'
import NewProductPage, {
  action as newProductAction,
} from './pages/NewProduct'
import ProductPage, { loader as productLoader } from './pages/Product'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductPage />,
        loader: productLoader,
      },
      {
        path: 'product/create',
        element: <NewProductPage />,
        action: newProductAction,
      },
    ],
  },
])

export default router
