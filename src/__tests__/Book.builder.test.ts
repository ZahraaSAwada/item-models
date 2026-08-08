import { BookBuilder } from "../models/builders/Book.builder";
import { ItemCategory } from "../models/Item.model";

describe("BookBuilder", () => {
  it("should build a book with all properties set correctly", () => {
    const book = new BookBuilder()
      .setTitle("1984")
      .setAuthor("George Orwell")
      .setGenre("Dystopian")
      .setPages(328)
      .setPrice(15)
      .build();

    expect(book.getTitle()).toBe("1984");
    expect(book.getAuthor()).toBe("George Orwell");
    expect(book.getGenre()).toBe("Dystopian");
    expect(book.getPages()).toBe(328);
    expect(book.getPrice()).toBe(15);
  });

  it("should set the correct category", () => {
    const book = new BookBuilder()
      .setTitle("Brave New World")
      .build();

    expect(book.getCategory()).toBe(ItemCategory.BOOK);
  });

  it("should leave unset properties as undefined (missing fields)", () => {
    const book = new BookBuilder()
      .setTitle("Fahrenheit 451")
      .build();

    expect(book.getTitle()).toBe("Fahrenheit 451");
    expect(book.getAuthor()).toBeUndefined();
  });
});