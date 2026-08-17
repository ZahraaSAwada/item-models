import { IMapper } from "./IMapper";
import { Cake } from "../Cake.model";
import { CakeBuilder } from "../builders/Cake.builder";

export class JSONCakeMapper implements IMapper<any, Cake> {
  map(data: any): Cake {
    return new CakeBuilder()
      .setType(data.type)
      .setFlavor(data.flavor)
      .setFilling(data.filling)
      .setSize(Number(data.size))
      .setLayers(Number(data.layers))
      .build();
  }

  reverseMap(data: Cake): any {
    return {
      type: data.getType(),
      flavor: data.getFlavor(),
      filling: data.getFilling(),
      size: data.getSize(),
      layers: data.getLayers(),
    };
  }
}