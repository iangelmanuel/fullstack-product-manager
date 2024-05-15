import express, { Application } from 'express'
import productRoutes from './router/productRoutes'
import db from './config/db'
import dotenv from 'dotenv'

dotenv.config()

async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.log('Error: ', error)
  }
}

connectDB()

const app: Application = express()

app.use('/', productRoutes)

export default app
