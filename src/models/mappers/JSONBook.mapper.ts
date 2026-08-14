import { IMapper } from "./IMapper";
import { Book } from "../Book.model";
import { BookBuilder } from "../builders/Book.builder";

export class JSONBookMapper implements IMapper<any, Book> {
  map(data: any): Book {
    return new BookBuilder()
      .setTitle(data.title)
      .setAuthor(data.author)
      .setGenre(data.genre)
      .setPages(Number(data.pages))
      .setPrice(Number(data.price))
      .build();
  }

  reverseMap(data: Book): any {
    return {
      title: data.getTitle(),
      author: data.getAuthor(),
      genre: data.getGenre(),
      pages: data.getPages(),
      price: data.getPrice(),
    };
  }
}