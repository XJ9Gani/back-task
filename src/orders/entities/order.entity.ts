import { OrderDetails } from 'src/order_details/entity/order_details.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: string;

  @Column()
  discount: number;

  @Column()
  customer_name: string;

  @Column()
  status: string;

  @OneToMany(() => OrderDetails, (d) => d.order, {
    cascade: true,
  })
  details: OrderDetails[];
}
