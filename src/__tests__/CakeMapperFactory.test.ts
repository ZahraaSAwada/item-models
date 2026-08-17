// src/__tests__/CakeMapperFactory.test.ts
import { CakeMapperFactory } from "../models/mappers/CakeMapperFactory";
import { MapperType } from "../models/mappers/MapperType";
import { CSVCakeMapper } from "../models/mappers/CSVCake.mapper";
import { JSONCakeMapper } from "../models/mappers/JSONCake.mapper";
import { XMLCakeMapper } from "../models/mappers/XMLCake.mapper";

describe("CakeMapperFactory", () => {
  it("should create a CSV mapper when asked for CSV", () => {
    const mapper = CakeMapperFactory.create(MapperType.CSV);
    expect(mapper).toBeInstanceOf(CSVCakeMapper);
  });

  it("should create a JSON mapper when asked for JSON", () => {
    const mapper = CakeMapperFactory.create(MapperType.JSON);
    expect(mapper).toBeInstanceOf(JSONCakeMapper);
  });

  it("should create an XML mapper when asked for XML", () => {
    const mapper = CakeMapperFactory.create(MapperType.XML);
    expect(mapper).toBeInstanceOf(XMLCakeMapper);
  });
});