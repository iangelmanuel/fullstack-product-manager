import { createBrowserRouter } from 'react-router-dom'

import Layout from './Layouts/Layout'

import ProductPage from './pages/Product'
import NewProductPage from './pages/NewProduct'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductPage />,
      },
      {
        path: 'product/nuevo',
        element: <NewProductPage />,
      },
    ],
  },
])

export default router
