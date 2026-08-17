// src/__tests__/ToyMapperFactory.test.ts
import { ToyMapperFactory } from "../models/mappers/ToyMapperFactory";
import { MapperType } from "../models/mappers/MapperType";
import { CSVToyMapper } from "../models/mappers/CSVToy.mapper";
import { JSONToyMapper } from "../models/mappers/JSONToy.mapper";
import { XMLToyMapper } from "../models/mappers/XMLToy.mapper";

describe("ToyMapperFactory", () => {
  it("should create a CSV mapper when asked for CSV", () => {
    expect(ToyMapperFactory.create(MapperType.CSV)).toBeInstanceOf(CSVToyMapper);
  });
  it("should create a JSON mapper when asked for JSON", () => {
    expect(ToyMapperFactory.create(MapperType.JSON)).toBeInstanceOf(JSONToyMapper);
  });
  it("should create an XML mapper when asked for XML", () => {
    expect(ToyMapperFactory.create(MapperType.XML)).toBeInstanceOf(XMLToyMapper);
  });
});