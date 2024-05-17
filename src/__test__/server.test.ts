import app, { connectDB } from '../server'
import db from '../config/db'

jest.mock('../config/db')

describe('connectDB', () => {
  it('should connect to the database', async () => {
    jest.spyOn(db, 'authenticate').mockRejectedValueOnce(
      new Error('Unable to connect to the database')
    )

    const consoleSpy = jest.spyOn(console, 'log')

    await connectDB()

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unable to connect to the database')
    )
  })
})
