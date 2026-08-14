// src/repository/Cake.repository.ts
import { Pool } from "pg";
import { config } from "../config";
import { Cake } from "../models/Cake.model";
import { IRepository, id } from "./IRepository";

export class CakeRepository implements IRepository<Cake> {
  private pool: Pool;

  constructor() {
    // A pool manages a set of reusable database connections for us.
    this.pool = new Pool({ connectionString: config.databaseUrl });
  }

  // Close all pooled connections so the process can exit cleanly.
  async closePool(): Promise<void> {
    await this.pool.end();
  }

  // Create the cakes table if it doesn't already exist.
  async init(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS cakes (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        flavor TEXT NOT NULL,
        filling TEXT NOT NULL,
        size INTEGER NOT NULL,
        layers INTEGER NOT NULL
      )
    `;
    await this.pool.query(query);
  }

  // The five contract methods — empty for now, we fill them one at a time.
  async create(item: Cake): Promise<id> {
     const query = `
      INSERT INTO cakes (type, flavor, filling, size, layers)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const values = [
      item.getType(),
      item.getFlavor(),
      item.getFilling(),
      item.getSize(),
      item.getLayers(),
    ];
    const result = await this.pool.query(query, values);
    return String(result.rows[0].id);
  }
  async get(id: id): Promise<Cake> {
    const query = `SELECT * FROM cakes WHERE id = $1`;
    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error(`Cake with id ${id} not found`);
    }

    const row = result.rows[0];
    return new Cake(row.type, row.flavor, row.filling, row.size, row.layers);
  }
  async getAll(): Promise<Cake[]> {
   const query = `SELECT * FROM cakes`;
    const result = await this.pool.query(query);

    return result.rows.map(
      (row) => new Cake(row.type, row.flavor, row.filling, row.size, row.layers)
    );
  }
  async update(id: id, item: Cake): Promise<Cake> {
       const query = `
      UPDATE cakes
      SET type = $1, flavor = $2, filling = $3, size = $4, layers = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [
      item.getType(),
      item.getFlavor(),
      item.getFilling(),
      item.getSize(),
      item.getLayers(),
      id,
    ];
    const result = await this.pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Cake with id ${id} not found`);
    }

    const row = result.rows[0];
    return new Cake(row.type, row.flavor, row.filling, row.size, row.layers);
  }
  async delete(id: id): Promise<void> {
     const query = `DELETE FROM cakes WHERE id = $1`;
    const result = await this.pool.query(query, [id]);

    if (result.rowCount === 0) {
      throw new Error(`Cake with id ${id} not found`);
    }
  }
}