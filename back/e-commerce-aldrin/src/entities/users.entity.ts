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
    length: 50,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;
  @Column({
    type: 'bigint',
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

  
  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin?: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'ORDERS_ID' })
  orders: Orders[];
}
