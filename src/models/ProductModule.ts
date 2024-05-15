import {
  Table,
  Column,
  Model,
  DataType
} from 'sequelize-typescript'

@Table({
  tableName: 'products'
})

class Product extends Model {
  @Column({
    type: DataType.STRING(100)
  })
  name: string

  @Column({
    type: DataType.FLOAT(6, 2)
  })
  price: number

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  availability: boolean
}

export default Product