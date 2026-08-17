// src/models/mappers/ToyMapperFactory.ts
import { IMapper } from "./IMapper";
import { Toy } from "../Toy.model";
import { MapperType } from "./MapperType";
import { CSVToyMapper } from "./CSVToy.mapper";
import { JSONToyMapper } from "./JSONToy.mapper";
import { XMLToyMapper } from "./XMLToy.mapper";

export class ToyMapperFactory {
  public static create(type: MapperType): IMapper<any, Toy> {
    switch (type) {
      case MapperType.CSV:
        return new CSVToyMapper();
      case MapperType.JSON:
        return new JSONToyMapper();
      case MapperType.XML:
        return new XMLToyMapper();
      default:
        throw new Error("Unsupported mapper type");
    }
  }
}