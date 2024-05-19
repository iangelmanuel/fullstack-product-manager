import express, { Application } from 'express'
import colors from 'colors'
import cors, { type CorsOptions } from 'cors'
import swaggerUI from 'swagger-ui-express'
import { swaggerSpec, swaggerUiOptions } from './config/swagger'
import productRoutes from './router/productRoutes'
import db from './config/db'

export async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(
      colors.magenta(
        'Connection has been established successfully.'
      )
    )
  } catch (error) {
    console.log(colors.red.bold('Unable to connect to the database'))
  }
}

connectDB()

// EXPRESS APP
const app: Application = express()

// CORS OPTIONS
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (
      process.env.NODE_ENV === 'production' &&
      origin === process.env.FRONTEND_URL
    ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// CORS
app.use(cors(corsOptions))

// MIDDLEWARE
app.use(express.json())

// ROUTES
app.use('/api/products', productRoutes)

// DOCS
app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUiOptions)
)

export default app
