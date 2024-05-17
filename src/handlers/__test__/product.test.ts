import request from 'supertest'
import app from '../../server'

describe('POST /api/products', () => {
  it('should display validation errors', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({})

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body.errors).toHaveLength(4)

    expect(res.status).not.toEqual(404)
    expect(res.body.errors).not.toHaveLength(2)
  })

  it('should validate that the price is grater than 0', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Product - Testing',
        price: 0
      })

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body.errors).toHaveLength(1)

    expect(res.status).not.toEqual(404)
    expect(res.body.errors).not.toHaveLength(2)
  })

  it('should validate that the price is a number and greater than 0', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Product - Testing',
        price: 'hello'
      })

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body.errors).toHaveLength(2)

    expect(res.status).not.toEqual(404)
    expect(res.body.errors).not.toHaveLength(4)
  })

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Product - Testing',
        price: 50
      })

    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty('data')

    expect(res.status).not.toEqual(404)
    expect(res.status).not.toEqual(200)
    expect(res.status).not.toHaveProperty('errors')
  })
})

describe('GET /api/products', () => {
  it('should check if api/products url exists', async () => {
    const res = await request(app).get('/api/products')
    expect(res.status).not.toEqual(404)
  })

  it('should fetch all products', async () => {
    const res = await request(app).get('/api/products')

    expect(res.status).toEqual(200)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.body.data).toHaveLength(1)

    expect(res.status).not.toEqual(404)
    expect(res.body).not.toHaveProperty('errors')
  })
})

describe('GET /api/products/:id', () => {
  it(
    'should return a 404 response for a non-existent product',
    async () => {
      const productId = 10000
      const res = await request(app)
        .get(`/api/products/${productId}`)

      expect(res.status).toEqual(404)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('Product not found')
    }
  )

  it('should check a valid ID in the URL', async () => {
    const res = await request(app).get('/api/products/not-valid-url')

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body.errors).toHaveLength(1)
    expect(res.body.errors[0].msg).toBe('ID must be a number')
  })

  it('get a JSON response for a single product', async () => {
    const res = await request(app).get('/api/products/1')

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('data')
  })
})

describe('PUT /api/products/:id', () => {
  it('should check a valid ID in the URL', async () => {
    const res = await request(app)
      .put('/api/products/not-valid-url')
      .send({
        name: 'Product - Testing',
        availability: true,
        price: 50
      })

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body.errors).toHaveLength(1)
    expect(res.body.errors[0].msg).toBe('ID must be a number')
  })

  it(
    'should display validation error messages when updating a product',
    async () => {
      const res = await request(app)
        .put('/api/products/1')
        .send({})

      expect(res.status).toEqual(400)
      expect(res.body).toHaveProperty('errors')
      expect(res.body.errors).toBeTruthy()
      expect(res.body.errors).toHaveLength(5)

      expect(res.status).not.toBe(200)
      expect(res.body).not.toHaveProperty('data')
    }
  )

  it(
    'should validate that the price is grter than 0',
    async () => {
      const res = await request(app)
        .put('/api/products/1')
        .send({
          name: 'Product - Testing',
          availability: true,
          price: 0
        })

      expect(res.status).toEqual(400)
      expect(res.body).toHaveProperty('errors')
      expect(res.body.errors).toBeTruthy()
      expect(res.body.errors).toHaveLength(1)
      expect(res.body.errors[0].msg).toBe('Price must be greater than 0')

      expect(res.status).not.toBe(200)
      expect(res.body).not.toHaveProperty('data')
    }
  )

  it(
    'should return a 404 response for a non-existent product',
    async () => {
      const productId = 10000
      const res = await request(app)
        .put(`/api/products/${productId}`)
        .send({
          name: 'Product - Testing',
          availability: true,
          price: 50
        })

      expect(res.status).toEqual(404)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('Product not found')

      expect(res.status).not.toBe(200)
      expect(res.body).not.toHaveProperty('data')
    }
  )

  it(
    'should update an existing product with valid data',
    async () => {
      const res = await request(app)
        .put('/api/products/1')
        .send({
          name: 'Product - Testing',
          availability: true,
          price: 50
        })

      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('data')

      expect(res.status).not.toBe(400)
      expect(res.body).not.toHaveProperty('errors')
    }
  )
})

describe('PATCH /api/products/:id', () => {
  it(
    'should return a 404 response for a non-existent product',
    async () => {
      const productId = 10000
      const res = await request(app)
        .patch(`/api/products/${productId}`)

      expect(res.status).toEqual(404)
      expect(res.body).toHaveProperty('error')
      expect(res.body.error).toBe('Product not found')

      expect(res.status).not.toEqual(200)
      expect(res.body).not.toHaveProperty('data')
    }
  )

  it('should update the product availability', async () => {
    const res = await request(app)
      .patch('/api/products/1')

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toHaveProperty('availability')

    expect(res.status).not.toEqual(404)
    expect(res.status).not.toEqual(400)
    expect(res.body).not.toHaveProperty('error')
  })
})

describe('DELETE /api/products/:id', () => {
  it('should check a valid ID', async () => {
    const res = await request(app)
      .delete('/api/products/not-valid')

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('errors')
    expect(res.body.errors[0].msg).toBe('ID must be a number')
  })

  it('should return a 404 response for a non-existent product', async () => {
    const productId = 10000
    const res = await request(app).delete(`/api/products/${productId}`)

    expect(res.status).toEqual(404)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toBe('Product not found')

    expect(res.status).not.toEqual(200)
  })

  it('should delete a product', async () => {
    const res = await request(app).delete('/api/products/1')

    expect(res.status).toEqual(200)
    expect(res.body.message).toEqual('Product deleted successfully')

    expect(res.status).not.toEqual(404)
    expect(res.status).not.toEqual(400)
  })
})
