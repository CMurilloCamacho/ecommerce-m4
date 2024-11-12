import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from './orderDetails.entity';
import { Users } from './users.entity';

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails = OrderDetails;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'USER_ID' })
  user: Users;
}
