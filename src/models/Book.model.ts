import { IItem, ItemCategory } from "./Item.model";

export class Book implements IItem {
  private title: string;
  private author: string;
  private genre: string;
  private pages: number;
  private price: number;

  constructor(
    title: string,
    author: string,
    genre: string,
    pages: number,
    price: number
  ) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.price = price;
  }

  getCategory(): ItemCategory {
    return ItemCategory.BOOK;
  }

  getTitle(): string {
    return this.title;
  }

  getAuthor(): string {
    return this.author;
  }

  getGenre(): string {
    return this.genre;
  }

  getPages(): number {
    return this.pages;
  }

  getPrice(): number {
    return this.price;
  }
}