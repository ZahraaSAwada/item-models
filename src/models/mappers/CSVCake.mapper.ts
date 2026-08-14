import { IMapper } from "./IMapper";
import { Cake } from "../Cake.model";
import { CakeBuilder } from "../builders/Cake.builder";

export class CSVCakeMapper implements IMapper<string[], Cake> {
  map(data: string[]): Cake {
    return new CakeBuilder()
      .setType(data[0])
      .setFlavor(data[1])
      .setFilling(data[2])
      .setSize(parseInt(data[3]))
      .setLayers(parseInt(data[4]))
      .build();
  }

  reverseMap(data: Cake): string[] {
    return [
      data.getType(),
      data.getFlavor(),
      data.getFilling(),
      data.getSize().toString(),
      data.getLayers().toString(),
    ];
  }
}