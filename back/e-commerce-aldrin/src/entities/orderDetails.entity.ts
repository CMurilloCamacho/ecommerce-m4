import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";
import { Orders } from "./orders.entity";

@Entity({
  name: 'ORDERDETAILS'
})
export class OrderDetails {

  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  price: number


@ManyToMany(()=>Products)
@JoinTable({
  name: 'ORDER_DETAILS_PRODUCTS'
})
products: Products[]

@OneToOne(()=>Orders, order=>order.orderDetails)
@JoinColumn({
  name: 'order_id'
})
order : Orders

}