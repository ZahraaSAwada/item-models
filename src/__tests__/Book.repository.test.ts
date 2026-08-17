// src/__tests__/Book.repository.test.ts
import { BookRepository } from "../repository/Book.repository";
import { Book } from "../models/Book.model";

describe("BookRepository", () => {
  const repo = new BookRepository();

  beforeAll(async () => {
    await repo.init();
  });

  afterAll(async () => {
    await repo.closePool();
  });

  it("should create a book and return an id", async () => {
    const newId = await repo.create(new Book("Dune", "Herbert", "SciFi", 412, 20));
    expect(newId).toBeDefined();
    expect(typeof newId).toBe("string");
    await repo.delete(newId);
  });

  it("should get a book back by its id", async () => {
    const created = await repo.create(new Book("1984", "Orwell", "Dystopia", 328, 15));
    const fetched = await repo.get(created);
    expect(fetched.getTitle()).toBe("1984");
    expect(fetched.getAuthor()).toBe("Orwell");
    expect(fetched.getPages()).toBe(328);
    await repo.delete(created);
  });

  it("should update a book's fields", async () => {
    const created = await repo.create(new Book("Draft", "Anon", "Fiction", 100, 10));
    const updated = await repo.update(created, new Book("Final", "Anon", "Fiction", 100, 10));
    expect(updated.getTitle()).toBe("Final");
    await repo.delete(created);
  });

  it("should delete a book", async () => {
    const created = await repo.create(new Book("Temp", "Nobody", "None", 50, 5));
    await repo.delete(created);
    await expect(repo.get(created)).rejects.toThrow();
  });

  it("should throw when getting a non-existent book", async () => {
    await expect(repo.get("999999")).rejects.toThrow();
  });
});