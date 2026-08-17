// src/__tests__/Cake.repository.test.ts
import { CakeRepository } from "../repository/Cake.repository";
import { Cake } from "../models/Cake.model";

describe("CakeRepository", () => {
  const repo = new CakeRepository();

  // Before any test runs, make sure the table exists.
  beforeAll(async () => {
    await repo.init();
  });

  // After all tests finish, close the database connections so Jest can exit.
  afterAll(async () => {
    await repo.closePool();
  });

  it("should create a cake and return an id", async () => {
    const cake = new Cake("Birthday", "Chocolate", "Cream", 10, 2);
    const newId = await repo.create(cake);

    expect(newId).toBeDefined();       // we got something back
    expect(typeof newId).toBe("string"); // and it's a string, per our contract

    await repo.delete(newId); // clean up after ourselves
  });

  it("should get a cake back by its id", async () => {
    const created = await repo.create(new Cake("Wedding", "Vanilla", "Jam", 20, 4));
    const fetched = await repo.get(created);

    expect(fetched.getType()).toBe("Wedding");
    expect(fetched.getFlavor()).toBe("Vanilla");
    expect(fetched.getSize()).toBe(20);

    await repo.delete(created);
  });

  it("should update a cake's fields", async () => {
    const created = await repo.create(new Cake("Party", "Strawberry", "Cream", 8, 1));
    const updated = await repo.update(created, new Cake("Party", "Lemon", "Cream", 8, 1));

    expect(updated.getFlavor()).toBe("Lemon"); // the change took effect

    await repo.delete(created);
  });

  it("should delete a cake", async () => {
    const created = await repo.create(new Cake("Temp", "Plain", "None", 6, 1));
    await repo.delete(created);

    // After deletion, trying to get it should throw an error.
    await expect(repo.get(created)).rejects.toThrow();
  });

  it("should throw when getting a non-existent cake", async () => {
    await expect(repo.get("999999")).rejects.toThrow();
  });
});