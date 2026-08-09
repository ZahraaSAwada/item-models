import { ToyBuilder } from "../models/builders/Toy.builder";
import { ItemCategory } from "../models/Item.model";

describe("ToyBuilder", () => {
  it("should build a toy with all properties set correctly", () => {
    const toy = new ToyBuilder()
      .setType("Action Figure")
      .setMadeIn("China")
      .setPrice(25)
      .setSize(10)
      .setAge(6)
      .build();

    expect(toy.getType()).toBe("Action Figure");
    expect(toy.getMadeIn()).toBe("China");
    expect(toy.getPrice()).toBe(25);
    expect(toy.getSize()).toBe(10);
    expect(toy.getAge()).toBe(6);
  });

  it("should set the correct category", () => {
    const toy = new ToyBuilder()
      .setType("Puzzle")
      .build();

    expect(toy.getCategory()).toBe(ItemCategory.TOY);
  });

  it("should leave unset properties as undefined (missing fields)", () => {
    const toy = new ToyBuilder()
      .setType("Doll")
      .build();

    expect(toy.getType()).toBe("Doll");
    expect(toy.getMadeIn()).toBeUndefined();
  });
});