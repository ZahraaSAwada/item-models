import { Book } from "../Book.model";

export class BookBuilder {
  private title!: string;
  private author!: string;
  private genre!: string;
  private pages!: number;
  private price!: number;

  setTitle(title: string): BookBuilder {
    this.title = title;
    return this;
  }

  setAuthor(author: string): BookBuilder {
    this.author = author;
    return this;
  }

  setGenre(genre: string): BookBuilder {
    this.genre = genre;
    return this;
  }

  setPages(pages: number): BookBuilder {
    this.pages = pages;
    return this;
  }

  setPrice(price: number): BookBuilder {
    this.price = price;
    return this;
  }

  build(): Book {
    return new Book(this.title, this.author, this.genre, this.pages, this.price);
  }
}