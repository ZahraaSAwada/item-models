// src/__tests__/Toy.repository.test.ts
import { ToyRepository } from "../repository/Toy.repository";
import { Toy } from "../models/Toy.model";

describe("ToyRepository", () => {
  const repo = new ToyRepository();

  beforeAll(async () => {
    await repo.init();
  });

  afterAll(async () => {
    await repo.closePool();
  });

  it("should create a toy and return an id", async () => {
    const newId = await repo.create(new Toy("Lego", "Denmark", 50, 3, 6));
    expect(newId).toBeDefined();
    expect(typeof newId).toBe("string");
    await repo.delete(newId);
  });

  it("should get a toy back by its id", async () => {
    const created = await repo.create(new Toy("Doll", "Japan", 30, 2, 4));
    const fetched = await repo.get(created);
    expect(fetched.getType()).toBe("Doll");
    expect(fetched.getMadeIn()).toBe("Japan");
    expect(fetched.getPrice()).toBe(30);
    await repo.delete(created);
  });

  it("should update a toy's fields", async () => {
    const created = await repo.create(new Toy("Car", "China", 20, 1, 5));
    const updated = await repo.update(created, new Toy("Truck", "China", 20, 1, 5));
    expect(updated.getType()).toBe("Truck");
    await repo.delete(created);
  });

  it("should delete a toy", async () => {
    const created = await repo.create(new Toy("Temp", "Nowhere", 10, 1, 3));
    await repo.delete(created);
    await expect(repo.get(created)).rejects.toThrow();
  });

  it("should throw when getting a non-existent toy", async () => {
    await expect(repo.get("999999")).rejects.toThrow();
  });
});