// src/__tests__/BookMapperFactory.test.ts
import { BookMapperFactory } from "../models/mappers/BookMapperFactory";
import { MapperType } from "../models/mappers/MapperType";
import { CSVBookMapper } from "../models/mappers/CSVBook.mapper";
import { JSONBookMapper } from "../models/mappers/JSONBook.mapper";
import { XMLBookMapper } from "../models/mappers/XMLBook.mapper";

describe("BookMapperFactory", () => {
  it("should create a CSV mapper when asked for CSV", () => {
    expect(BookMapperFactory.create(MapperType.CSV)).toBeInstanceOf(CSVBookMapper);
  });
  it("should create a JSON mapper when asked for JSON", () => {
    expect(BookMapperFactory.create(MapperType.JSON)).toBeInstanceOf(JSONBookMapper);
  });
  it("should create an XML mapper when asked for XML", () => {
    expect(BookMapperFactory.create(MapperType.XML)).toBeInstanceOf(XMLBookMapper);
  });
});