// src/__tests__/RepositoryFactory.test.ts
import { RepositoryFactory } from "../repository/RepositoryFactory";
import { ItemCategory } from "../models/Item.model";
import { CakeRepository } from "../repository/Cake.repository";
import { BookRepository } from "../repository/Book.repository";
import { ToyRepository } from "../repository/Toy.repository";

describe("RepositoryFactory", () => {
  it("should create a CakeRepository for CAKE", async () => {
    const repo = await RepositoryFactory.create(ItemCategory.CAKE);
    expect(repo).toBeInstanceOf(CakeRepository);
    await repo.closePool();
  });

  it("should create a BookRepository for BOOK", async () => {
    const repo = await RepositoryFactory.create(ItemCategory.BOOK);
    expect(repo).toBeInstanceOf(BookRepository);
    await repo.closePool();
  });

  it("should create a ToyRepository for TOY", async () => {
    const repo = await RepositoryFactory.create(ItemCategory.TOY);
    expect(repo).toBeInstanceOf(ToyRepository);
    await repo.closePool();
  });
});