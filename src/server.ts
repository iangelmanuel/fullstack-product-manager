import express, { Application } from 'express'
import colors from 'colors'
import productRoutes from './router/productRoutes'
import db from './config/db'

async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(
      colors.magenta(
        'Connection has been established successfully.'
      )
    )
  } catch (error) {
    console.log(colors.red.bold(`Error: , ${error}`))
  }
}

connectDB()

const app: Application = express()

app.use('/', productRoutes)

export default app
