import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1776932874525 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        date TIMESTAMP,
        discount NUMERIC,
        customer_name VARCHAR(255),
        status VARCHAR(50)
    );
    `);

    await queryRunner.query(`
      CREATE TABLE order_details (
        id SERIAL,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT DEFAULT 0,

        PRIMARY KEY (order_id, product_id),

        FOREIGN KEY (order_id)
          REFERENCES orders(id)
          ON DELETE CASCADE,

        FOREIGN KEY (product_id)
          REFERENCES product(id)
          ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE order_details`);
    await queryRunner.query(`DROP TABLE orders`);
  }
}
