import { CakeBuilder } from "../models/builders/Cake.builder";
import { ItemCategory } from "../models/Item.model";

describe("CakeBuilder", () => {
  it("should build a cake with all properties set correctly", () => {
    // Arrange & Act — build a cake using the builder
    const cake = new CakeBuilder()
      .setType("Birthday")
      .setFlavor("Chocolate")
      .setFilling("Cream")
      .setSize(12)
      .setLayers(3)
      .build();

    // Assert — each getter returns what we set
    expect(cake.getType()).toBe("Birthday");
    expect(cake.getFlavor()).toBe("Chocolate");
    expect(cake.getFilling()).toBe("Cream");
    expect(cake.getSize()).toBe(12);
    expect(cake.getLayers()).toBe(3);
  });

  it("should set the correct category", () => {
    // Arrange & Act
    const cake = new CakeBuilder()
      .setType("Wedding")
      .setFlavor("Vanilla")
      .setFilling("Fruit")
      .setSize(20)
      .setLayers(5)
      .build();

    // Assert — cake reports its category via the interface
    expect(cake.getCategory()).toBe(ItemCategory.CAKE);
  });

  it("should leave unset properties as undefined (missing fields)", () => {
    // Arrange & Act — only set some fields, skip the rest
    const cake = new CakeBuilder()
      .setType("Cupcake")
      .build();

    // Assert — the set field works, the skipped ones are undefined
    expect(cake.getType()).toBe("Cupcake");
    expect(cake.getFlavor()).toBeUndefined();
  });
});