import { OrderDetails } from 'src/order_details/entity/order_details.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  discount: number;

  @Column()
  customer_name: string;

  @Column()
  status: string;

  @OneToMany(() => OrderDetails, (d) => d.order)
  details: OrderDetails[];
}
