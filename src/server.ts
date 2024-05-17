import express, { Application } from 'express'
import colors from 'colors'
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

const app: Application = express()
app.use(express.json())

app.use('/api/products', productRoutes)

export default app
