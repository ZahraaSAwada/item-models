// src/repository/Book.repository.ts
import { Pool } from "pg";
import { config } from "../config";
import { Book } from "../models/Book.model";
import { IRepository, id } from "./IRepository";

export class BookRepository implements IRepository<Book> {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({ connectionString: config.databaseUrl });
  }

  async closePool(): Promise<void> {
    await this.pool.end();
  }

  async init(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT NOT NULL,
        pages INTEGER NOT NULL,
        price INTEGER NOT NULL
      )
    `;
    await this.pool.query(query);
  }

  async create(item: Book): Promise<id> {
    const query = `
      INSERT INTO books (title, author, genre, pages, price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const values = [
      item.getTitle(),
      item.getAuthor(),
      item.getGenre(),
      item.getPages(),
      item.getPrice(),
    ];
    const result = await this.pool.query(query, values);
    return String(result.rows[0].id);
  }

  async get(id: id): Promise<Book> {
    const query = `SELECT * FROM books WHERE id = $1`;
    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error(`Book with id ${id} not found`);
    }

    const row = result.rows[0];
    return new Book(row.title, row.author, row.genre, row.pages, row.price);
  }

  async getAll(): Promise<Book[]> {
    const query = `SELECT * FROM books`;
    const result = await this.pool.query(query);

    return result.rows.map(
      (row) => new Book(row.title, row.author, row.genre, row.pages, row.price)
    );
  }

  async update(id: id, item: Book): Promise<Book> {
    const query = `
      UPDATE books
      SET title = $1, author = $2, genre = $3, pages = $4, price = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [
      item.getTitle(),
      item.getAuthor(),
      item.getGenre(),
      item.getPages(),
      item.getPrice(),
      id,
    ];
    const result = await this.pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Book with id ${id} not found`);
    }

    const row = result.rows[0];
    return new Book(row.title, row.author, row.genre, row.pages, row.price);
  }

  async delete(id: id): Promise<void> {
    const query = `DELETE FROM books WHERE id = $1`;
    const result = await this.pool.query(query, [id]);

    if (result.rowCount === 0) {
      throw new Error(`Book with id ${id} not found`);
    }
  }
}