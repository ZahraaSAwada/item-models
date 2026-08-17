import { IMapper } from "./IMapper";
import { Book } from "../Book.model";
import { BookBuilder } from "../builders/Book.builder";

export class CSVBookMapper implements IMapper<string[], Book> {
  map(data: string[]): Book {
    return new BookBuilder()
      .setTitle(data[1])
      .setAuthor(data[2])
      .setGenre(data[3])
      .setPages(parseInt(data[4]))
      .setPrice(parseInt(data[5]))
      .build();
  }

  reverseMap(data: Book): string[] {
    return [
      data.getTitle(),
      data.getAuthor(),
      data.getGenre(),
      data.getPages().toString(),
      data.getPrice().toString(),
    ];
  }
}