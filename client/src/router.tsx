import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layouts/Layout'
import { action as deleteProductAction } from './components/ProductDetails'
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from './pages/EditProduct'
import NewProductPage, {
  action as newProductAction,
} from './pages/NewProduct'
import ProductPage, {
  loader as productLoader,
  action as updateAvailabilityAction,
} from './pages/Product'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductPage />,
        loader: productLoader,
        action: updateAvailabilityAction,
      },
      {
        path: 'products/create',
        element: <NewProductPage />,
        action: newProductAction,
      },
      {
        path: 'products/:id/edit',
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: 'products/:id/delete',
        action: deleteProductAction,
      },
    ],
  },
])

export default router
