// src/repository/RepositoryFactory.ts
import { ItemCategory } from "../models/Item.model";
import { CakeRepository } from "./Cake.repository";
import { BookRepository } from "./Book.repository";
import { ToyRepository } from "./Toy.repository";

export class RepositoryFactory {
  public static async create(category: ItemCategory) {
    switch (category) {
      case ItemCategory.CAKE: {
        const repository = new CakeRepository();
        await repository.init();
        return repository;
      }
      case ItemCategory.BOOK: {
        const repository = new BookRepository();
        await repository.init();
        return repository;
      }
      case ItemCategory.TOY: {
        const repository = new ToyRepository();
        await repository.init();
        return repository;
      }
      default:
        throw new Error("Unsupported category");
    }
  }
}