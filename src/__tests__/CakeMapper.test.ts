import { CSVCakeMapper } from "../models/mappers/CSVCake.mapper";
import { JSONCakeMapper } from "../models/mappers/JSONCake.mapper";
import { XMLCakeMapper } from "../models/mappers/XMLCake.mapper";
import { ItemCategory } from "../models/Item.model";

describe("CSVCakeMapper", () => {
  const mapper = new CSVCakeMapper();

  it("should map a CSV row into a Cake", () => {
    // Arrange — a raw CSV row
    const row = ["Birthday", "Chocolate", "Cream", "12", "3"];

    // Act
    const cake = mapper.map(row);

    // Assert
    expect(cake.getType()).toBe("Birthday");
    expect(cake.getFlavor()).toBe("Chocolate");
    expect(cake.getFilling()).toBe("Cream");
    expect(cake.getSize()).toBe(12);       // converted to number
    expect(cake.getLayers()).toBe(3);
    expect(cake.getCategory()).toBe(ItemCategory.CAKE);
  });

  it("should reverse-map a Cake back into a CSV row", () => {
    // Arrange — first build a cake by mapping
    const cake = mapper.map(["Wedding", "Vanilla", "Fruit", "20", "5"]);

    // Act — convert it back
    const row = mapper.reverseMap(cake);

    // Assert — we get the original string array back
    expect(row).toEqual(["Wedding", "Vanilla", "Fruit", "20", "5"]);
  });

  it("should produce NaN for a non-numeric size (incorrect data type)", () => {
    // Arrange — size is garbage text instead of a number
    const row = ["Birthday", "Chocolate", "Cream", "abc", "3"];

    // Act
    const cake = mapper.map(row);

    // Assert — parseInt("abc") gives NaN
    expect(cake.getSize()).toBeNaN();
  });
});

describe("JSONCakeMapper", () => {
  const mapper = new JSONCakeMapper();

  it("should map a JSON object into a Cake", () => {
    const data = { type: "Birthday", flavor: "Chocolate", filling: "Cream", size: 12, layers: 3 };

    const cake = mapper.map(data);

    expect(cake.getType()).toBe("Birthday");
    expect(cake.getFlavor()).toBe("Chocolate");
    expect(cake.getSize()).toBe(12);
    expect(cake.getCategory()).toBe(ItemCategory.CAKE);
  });

  it("should leave missing fields undefined", () => {
    // Arrange — only some fields present
    const data = { type: "Cupcake" };

    // Act
    const cake = mapper.map(data);

    // Assert
    expect(cake.getType()).toBe("Cupcake");
    expect(cake.getFlavor()).toBeUndefined();
  });
});

describe("XMLCakeMapper", () => {
  const mapper = new XMLCakeMapper();

  it("should map an XML object into a Cake", () => {
    const data = { type: "Birthday", flavor: "Chocolate", filling: "Cream", size: 12, layers: 3 };

    const cake = mapper.map(data);

    expect(cake.getType()).toBe("Birthday");
    expect(cake.getFlavor()).toBe("Chocolate");
    expect(cake.getCategory()).toBe(ItemCategory.CAKE);
  });
});