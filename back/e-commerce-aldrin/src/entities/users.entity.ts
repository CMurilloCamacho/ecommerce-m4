import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders.entity';

@Entity({
  name: 'USERS',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  password: string;
  @Column({
    type: 'text',
  })
  phone: number;
  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;
  @Column({
    type: 'text',
  })
  address: string;
  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({    name: 'ORDERS_ID'  })
  orders: Orders[]
}
