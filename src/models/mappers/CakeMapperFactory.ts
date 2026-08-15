// src/models/mappers/CakeMapperFactory.ts
import { IMapper } from "./IMapper";
import { Cake } from "../Cake.model";
import { MapperType } from "./MapperType";
import { CSVCakeMapper } from "./CSVCake.mapper";
import { JSONCakeMapper } from "./JSONCake.mapper";
import { XMLCakeMapper } from "./XMLCake.mapper";

export class CakeMapperFactory {
  public static create(type: MapperType): IMapper<any, Cake> {
    switch (type) {
      case MapperType.CSV:
        return new CSVCakeMapper();
      case MapperType.JSON:
        return new JSONCakeMapper();
      case MapperType.XML:
        return new XMLCakeMapper();
      default:
        throw new Error("Unsupported mapper type");
    }
  }
}