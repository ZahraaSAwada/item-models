// src/repository/Toy.repository.ts
import { Pool } from "pg";
import { config } from "../config";
import { Toy } from "../models/Toy.model";
import { IRepository, id } from "./IRepository";

export class ToyRepository implements IRepository<Toy> {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({ connectionString: config.databaseUrl });
  }

  async closePool(): Promise<void> {
    await this.pool.end();
  }
  
  async init(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS toys (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        made_in TEXT NOT NULL,
        price INTEGER NOT NULL,
        size INTEGER NOT NULL,
        age INTEGER NOT NULL
      )
    `;
    await this.pool.query(query);
  }

  async create(item: Toy): Promise<id> {
    const query = `
      INSERT INTO toys (type, made_in, price, size, age)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const values = [
      item.getType(),
      item.getMadeIn(),
      item.getPrice(),
      item.getSize(),
      item.getAge(),
    ];
    const result = await this.pool.query(query, values);
    return String(result.rows[0].id);
  }

  async get(id: id): Promise<Toy> {
    const query = `SELECT * FROM toys WHERE id = $1`;
    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error(`Toy with id ${id} not found`);
    }

    const row = result.rows[0];
    return new Toy(row.type, row.made_in, row.price, row.size, row.age);
  }

  async getAll(): Promise<Toy[]> {
    const query = `SELECT * FROM toys`;
    const result = await this.pool.query(query);

    return result.rows.map(
      (row) => new Toy(row.type, row.made_in, row.price, row.size, row.age)
    );
  }

  async update(id: id, item: Toy): Promise<Toy> {
    const query = `
      UPDATE toys
      SET type = $1, made_in = $2, price = $3, size = $4, age = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [
      item.getType(),
      item.getMadeIn(),
      item.getPrice(),
      item.getSize(),
      item.getAge(),
      id,
    ];
    const result = await this.pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Toy with id ${id} not found`);
    }

    const row = result.rows[0];
    return new Toy(row.type, row.made_in, row.price, row.size, row.age);
  }

  async delete(id: id): Promise<void> {
    const query = `DELETE FROM toys WHERE id = $1`;
    const result = await this.pool.query(query, [id]);

    if (result.rowCount === 0) {
      throw new Error(`Toy with id ${id} not found`);
    }
  }
}