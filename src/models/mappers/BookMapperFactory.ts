// src/models/mappers/BookMapperFactory.ts
import { IMapper } from "./IMapper";
import { Book } from "../Book.model";
import { MapperType } from "./MapperType";
import { CSVBookMapper } from "./CSVBook.mapper";
import { JSONBookMapper } from "./JSONBook.mapper";
import { XMLBookMapper } from "./XMLBook.mapper";

export class BookMapperFactory {
  public static create(type: MapperType): IMapper<any, Book> {
    switch (type) {
      case MapperType.CSV:
        return new CSVBookMapper();
      case MapperType.JSON:
        return new JSONBookMapper();
      case MapperType.XML:
        return new XMLBookMapper();
      default:
        throw new Error("Unsupported mapper type");
    }
  }
}