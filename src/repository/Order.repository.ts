// src/repository/Order.repository.ts
import { Pool } from "pg";
import { config } from "../config";
import { Order } from "../models/Order.model";
import { ItemCategory } from "../models/Item.model";

export class OrderRepository {
  private pool: Pool;

  constructor() {
    // A pool manages a set of reusable database connections for us.
    this.pool = new Pool({ connectionString: config.databaseUrl });
  }

  // Close all pooled connections so the process can exit cleanly.
  async closePool(): Promise<void> {
    await this.pool.end();
  }

  // Create the orders table if it doesn't already exist.
  async init(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        category TEXT NOT NULL,
        price NUMERIC NOT NULL,
        quantity INTEGER NOT NULL,
        item JSONB NOT NULL
      )
    `;
    await this.pool.query(query);
  }

  async create(order: Order): Promise<string> {
    const query = `
      INSERT INTO orders (category, price, quantity, item)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [
      order.getItem().getCategory(),
      order.getPrice(),
      order.getQuantity(),
      JSON.stringify(order.getItem()),
    ];
    const result = await this.pool.query(query, values);
    return String(result.rows[0].id);
  }

  async getAll(): Promise<Order[]> {
    const query = `SELECT * FROM orders`;
    const result = await this.pool.query(query);

    return result.rows.map(
      (row) =>
        new Order(
          row.item,
          Number(row.price),
          row.quantity
        )
    );
  }
}