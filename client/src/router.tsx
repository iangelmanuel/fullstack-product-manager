import { createBrowserRouter } from 'react-router-dom'

import Layout from './Layouts/Layout'
import NewProductPage from './pages/NewProduct'
import ProductPage from './pages/Product'

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
        path: 'product/create',
        element: <NewProductPage />,
      },
    ],
  },
])

export default router
